import { FC, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { QuizSelectOptions, useQuizLogic } from "../../hooks/use-quiz-logic";
import { useWindowSizes } from "@/hooks/use-window-sizes";

const Quiz: FC<{
  title: string;
  choices: QuizSelectOptions[];
}> = ({ title, choices }) => {
  const { success, answerChangeHandler, choicesList } = useQuizLogic(choices);

  return (
    <div className={clsx("quiz-container font-bold bg-gradient-orange ", { "bg-gradient-blue" : success === 1})}>
      <p className="quiz-title">{title}</p>
      <QuizSelects
        choicesList={choicesList}
        answerChangeHandler={answerChangeHandler}
        disable={success === 1}
      />
      <p className="quiz-subtitle">The answer is {success === 1 ? "correct" : "incorrect"}</p>
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
  const maxCharLength = Math.max(...options.map(option => option.length));

  const shouldCol = windowSizes.width <= 320 && (isExtended || maxCharLength > 12);
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
      className={clsx("select-container", { "select-container-col": shouldCol })}
      onClick={toggleHandler}
    >
      <div className={clsx("quiz-options-container", { "border-white": disable, "quiz-options-container-col": shouldCol })}>
        {options.map((option, index) => (
          <p
            key={option}
            className={clsx("quiz-option", { "text-gray": posIdx == index, "quiz-option-col": shouldCol })}
          >
            {option}
          </p>
        ))}
      </div>
      <motion.div layout className={clsx("selected-bg", {"selected-bg-ext": isExtended, "selected-bg-col": shouldCol})}/>
    </div>
  );
};

export default Quiz;
