import React, { useState, useEffect, useContext } from "react";
import YouTube from "react-youtube";
import { useParams, Link } from "react-router-dom";
import { QuizContext } from "../../../Context/QuizContext";
import Button from "../../stateless/Button";
const AnswerSheet = ({}) => {
  const { allQuizzes } = useContext(QuizContext);
  const [quiz, setQuiz] = useState({});
  const [videoId, setVideoId] = useState("");
  const { id } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let quizObj = allQuizzes.find((aQ) => aQ.id == id);
    setQuiz(quizObj);
    setVideoId(getVideoId(quizObj.url));
  }, [id]);

  const submitQuiz = () => {
    let arr = [];
    for (let i = 0; i < selectedAnswers.length; i++) {
      for (let j = 0; j < quiz.questions_answers[i].answers.length; j++) {
        if (selectedAnswers[i] === quiz.questions_answers[i].answers[j].text) {
          arr.push(quiz.questions_answers[i].answers[j].is_true);
        }
      }
      setDisabled(true);
    }

    setFeedback(arr);
  };
  const handleRadioChange = (questionIndex, answerValue, question) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answerValue;

      return updatedAnswers;
    });
  };
  function getVideoId(url) {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
  }

  return (
    <div className="bg-gray-200 grid-cols-1 gap-8 p-5 grid">
      <div>
        <YouTube videoId={videoId} />
      </div>
      {quiz &&
        quiz.questions_answers &&
        quiz.questions_answers.map((q, i) => {
          return (
            <div key={i} className="font-bold m-2">
              {q.text}
              <p className={feedback[i] ? "text-green-400" : "text-red-400"}>
                {feedback[i]
                  ? "CORRECT"
                  : feedback[i] == false
                  ? "INCORRECT"
                  : ""}
              </p>
              <div className="grid grid-cols-1">
                {q.answers.map((x, j) => {
                  return (
                    <label key={j} htmlFor={x.text}>
                      <input
                        disabled={disabled}
                        className="p-2 m-2"
                        id={x.text}
                        type="radio"
                        name={`question_${i}`}
                        value={x.text}
                        onChange={() => handleRadioChange(i, x.text, q)}
                      />
                      {x.text}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      <div className="flex justify-center">
        <div className="w-1/4">
          <Button disabled={disabled} onClick={submitQuiz}>
            {"submit Quiz"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerSheet;
