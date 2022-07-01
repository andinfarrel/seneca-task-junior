import { random, swapItemInArray } from "@/utils";
import { useEffect, useState } from "react";

export interface QuizSelectOptions {
  correctAnswer: string;
  options: string[];
  selectedAnswer?: string;
}

export const useQuizLogic = (choices: QuizSelectOptions[]) => {
  const getRandomizedChoices = () =>
    choices.map((choices) => {
      const newOptions = choices.options;
      choices.options.forEach((option) =>
        swapItemInArray(
          newOptions,
          random(newOptions.length),
          random(newOptions.length)
        )
      );

      return {
        correctAnswer: choices.correctAnswer,
        options: newOptions,
        selectedAnswer: newOptions[0],
      };
    });

  const tallyAnswers = (list: QuizSelectOptions[]) => {
    let total = 0;
    list.forEach((selectOptions) => {
      if (selectOptions.correctAnswer === selectOptions.selectedAnswer)
        total += 1;
    });
    return total;
  };

  const [choicesList, setChoicesList] = useState(choices);
  const [success, setSuccess] = useState(tallyAnswers(choices) / choices.length);
  
  useEffect(() => {
    const randomized = getRandomizedChoices();
    setChoicesList(randomized);
    setSuccess(tallyAnswers(randomized) / choicesList.length)
  }, []);

  const answerChangeHandler = (index: number) => {
    return (answer: string) => {
      if (success === 1) return;
      setChoicesList((prev) => {
        const newList = prev;
        newList[index].selectedAnswer = answer;
        setSuccess(tallyAnswers(newList) / choicesList.length)
        return newList;
      });
    };
  }

  return {
    choicesList,
    answerChangeHandler,
    success
  }
}