import React, { useState } from "react";
import styles from "./addModal.module.css";
import { MdOutlineCloseFullscreen } from "react-icons/md";
const AddTaskModal = ({ toggleAddModal, addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Function to adjust textarea height dynamically based on content
  const autoAdjustTextareaHeight = (element) => {
    if (element) {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }
  };
  return (
    <div className={styles.modal}>
      <div
        onClick={() => {
          toggleAddModal();
        }}
        className={styles.overlay}
      ></div>
      <form className={`${styles.modal_content} relative rounded-[10px]`}>
        <h2 className="text-[#122156] font-[700] text-[1.5rem] pb-4">
          Add Task
        </h2>

        <div className="flex flex-col w-full gap-2 pb-4 ">
          <label>Title</label>
          <input
            className="input border-[1px] border-[#12215641]"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-2 pb-4 ">
          <label>Task Description</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-[1px] border-[#12215641] outline-none p-2 w-full resize-none rounded "
            style={{ height: "auto", minHeight: "110px" }}
            rows={2}
            ref={(textarea) => textarea && autoAdjustTextareaHeight(textarea)}
          />
        </div>
        <div className="flex flex-col w-full items-end py-2 text-[1rem] gap-4 justify-end  font-[Nunito] relative">
          <button
            className="px-5 py-2 mt-6 bg-[#122156] text-white rounded-full hover:scale-110 duration-200 ease-in-out cursor-pointer"
            onClick={() => addTask(title, description)}
          >
            {" "}
            Add Task
          </button>
        </div>

        <button
          className="close-modal absolute top-2 right-3"
          onClick={() => {
            toggleAddModal();
          }}
        >
          <MdOutlineCloseFullscreen className="h-5 w-5 text-[#333333c3] hover:text-black" />
        </button>
      </form>
    </div>
  );
};

export default AddTaskModal;
