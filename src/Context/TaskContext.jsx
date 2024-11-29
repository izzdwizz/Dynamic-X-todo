import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tasks") || [];
    }
    return null;
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [isViewModal, setIsViewModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const toggleViewModal = () => setIsViewModal((prev) => !prev);
  const toggleEditModal = () => setIsEditModal((prev) => !prev);

  // fetch data from local storage
  useEffect(() => {
    if (tasks && typeof window !== "undefined") {
      localStorage.setItem("tasks", tasks);
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);
  // console.log(selectedTask);
  console.log("availables tasks are:", tasks);
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
