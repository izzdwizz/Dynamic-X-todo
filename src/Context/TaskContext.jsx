import React, { createContext, useContext, useState } from "react";

// Create the context
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage", description: "Some description" },
    {
      id: 2,
      title: "Fix styling in about section",
      description: "Some description",
    },
    {
      id: 3,
      title: "Learn how to center a div",
      description: "Some description",
    },
  ]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isViewModal, setIsViewModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const toggleViewModal = () => setIsViewModal((prev) => !prev);
  const toggleEditModal = () => setIsEditModal((prev) => !prev);
  console.log(selectedTask);
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
