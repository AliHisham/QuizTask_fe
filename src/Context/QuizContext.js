import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const QuizContext = createContext({
  userType: null,
  toggle: null,
  allQuizzes: [],
  addQuiz: null,
  editQuiz: null,
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
  }, [allQuizzes]);

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
  const editQuiz = (quiz) => {
    if (quiz) {
      axios
        .put(`http://localhost:5000/quizzes/${quiz.id}`, {
          created: quiz.created,
          description: quiz.description,
          modified: quiz.modified,
          questions_answers: quiz.questions_answers,
          score: quiz.score,
          title: quiz.description,
          url: quiz.url,
        })
        .then((res) => {
          setAllQuizzes((prev) => {
            prev.map((p) => {
              if (p.id == quiz.id) {
                return {
                  ...p,
                  created: quiz.created,
                  description: quiz.description,
                  modified: quiz.modified,
                  questions_answers: quiz.questions_answers,
                  score: quiz.score,
                  title: quiz.description,
                  url: quiz.url,
                };
              } else {
                return p;
              }
            });
          });
        });
    }
  };

  return (
    <QuizContext.Provider
      value={{
        userType,
        toggle,
        addQuiz,
        allQuizzes,
        editQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
