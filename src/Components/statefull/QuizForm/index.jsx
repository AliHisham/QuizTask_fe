import { useRef, useState, useContext, useEffect } from "react";
import Input from "../../stateless/Input";
import Button from "../../stateless/Button";
import Answer from "../../stateless/Answer";
import AddQuestion from "../../stateless/AddQuestion";
import { QuizContext } from "../../../Context/QuizContext";
import { useParams, Link } from "react-router-dom";
const QuizForm = () => {
  const { id } = useParams();
  const { addQuiz, allQuizzes, editQuiz } = useContext(QuizContext);
  const [ansCheck, setAnsCheck] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [answerInput, setAnswerInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [savedQuestions, setSavedQuestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (id) {
      let quiz = allQuizzes.find((q) => q.id == id);

      setUrl(quiz.url);
      setSavedQuestions(quiz.questions_answers);
      setDescription(quiz.description);
    }
  }, [id]);
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
    if (id) {
      console.log(a, "inside");
      console.log("cjec");
      const questionAnswers = savedQuestions.map((saved) => {
        const answerss = saved.answers.filter((ans) => ans.text !== a);
        return {
          ...saved,
          answers: answerss,
        };
      });
      setSavedQuestions(questionAnswers);
    } else {
      setAnswers((prev) => prev.filter((ans) => ans.text !== a.text));
    }
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
    if (id) {
      let currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;
      let quiz = {
        modified: formattedDate,
        description: description,
        questions_answers: savedQuestions,
        score: null,
        title: description,
        url: url,
        id: id,
      };
      editQuiz(quiz);
    } else {
      let currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
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
    }
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
        value={url}
        placeHolder={"enter url"}
      ></Input>

      <div className="col-span-2">
        {savedQuestions.length ? (
          <>
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
                          <Answer
                            onClick={() => {
                              removeAnswer(ans.text);
                            }}
                            title={ans.text}
                          ></Answer>
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
        <Link to={"/"}>
          <Button
            onClick={addQuizz}
            disabled={savedQuestions.length ? false : true}
          >
            {id ? "Edit Quiz " : "Create Quiz"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizForm;
