import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Task.css";
import { useTaskContext } from "../../Context/TaskContext";

export const Task = ({ task, toggleViewModal }) => {
  const { setSelectedTask } = useTaskContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task?.id });

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
      className="todo-rows md:min-w-[40rem] min-w-[15rem]"
      onMouseDown={handleClick}
    >
      <div className="todo-heading">
        <h2 className="font-bold text-[1.5rem] pb-1">
          {task?.id}. {task?.title}
        </h2>
        <p className="text-[1rem] ml-6">{task?.description}</p>
      </div>
    </div>
  );
};
