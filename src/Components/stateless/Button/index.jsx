import React from "react";

const Button = ({ children, onClick, styling, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        styling ? styling : "bg-purple-600 p-4 rounded-md text-white w-full"
      }
    >
      {children}
    </button>
  );
};

export default Button;
