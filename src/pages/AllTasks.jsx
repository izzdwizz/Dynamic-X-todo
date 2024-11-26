import { useState } from "react";
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

import { Column } from "../components/Column/Column";

import Layout from "../Layout";
import AddTaskModal from "../components/Modals/addTaskModal";
import EditTaskModal from "../components/Modals/EditTaskModal";
import ViewTaskModal from "../components/Modals/ViewTaskModal";
import { useTaskContext } from "../Context/TaskContext";

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
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 1,
  //     title: "Add tests to homepage",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 2,
  //     title: "Fix styling in about section",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 3,
  //     title: "Learn how to center a div",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 4,
  //     title: "Add tests to homepage",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 5,
  //     title: "Fix styling in about section",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 6,
  //     title: "Learn how to center a div",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 7,
  //     title: "Add tests to homepage",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 8,
  //     title: "Fix styling in about section",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 9,
  //     title: "Learn how to center a div",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 10,
  //     title: "Add tests to homepage",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 11,
  //     title: "Fix styling in about section",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  //   {
  //     id: 12,
  //     title: "Learn how to center a div",
  //     description:
  //       "Some description of things to do before things go wrong and terribly well",
  //   },
  // ]);
  // const [isOpen, setIsOpen] = useState(false);
  // const [isEditModal, setIsEditModal] = useState(false);
  // const [isViewModal, setIsViewModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor, {
      onActivation: (event) => console.log("onActivation", event), // Here!
      activationConstraint: { distance: 5 },
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

  // const toggleEditModal = () => {
  //   setIsEditModal(!isEditModal);
  // };
  // const toggleViewModal = () => {
  //   setIsViewModal((prev) => !prev);
  // };
  // VIEW FUNCTION

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
            <Column id="toDo" tasks={tasks} toggleViewModal={toggleViewModal} />
          </DndContext>
        </div>
      </Layout>
    </>
  );
}
