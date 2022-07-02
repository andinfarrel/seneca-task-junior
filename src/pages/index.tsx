import { Quiz } from "@/components/Quiz";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";


const Home: NextPage = () => {
  const quiz = {
    question: "An  animal cell contains:",
    answers: [
      {
        correctAnswer: "Ribosomes",
        options: ["Cell wall", "Ribosomes"]
      },
      {
        correctAnswer: "Partially permeable membrane",
        options: ["Partially permeable membrane", "Impermeable membrane"]
      },
      {
        correctAnswer: "Cytoplasm",
        options: ["Cytoplasm", "Chloroplast"]
      },
      {
        correctAnswer: "Mitochondria",
        options: ["Cellulose", "Mitochondria"]
      },
      {
        correctAnswer: "Three",
        options: ["One", "Two", "Three"]
      },
    ]
  }
  
  return <div className="min-h-screen w-screen">
    <Quiz question={quiz.question} answers={quiz.answers}/>
    <Quiz question={quiz.question} answers={quiz.answers}/>
  </div>;
};

export default Home;
