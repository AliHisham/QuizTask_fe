import { createContext, useState } from "react";

export const QuizContext = createContext({
  userType: null,
  toggle: null,
});

export const QuizContextProvider = ({ children }) => {
  const [userType, setUserType] = useState("admin");

  const toggle = () => {
    setUserType((prev) => {
      if (prev === "admin") {
        return "user";
      } else {
        return "admin";
      }
    });
  };

  return (
    <QuizContext.Provider
      value={{
        userType,
        toggle,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
