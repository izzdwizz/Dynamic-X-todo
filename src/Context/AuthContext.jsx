import React, { createContext, useContext, useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user_id, setUser_id] = useState(null);
  const [userData, setUserData] = useState(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  });
  const [userToken, setUserToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("jwt_token") || null;
    }
    return null;
  });
  useEffect(() => {
    if (userData && typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    if (userToken && typeof window !== "undefined") {
      localStorage.setItem("jwt_token", userToken);
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("jwt_token");
    }
  }, [userToken, userData]);

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            cacheTime: 1000 * 60 * 20,
            staleTime: Infinity,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          user_id,
          setUser_id,
          userData,
          setUserData,
          userToken,
          setUserToken,
        }}
      >
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

// Custom hook for using the context
export const useAuthContext = () => useContext(AuthContext);
