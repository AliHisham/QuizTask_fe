import React from "react";

const Input = React.forwardRef(({ placeHolder, id, onChange, value }, ref) => {
  return (
    <input
      onChange={onChange}
      ref={ref}
      id={id}
      placeholder={placeHolder}
      value={value}
      className=" w-full m-2 bg-transparent  border-2 rounded-md p-3 text-black   border-gray-400 placeholder-gray-400 focus:outline-none"
    ></input>
  );
});

export default Input;
