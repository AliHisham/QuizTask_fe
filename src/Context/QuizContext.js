import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const QuizContext = createContext({
  userType: null,
  toggle: null,
  allQuizzes: null,
  addQuiz: null,
});

export const QuizContextProvider = ({ children }) => {
  const [userType, setUserType] = useState("admin");
  const [allQuizzes, setAllQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/quizzes")
      .then((res) => {
        let { data } = res;
        if (JSON.stringify(data) != JSON.stringify(allQuizzes)) {
          setAllQuizzes(data);
        }
      })
      .catch((err) => {
        console.log(err, "errror");
      });
  }, []);

  const toggle = () => {
    setUserType((prev) => {
      if (prev === "admin") {
        return "user";
      } else {
        return "admin";
      }
    });
  };

  const addQuiz = (quiz) => {
    if (quiz) {
      axios
        .post("http://localhost:5000/quizzes", quiz)
        .then((res) => {
          setAllQuizzes((prev) => [...prev, quiz]);
        })
        .catch((err) => {
          console.log(err, "errr");
        });
    }
  };

  return (
    <QuizContext.Provider
      value={{
        userType,
        toggle,
        addQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
