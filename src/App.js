import { useContext } from "react";
import { QuizContext } from "./Context/QuizContext";
import "./App.css";
import Listing from "./Components/statefull/Listing";

function App() {
  const { toggle, userType } = useContext(QuizContext);

  return (
    <div className="bg-gray-200 m-4 rounded-md p-4">
      <Listing />
    </div>
  );
}

export default App;
