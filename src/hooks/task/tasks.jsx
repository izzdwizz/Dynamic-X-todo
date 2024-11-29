import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../../api/api";

export function useCreateTask() {
  return useMutation((data) => API.post(`/create`, data));
}
export function useGetTasks() {
  return useQuery({
    queryKey: [`getTasks`],
    queryFn: () => API.get(`/getTask`),
    refetchOnMount: true,
    refetchInterval: 5000,
  });
}
export function useUpdateTask() {
  return useMutation(({ task_id, data }) => API.put(`/${task_id}`, data));
}

export function useDeleteTask() {
  return useMutation((task_id) => API.delete(`/${task_id}`));
}
