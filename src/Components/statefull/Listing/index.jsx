import { useContext } from "react";
import Button from "../../stateless/Button";
import { QuizContext } from "../../../Context/QuizContext";
const Listing = () => {
  const { toggle, userType } = useContext(QuizContext);
  return (
    <div className="bg-slate-500 p-4">
      <Button onClick={toggle}>{userType}</Button>
    </div>
  );
};

export default Listing;
