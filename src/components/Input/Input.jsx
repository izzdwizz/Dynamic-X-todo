import { useState } from "react";

import "./Input.css";

export const Input = ({ onSubmit, setIsAddModal }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input) return;

    onSubmit(input);

    setInput("");
  };
  const handleClick = () => setIsAddModal(true);
  return (
    <div className="container">
      {/* <input
        className="input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      /> */}
      <button
        // onClick={handleSubmit}
        onClick={handleClick}
        className="button"
      >
        Add Task
      </button>
    </div>
  );
};
