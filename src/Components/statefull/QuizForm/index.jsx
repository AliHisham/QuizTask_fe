import { useRef, useState } from "react";
import Input from "../../stateless/Input";
import Button from "../../stateless/Button";
import Answer from "../../stateless/Answer";

const QuizForm = () => {
  const [ansCheck, setAnsCheck] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [answerInput, setAnswerInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const inputRef = useRef(null);

  const handleAddAnswer = () => {
    console.log(inputRef, "what is occuring here");
    setAnswers([...answers, { value: answerInput, correct: isCorrect }]);
    setAnswerInput("");
    setIsCorrect(false);
  };

  const handleAnswerInputChange = (event) => {
    setAnswerInput(event.target.value);
  };

  const handleIsCorrectAnswer = (event) => {
    setIsCorrect(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
    if (event.target.value) {
      setAnsCheck(true);
    } else {
      setAnsCheck(false);
      setAnswers([]);
    }
  };

  const removeAnswer = (a) => {
    console.log(a, "just checking the aa guyss");
    setAnswers((prev) => prev.filter((ans) => ans.value !== a.value));
  };

  return (
    <div className="grid grid-cols-2 gap-2 m-4 rounded-md bg-gray-200 p-5">
      <div className="col-span-2 text-center font-medium text-2xl">
        Quiz Form
      </div>
      <Input
        onChange={(event) => setDescription(event.target.value)}
        ref={inputRef}
        id="description"
        placeHolder={"enter description"}
        value={description}
      />
      <Input
        onChange={(event) => setUrl(event.target.value)}
        ref={inputRef}
        id="url"
        placeHolder={"enter url"}
      ></Input>
      <div className="col-span-2">
        <Input
          onChange={handleQuestionChange}
          ref={inputRef}
          id="question"
          placeHolder={"enter question"}
        />
      </div>
      {ansCheck && (
        <div className="flex col-span-2 gap-8">
          <div className="basis-1/2">
            <Input
              id="answer"
              value={answerInput}
              placeHolder={"enter answer"}
              onChange={handleAnswerInputChange}
            />
          </div>

          <div className="basis-1/4">
            <Input
              id="answer"
              value={isCorrect}
              onChange={handleIsCorrectAnswer}
              placeHolder={"is correct"}
            />
          </div>

          <div className="basis-1/4">
            <Button
              styling={"bg-purple-600 p-4 rounded-md text-white mt-1 w-full"}
              onClick={handleAddAnswer}
            >
              {"Add"}
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap">
        {answers.length ? (
          answers.map((a, i) => {
            return (
              <Answer onClick={() => removeAnswer(a)} key={i} title={a.value} />
            );
          })
        ) : (
          <></>
        )}
      </div>

      <div className="col-span-2 justify-center text-center">
        <Button disabled={answers.length ? false : true}>
          {"Create Quizz"}
        </Button>
      </div>
    </div>
  );
};

export default QuizForm;
