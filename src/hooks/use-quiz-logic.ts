import { random, swapItemInArray } from "@/utils";
import { useEffect, useState } from "react";

export interface QuizSelectOptions {
  correctAnswer: string;
  options: string[];
  selectedAnswer?: string;
}

export const useQuizLogic = (choices: QuizSelectOptions[]) => {
  const getRandomizedChoices = (arr: QuizSelectOptions[]) =>
    arr.map((choice) => {
      const newOptions = [...choice.options];
      newOptions.forEach((option) =>
        swapItemInArray(
          newOptions,
          random(newOptions.length),
          random(newOptions.length)
        )
      );
      return {
        correctAnswer: choice.correctAnswer,
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
  const [progress, setProgress] = useState(tallyAnswers(choices) / choices.length);

  useEffect(() => {
    let hasBeenCalled = false;
    if (!hasBeenCalled) {
      const randomized = getRandomizedChoices(choicesList);
      setChoicesList(randomized);
      setProgress(tallyAnswers(randomized) / randomized.length);
    }
    return () => { hasBeenCalled = true };
  }, []);

  const answerChangeHandler = (index: number) => {
    return (answer: string) => {
      if (progress === 1) return;
      const newList = choicesList;
      newList[index].selectedAnswer = answer;
      // batch update
      setChoicesList(newList);
      setProgress(tallyAnswers(newList) / newList.length);
    };
  }


  return {
    choicesList,
    answerChangeHandler,
    progress
  }
}