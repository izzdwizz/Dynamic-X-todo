import API from "../../api/api";
import { useMutation } from "@tanstack/react-query";

export function useLoginUser() {
  return useMutation(
    (data) => {
      return API.post("/login", data, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer-${token}`,
        },
      });
    },
    {
      onError: (error) => {
        console.error("login failed", error);
      },
    }
  );
}
