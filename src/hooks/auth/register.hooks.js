import API from "../../api/api";
import { useMutation } from "@tanstack/react-query";

export function useRegisterUser() {
  return useMutation(
    (data) => {
      return API.post("/register", data);
    },
    {
      onError: (error) => {
        console.error("Registration failed", error);
      },
    }
  );
}
