import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import "./Column.css";
import { AllTasks } from "../Task/AllTasks";

export const AllColumns = ({ tasks, toggleViewModal }) => {
  return (
    <div className="column md:relative md:-left-10  ">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <AllTasks
            key={task.id}
            task={task}
            toggleViewModal={toggleViewModal}
          />
        ))}
      </SortableContext>
    </div>
  );
};
