import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Task } from "../Task/Task";
import "./Column.css";

export const Column = ({ tasks, toggleViewModal }) => {
  return (
    <div className="column md:relative md:-left-10  ">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} toggleViewModal={toggleViewModal} />
        ))}
      </SortableContext>
    </div>
  );
};
