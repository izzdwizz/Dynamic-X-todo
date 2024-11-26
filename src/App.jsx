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

import { Column } from "./components/Column/Column";
import { Input } from "./components/Input/Input";

import "./App.css";
import Layout from "./Layout";
import AddTaskModal from "./components/Modals/addTaskModal";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about section" },
    { id: 3, title: "Learn how to center a div" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);

  const addTask = (title, description) => {
    setTasks((tasks) => [
      ...tasks,
      { id: tasks.length + 1, title, description },
    ]);
  };

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
        {isAddModal && (
          <AddTaskModal addTask={addTask} toggleAddModal={toggleAddModal} />
        )}
        <div
          className={`App md:relative z-0 md:-left-24 ${
            isAddModal && "hidden"
          }`}
        >
          <h1 className="md:text-4xl text-2xl mt-12 opacity-100 font-bold">
            Create Tasks
          </h1>
          <Input onSubmit={addTask} setIsAddModal={setIsAddModal} />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onClick={() => alert("Welcome")}
          >
            <div className="flex flex-col gap-0 items-start md:mt-[4rem]">
              <p className="text-left">Existing Tasks</p>
              <Column
                id="toDo"
                tasks={tasks}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>
          </DndContext>
        </div>
      </Layout>
    </>
  );
}
