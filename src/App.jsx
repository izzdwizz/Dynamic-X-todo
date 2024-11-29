import { useEffect, useState } from "react";
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
import { useTaskContext } from "./Context/TaskContext";
import { useAuthContext } from "./Context/AuthContext";
import { useCreateTask } from "./hooks/task/tasks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function App() {
  const { tasks, setTasks } = useTaskContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const { userData, userToken } = useAuthContext();
  const { mutate: createTask } = useCreateTask();
  const navigate = useNavigate();
  console.log("token and data are as follows:", userData, userToken);
  useEffect(() => {
    if (!userToken) {
      toast.error("Unauthorized");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, []);

  const addTask = (title, description) => {
    createTask(
      { title, description },
      {
        onSuccess: (response) => {
          setTasks((tasks) => [...tasks, response?.data]);

          if (response?.data) {
            toast.success("Successfully created task");
            console.log("this is where we see updated tasks", tasks);
            setTimeout(() => navigate("/all-tasks"), 2000);
          }
        },
        onError: (error) => {
          toast.error("Unfortunately an error occured:", error);
        },
      }
    );
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
