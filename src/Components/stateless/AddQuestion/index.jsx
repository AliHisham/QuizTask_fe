import React from "react";
import Input from "../Input";
import Button from "../Button";
import Answer from "../Answer";

const AddQuestion = ({
  ansCheck,
  answers,
  handleAddAnswer,
  handleIsCorrectAnswer,
  isCorrect,
  handleAnswerInputChange,
  handleQuestionChange,
  answerInput,
  removeAnswer,
  handleAddQuestion,
  question,
}) => {
  return (
    <>
      <div className="col-span-2">
        <Input
          onChange={handleQuestionChange}
          id="question"
          placeHolder={"enter question"}
          value={question}
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

      <div className="col-span-2 flex  ">
        <div className="w-1/2 flex flex-wrap">
          {answers.length ? (
            answers.map((a, i) => {
              return (
                <div key={i} className="basis-1/12">
                  <Answer
                    onClick={() => removeAnswer(a)}
                    key={i}
                    title={a.text}
                  />
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        {answers.length > 0 && (
          <div className="w-1/2">
            <Button onClick={handleAddQuestion}>{"Add Question"}</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default AddQuestion;
