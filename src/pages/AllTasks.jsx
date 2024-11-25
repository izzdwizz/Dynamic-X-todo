import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { Column } from "../components/Column/Column";

import Layout from "../Layout";
import AddTaskModal from "../components/Modals/addTaskModal";

export default function AllTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
    { id: 4, title: "Add tests to homepage" },
    { id: 5, title: "Fix styling in about section" },
    { id: 6, title: "Learn how to center a div" },
    { id: 7, title: "Add tests to homepage" },
    { id: 8, title: "Fix styling in about section" },
    { id: 9, title: "Learn how to center a div" },
    { id: 10, title: "Add tests to homepage" },
    { id: 11, title: "Fix styling in about section" },
    { id: 12, title: "Learn how to center a div" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
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

  const toggleAddModal = () => {
    setIsAddModal(!isAddModal);
  };
  // VIEW FUNCTION

  return (
    <>
      <Layout>
        {isAddModal && <AddTaskModal toggleAddModal={toggleAddModal} />}
        <div
          className={`App md:relative z-0 md:-left-24 ${
            isAddModal && "hidden"
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
            <Column
              id="toDo"
              tasks={tasks}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </DndContext>
        </div>
      </Layout>
    </>
  );
}
