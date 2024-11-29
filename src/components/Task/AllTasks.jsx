import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Task.css";
import { useTaskContext } from "../../Context/TaskContext";

export const AllTasks = ({ task, id, toggleViewModal }) => {
  const { setSelectedTask } = useTaskContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const handleClick = () => {
    toggleViewModal();
    setSelectedTask(task);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`todo-rows md:min-w-[40rem] min-w-[15rem] border-r-8 ${
        task?.isCompleted ? " border-blue-400" : "border-gray-400"
      } `}
      onMouseDown={handleClick}
    >
      <div className="todo-heading">
        <h2 className="font-bold text-[1.5rem] pb-1"> {task?.title}</h2>
        <p className="text-[1rem]">{task?.description}</p>
      </div>
      <div className="todo-button pt-8">
        <button className="delete rounded-full relative z-[100000]">
          Delete
        </button>
        <button className="update rounded-full relative z-[100000]">
          Edit
        </button>
      </div>
    </div>
  );
};
