import React from "react";
import Button from "../Button";

const Answer = ({ title, onClick }) => {
  return (
    <div className="bg-white rounded-md m-2 flex gap-4 p-2">
      <p>{title}</p>
      <button
        onClick={onClick}
        className="bg-transparent text-black  rounded-md p-2"
      >
        X
      </button>
    </div>
  );
};

export default Answer;
