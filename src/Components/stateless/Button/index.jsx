import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-900 rounded-md">
      {children}
    </button>
  );
};

export default Button;
