import React from "react";
import styles from "./addModal.module.css";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useTaskContext } from "../../Context/TaskContext";
import { useDeleteTask, useUpdateTask } from "../../hooks/task/tasks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ViewTaskModal = ({ toggleViewModal, toggleEditModal }) => {
  const { selectedTask, tasks } = useTaskContext();
  const { mutate: update } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const navigate = useNavigate();
  // Function for updating the task status
  const updateTask = (title, description, status) => {
    update(
      { task_id: selectedTask?.id, data: { title, description, status } },
      {
        onSuccess: (response) => {
          if (response?.data) {
            toast.success("Successfully updated task");
            toggleViewModal();
            setTimeout(() => navigate("/all-tasks"), 2000);
          }
        },
        onError: (error) => {
          toast.error("Unfortunately an error occured:", error);
        },
      }
    );
  };
  //  Function for deleting task
  const removeTask = () => {
    deleteTask(selectedTask?.id, {
      onSuccess: (response) => {
        if (response?.data) {
          toast.success("Successfully Removed task");
          toggleViewModal();
          setTimeout(() => navigate("/create-task"), 2000);
        }
      },
      onError: (error) => {
        toast.error("Unfortunately an error occured:", error);
      },
    });
  };

  const autoAdjustTextareaHeight = (element) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }
  };
  return (
    <div className={styles.modal}>
      <div onClick={toggleViewModal} className={styles.overlay}></div>
      <div className={`${styles.modal_content} relative rounded-[10px]`}>
        <h2 className="text-[#122156] font-[700] text-[1rem] md:text-[1.5rem] pb-4">
          View Task
        </h2>

        <div className="flex flex-col w-full gap-2 pb-4 ">
          <label>Title</label>
          <input
            className="input border-[1px] border-[#12215641] cursor-not-allowed bg-slate-100"
            type="text"
            value={selectedTask?.title ?? "Title"}
            placeholder={selectedTask?.title ?? "Title"}
            disabled={true}
          />
        </div>
        <div className="flex flex-col w-full gap-2 pb-4 ">
          <label>Task Description</label>

          <textarea
            value={selectedTask?.description ?? "Description"}
            className="border-[1px] border-[#12215641] outline-none p-2 w-full resize-none rounded cursor-not-allowed bg-slate-100 placeholder:text-slate-400"
            style={{ height: "auto", minHeight: "110px" }}
            rows={2}
            disabled={true}
            placeholder={selectedTask?.description ?? "Description"}
            ref={(textarea) => textarea && autoAdjustTextareaHeight(textarea)}
          />
        </div>
        <div className="flex flex-row w-full items-end py-2 text-[1rem] gap-4 justify-end  font-[Nunito] relative">
          <button
            className="px-3 md:px-5 py-1 md:py-2 mt-6 bg-[#122156]  md:text-[1rem] text-[.8rem] text-white rounded-full hover:scale-110 duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              const status = true;
              updateTask(
                selectedTask?.title,
                selectedTask?.description,
                status
              );
            }}
          >
            {" "}
            Completed
          </button>
          <button
            className="px-3 md:px-5 py-1 md:py-2 mt-6 bg-[#122156]  md:text-[1rem] text-[.8rem] text-white rounded-full hover:scale-110 duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              const status = false;
              updateTask(
                selectedTask?.title,
                selectedTask?.description,
                status
              );
            }}
          >
            {" "}
            Incomplete
          </button>
          <button
            className="px-3 md:px-5 py-1 md:py-2 mt-6 bg-[#efefef;] md:text-[1rem] text-[.8rem]  text-slate-900 rounded-full hover:scale-110 duration-200 ease-in-out cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              toggleEditModal();
            }}
          >
            {" "}
            Edit
          </button>
          <button
            className="px-3 md:px-5 py-1 md:py-2 mt-6 bg-[#fb3434]  md:text-[1rem] text-[.8rem] text-[#fefefe] rounded-full hover:scale-110 duration-200 ease-in-out cursor-pointer"
            onClick={() => removeTask()}
          >
            {" "}
            Delete
          </button>
        </div>

        <button
          className="close-modal absolute top-2 right-3"
          onClick={() => toggleViewModal()}
        >
          <MdOutlineCloseFullscreen className="h-5 w-5 text-[#333333c3] hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default ViewTaskModal;
