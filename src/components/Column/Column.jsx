import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "../Task/Task";
import "./Column.css";

export const Column = ({ tasks, isOpen, setIsOpen }) => {
  return (
    <div className="column md:relative md:-left-10 mt-[4rem]">
      <p className="text-left">Existing Tasks</p>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ))}
      </SortableContext>
    </div>
  );
};
