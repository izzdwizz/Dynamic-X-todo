import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Task.css";

export const Task = ({ id, title, isOpen, setIsOpen }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const handleClick = (task) => {
    setIsOpen(true);
    alert(isOpen);
    console.log(isOpen, task);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="todo-rows md:min-w-[40rem] min-w-[15rem]"
      onClick={() => handleClick(task.id)}
    >
      <div className="todo-heading">
        <h2 className="font-bold text-[1.5rem] pb-1"> {title}</h2>
        <p className="text-[1rem]">
          When I get up this morning I have to prioritize showering with babe if
          not she'll be cranky all day
        </p>
      </div>
      <div className="todo-button pt-8">
        <button
          className="delete rounded-full"
          onClick={() => alert("this doesn't work")}
        >
          Delete
        </button>
        <button className="update rounded-full">Edit</button>
      </div>
    </div>
  );
};
