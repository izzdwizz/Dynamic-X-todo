import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useGetTasks } from "../hooks/task/tasks";

// Create the context
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isViewModal, setIsViewModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const toggleViewModal = () => setIsViewModal((prev) => !prev);
  const toggleEditModal = () => setIsEditModal((prev) => !prev);

  // Fetch tasks frpm API
  const { data: getTasks } = useGetTasks({
    onSuccess: () => {
      setTasks(getTasks?.data || []);
    },
  });

  useEffect(() => {
    if (getTasks?.data) setTasks(getTasks?.data);
  }, [getTasks?.data]);

  console.log(getTasks?.data);
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        selectedTask,
        setSelectedTask,
        isViewModal,
        toggleViewModal,
        isEditModal,
        toggleEditModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for using the context
export const useTaskContext = () => useContext(TaskContext);
