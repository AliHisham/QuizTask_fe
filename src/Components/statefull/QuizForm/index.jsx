import { useRef, useState, useContext } from "react";
import Input from "../../stateless/Input";
import Button from "../../stateless/Button";
import Answer from "../../stateless/Answer";
import AddQuestion from "../../stateless/AddQuestion";
import { QuizContext } from "../../../Context/QuizContext";
const QuizForm = () => {
  const { addQuiz } = useContext(QuizContext);
  const [ansCheck, setAnsCheck] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [answerInput, setAnswerInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [savedQuestions, setSavedQuestions] = useState([]);
  const inputRef = useRef(null);

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: answerInput, is_true: isCorrect }]);
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
    setAnswers((prev) => prev.filter((ans) => ans.text !== a.text));
  };

  const handleAddQuestion = () => {
    setSavedQuestions([
      ...savedQuestions,
      {
        answer_id: null,
        text: question,
        answers: answers,
        feedback_false: "false feedback",
        feedback_true: "true feedback",
      },
    ]);
    setAnsCheck(false);
    setAnswers([]);
    setQuestion("");
  };

  const addQuizz = () => {
    let currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const year = currentDate.getFullYear();

    // Format the date as "day month year"
    const formattedDate = `${day} ${month} ${year}`;
    let quizObj = {
      created: formattedDate,
      description: description,
      modified: formattedDate,
      questions_answers: savedQuestions,
      score: null,
      title: description,
      url: url,
    };
    addQuiz(quizObj);
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
        {savedQuestions.length ? (
          <>
            {console.log(savedQuestions, "savedddd")}
            {savedQuestions.map((saved, i) => {
              return (
                <div key={i}>
                  <div className="col-span-2 gap-2 flex">
                    <Input
                      onChange={handleQuestionChange}
                      value={saved.text}
                      id="question"
                      placeHolder={"enter question"}
                    />
                  </div>
                  <div className="col-span-2 flex flex-wrap">
                    {saved.answers.map((ans, j) => {
                      return (
                        <div className="basis-1/4" key={j}>
                          <Answer title={ans.text}></Answer>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <AddQuestion
              ansCheck={ansCheck}
              handleQuestionChange={handleQuestionChange}
              handleAnswerInputChange={handleAnswerInputChange}
              handleIsCorrectAnswer={handleIsCorrectAnswer}
              handleAddAnswer={handleAddAnswer}
              removeAnswer={removeAnswer}
              answers={answers}
              isCorrect={isCorrect}
              answerInput={answerInput}
              handleAddQuestion={handleAddQuestion}
              question={question}
            />
          </>
        ) : (
          <>
            <AddQuestion
              ansCheck={ansCheck}
              handleQuestionChange={handleQuestionChange}
              handleAnswerInputChange={handleAnswerInputChange}
              handleIsCorrectAnswer={handleIsCorrectAnswer}
              handleAddAnswer={handleAddAnswer}
              removeAnswer={removeAnswer}
              answers={answers}
              isCorrect={isCorrect}
              answerInput={answerInput}
              handleAddQuestion={handleAddQuestion}
              question={question}
            />
          </>
        )}
      </div>

      <div className="col-span-2 justify-center text-center">
        <Button
          onClick={addQuizz}
          disabled={savedQuestions.length ? false : true}
        >
          {"Create Quizz"}
        </Button>
      </div>
    </div>
  );
};

export default QuizForm;
