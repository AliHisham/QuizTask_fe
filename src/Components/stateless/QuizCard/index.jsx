import React, { useContext } from "react";
import { QuizContext } from "../../../Context/QuizContext";
import { Link } from "react-router-dom";
import Button from "../Button";

const QuizCard = (quiz) => {
  const { userType } = useContext(QuizContext);
  return (
    <div className="bg-white rounded-md flex flex-col gap-3 p-4 w-full">
      <p className="font-bold text-lg">{quiz.title}</p>
      <p className="font-medium">
        Number Of Questions :{quiz.questions_answers.length}
      </p>
      {userType === "admin" ? (
        <Link to={`QuizForm/${quiz.id}`}>
          <Button styling={"bg-purple-600 p-4 rounded-md text-white w-3/12"}>
            {"Edit"}
          </Button>
        </Link>
      ) : (
        <Link to={`answer/${quiz.id}`}>
          <Button styling={"bg-purple-600 p-4 rounded-md text-white w-3/12"}>
            {"Solve"}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default QuizCard;
