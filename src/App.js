import { useContext } from "react";
import { QuizContext } from "./Context/QuizContext";
import "./App.css";
import Listing from "./Components/statefull/Listing";

function App() {
  const { toggle, userType } = useContext(QuizContext);

  return (
    <div className="bg-green-300">
      <Listing></Listing>
    </div>
  );
}

export default App;
