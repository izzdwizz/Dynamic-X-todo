import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Task.css";

export const Task = ({ id, title, description, toggleViewModal }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const handleClick = (task) => {
    toggleViewModal();
    console.log(isOpen, task);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="todo-rows md:min-w-[40rem] min-w-[15rem]"
      onMouseDown={() => handleClick(id)}
    >
      <div className="todo-heading">
        <h2 className="font-bold text-[1.5rem] pb-1"> {title}</h2>
        <p className="text-[1rem]">{description}</p>
      </div>
      <div className="todo-button pt-8">
        <button
          className="delete rounded-full relative z-[100000]"
          onMouseDown={() => console.log("this doesn't work")}
        >
          Delete
        </button>
        <button
          className="update rounded-full relative z-[100000]"
          onMouseDown={() => alert("Welcome")}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
