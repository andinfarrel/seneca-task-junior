import { FC, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { QuizSelectOptions, useQuizLogic } from "../../hooks/use-quiz-logic";
import { useWindowSizes } from "@/hooks/use-window-sizes";

const Quiz: FC<{
  title: string;
  quiz: QuizSelectOptions[];
}> = ({ title, quiz }) => {
  const { progress, answerChangeHandler, choicesList } = useQuizLogic(quiz);
  const success = progress === 1;

  const progressAsInt = Math.ceil(progress * 10);

  return (
    <div
      style={ !success ? {
        background: `linear-gradient(hsla(${34 + progressAsInt * 2}, 89%, 69%, 1), hsla(${19 + progressAsInt * 2}, 80%, 55%, 1))`
      } : {}}
      className={clsx("quiz-container font-bold", {
        "bg-gradient-blue": success,
      })}
    >
      <p className="quiz-title">{title}</p>
      <QuizSelects
        choicesList={choicesList}
        answerChangeHandler={answerChangeHandler}
        disable={success}
      />
      <p className="quiz-subtitle">
        The answer is {success ? "correct" : "incorrect"}
      </p>
    </div>
  );
};

const QuizSelects: FC<{
  disable?: boolean;
  answerChangeHandler: (index: number) => (answer: string) => void;
  choicesList: QuizSelectOptions[];
}> = ({ choicesList, answerChangeHandler, disable }) => {
  return (
    <div className="quiz-selects">
      {choicesList.map((choices, index) => (
        <QuizSelect
          disable={disable}
          key={choices.correctAnswer}
          selectOptions={choices}
          selectAction={answerChangeHandler(index)}
        />
      ))}
    </div>
  );
};

const QuizSelect: FC<{
  disable?: boolean;
  selectOptions: QuizSelectOptions;
  selectAction: (answer: string) => void;
}> = ({ selectOptions, selectAction, disable }) => {
  const { options, correctAnswer } = selectOptions;
  const [posIdx, setPosIdx] = useState(0);
  const windowSizes = useWindowSizes();

  const isExtended = options.length === 3;
  const maxCharLength = Math.max(...options.map((option) => option.length));

  const shouldCol =
    windowSizes.width <= 720 && (isExtended || maxCharLength > 12);
  // console.log(`${selectOptions.correctAnswer}: ${shouldCol}`)
  const positions = !isExtended ? ["start", "end"] : ["start", "center", "end"];
  const pos = positions[posIdx];

  const toggleHandler = () => {
    if (disable) return;
    const newIdx = (posIdx + 1) % options.length;
    setPosIdx(newIdx);
    selectAction(options[newIdx]);
  };

  return (
    <div
      data-position={pos}
      className={clsx("select-container", {
        "select-container-col": shouldCol,
        "cursor-none": disable
      })}
      onClick={toggleHandler}
    >
      {/* List of labels / options */}
      <div
        className={clsx("quiz-options-container", {
          "border-white": disable,
          "quiz-options-container-col": shouldCol,
        })}
      >
        {options.map((option, index) => (
          <p
            key={option}
            className={clsx("quiz-option", {
              "text-gray": posIdx == index,
              "quiz-option-col": shouldCol,
            })}
          >
            {option}
          </p>
        ))}
      </div>
      {/* This will act as a background for the components */}
      <motion.div
        layout
        className={clsx("selected-bg", {
          "selected-bg-ext": isExtended && !shouldCol,
          "selected-bg-col": shouldCol && !isExtended,
          "selected-bg-ext-col": isExtended && shouldCol
        })}
      />
    </div>
  );
};

export default Quiz;
