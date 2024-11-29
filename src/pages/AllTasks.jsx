import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  MouseSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Layout from "../Layout";
import EditTaskModal from "../components/Modals/EditTaskModal";
import ViewTaskModal from "../components/Modals/ViewTaskModal";
import { useTaskContext } from "../Context/TaskContext";
import { AllColumns } from "../components/All Columns/AllColumns";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetTasks } from "../hooks/task/tasks";

export default function AllTasks() {
  const {
    tasks,
    setTasks,
    isViewModal,
    isEditModal,
    toggleViewModal,
    toggleEditModal,
    setIsEditModal,
    setIsViewModal,
    selectedTask,
  } = useTaskContext();

  const { userToken } = useAuthContext();
  // const { data: getTasks } = useGetTasks();

  const navigate = useNavigate();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(MouseSensor, {
      onActivation: (event) => console.log("onActivation", event),
      activationConstraint: { distance: 10 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  useEffect(() => {
    if (!userToken) {
      toast.error("Unauthorized");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, []);

  return (
    <>
      <Layout>
        {isViewModal && isEditModal ? (
          <EditTaskModal
            setIsEditModal={setIsEditModal}
            setIsViewModal={setIsViewModal}
            toggleAddModal={toggleEditModal}
            selectedTask={selectedTask}
          />
        ) : isViewModal && !isEditModal ? (
          <ViewTaskModal
            toggleEditModal={toggleEditModal}
            toggleViewModal={toggleViewModal}
            selectedTask={selectedTask}
          />
        ) : null}
        <div
          className={`App md:relative z-0 md:-left-24 ${
            (isEditModal || isViewModal) && "hidden"
          }`}
        >
          <h1 className="md:text-4xl text-2xl mt-12 opacity-100 font-bold">
            All Available Tasks
          </h1>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <AllColumns
              id="toDo"
              tasks={tasks}
              toggleViewModal={toggleViewModal}
            />
          </DndContext>
        </div>
      </Layout>
    </>
  );
}
