import { useContext } from "react";
import Button from "../../stateless/Button";
import { QuizContext } from "../../../Context/QuizContext";
import { Link } from "react-router-dom";
const Listing = () => {
  const { toggle, userType } = useContext(QuizContext);

  const createNewQuiz = () => {
    console.log("create new quiz");
  };
  return (
    <div className="flex p-4 bg-gray-400 rounded-lg">
      <div className="justify-start">
        <Button onClick={toggle}>{userType}</Button>
      </div>
      <div className="flex flex-grow justify-end items-end">
        <Button onClick={createNewQuiz}>
          {<Link to={"QuizForm"}>{"New Quiz"}</Link>}
        </Button>
      </div>
    </div>
  );
};

export default Listing;
