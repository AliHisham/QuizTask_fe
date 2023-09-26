import { useContext } from "react";
import Button from "../../stateless/Button";
import { QuizContext } from "../../../Context/QuizContext";
import { Link } from "react-router-dom";
import QuizCard from "../../stateless/QuizCard";
const Listing = () => {
  const { toggle, userType, allQuizzes } = useContext(QuizContext);
  return (
    <div className=" flex flex-col gap-3">
      <div className="flex p-4 rounded-lg">
        <div className="justify-start">
          <Button onClick={toggle}>
            {userType == "admin" ? "Admin" : "User"}
          </Button>
        </div>
        {userType === "admin" && (
          <div className="flex flex-grow justify-end items-end">
            <Link to={"QuizForm"}>
              <Button>{"New Quiz"}</Button>
            </Link>
          </div>
        )}
      </div>

      <div className=" grid grid-cols-3 gap-4">
        {allQuizzes &&
          allQuizzes.length > 0 &&
          allQuizzes.map((q, i) => {
            return (
              <div key={i}>
                <QuizCard {...q} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Listing;
