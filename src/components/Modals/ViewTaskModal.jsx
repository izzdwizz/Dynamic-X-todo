import React, { useState } from "react";
import styles from "./addModal.module.css";
import { MdOutlineCloseFullscreen } from "react-icons/md";
const ViewTaskModal = ({
  toggleViewModal,
  toggleEditModal,
  title,
  description,
}) => {
  const toggleEdit = () => {};
  // Function to adjust textarea height dynamically based on content
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
        <h2 className="text-[#122156] font-[700] text-[1.5rem] pb-4">
          View Task
        </h2>

        <div className="flex flex-col w-full gap-2 pb-4 ">
          <label>Title</label>
          <input
            className="input border-[1px] border-[#12215641] cursor-not-allowed bg-slate-100"
            type="text"
            value={title}
            placeholder={title ?? "Title"}
            disabled={true}
          />
        </div>
        <div className="flex flex-col w-full gap-2 pb-4 ">
          <label>Task Description</label>

          <textarea
            value={description}
            className="border-[1px] border-[#12215641] outline-none p-2 w-full resize-none rounded cursor-not-allowed bg-slate-100 "
            style={{ height: "auto", minHeight: "110px" }}
            rows={2}
            disabled={true}
            placeholder={description ?? "Description"}
            ref={(textarea) => textarea && autoAdjustTextareaHeight(textarea)}
          />
        </div>
        <div className="flex flex-row w-full items-end py-2 text-[1rem] gap-4 justify-end  font-[Nunito] relative">
          <button
            className="px-5 py-2 mt-6 bg-[#122156] text-white rounded-full hover:scale-110 duration-200 ease-in-out cursor-pointer"
            onClick={() => addTask(title, description)}
          >
            {" "}
            Completed
          </button>
          <button
            className="px-5 py-2 mt-6 bg-[#122156] text-white rounded-full hover:scale-110 duration-200 ease-in-out cursor-pointer"
            onClick={() => addTask(title, description)}
          >
            {" "}
            Incomplete
          </button>
          <button
            className="px-5 py-2 mt-6 bg-[#efefef;] text-slate-900 rounded-full hover:scale-110 duration-200 ease-in-out cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              toggleEditModal();
            }}
          >
            {" "}
            Edit
          </button>
          <button className="px-5 py-2 mt-6 bg-[#fb3434] text-[#fefefe] rounded-full hover:scale-110 duration-200 ease-in-out cursor-pointer">
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