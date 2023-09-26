import React, { useContext } from "react";
import { QuizContext } from "../../../Context/QuizContext";
import { Link } from "react-router-dom";
import Button from "../Button";

const QuizCard = ({ text, numberOfQuesions, id }) => {
  const { userType } = useContext(QuizContext);
  return (
    <div className="bg-white rounded-md flex flex-col gap-3 p-4 w-full">
      <p>{text}</p>
      <p>Number Of Questions :{numberOfQuesions}</p>
      {userType === "admin" ? (
        <Link to={`QuizForm/${id}`}>
          <Button styling={"bg-purple-600 p-4 rounded-md text-white w-3/12"}>
            {"Edit"}
          </Button>
        </Link>
      ) : (
        <Link>
          <Button>{"Solve"}</Button>
        </Link>
      )}
    </div>
  );
};

export default QuizCard;
