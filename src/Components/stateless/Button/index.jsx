import React from "react";

const Button = ({ children, onClick, styling }) => {
  return (
    <button onClick={onClick} className="bg-purple-600 p-4 rounded-md">
      {children}
    </button>
  );
};

export default Button;
