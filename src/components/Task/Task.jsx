import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { VscDebugBreakpointData } from "react-icons/vsc";
import "./Task.css";
import { useTaskContext } from "../../Context/TaskContext";
import { useNavigate } from "react-router-dom";

export const Task = ({ task }) => {
  const { setSelectedTask, toggleViewModal } = useTaskContext();
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task?.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const handleClick = () => {
    // navigate("/all-tasks");
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
        <h2 className="font-bold text-[1.5rem] pb-1 flex gap-1 items-center">
          <VscDebugBreakpointData className="pb-1" size={20} />
          {/* <GrWaypoint className="rotate-[40deg] pb-1 " /> */}
          <span className="font-bold text-[1.5rem] pb-1">
            {task?.title}
          </span>{" "}
        </h2>
        <p className="text-[1rem] ml-8">{task?.description}</p>
      </div>
    </div>
  );
};
