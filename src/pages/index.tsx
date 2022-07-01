import { Quiz } from "@/components/Quiz";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const quiz = {
  title: "An  animal cell contains:",
  quiz: [
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
    // {
    //   correctAnswer: "A",
    //   options: ["A", "B", "C"]
    // },
  ]
}

const Home: NextPage = () => {
  return <div className="h-screen w-screen">
    <Quiz title={quiz.title} quiz={quiz.quiz}/>
  </div>;
};

export default Home;
