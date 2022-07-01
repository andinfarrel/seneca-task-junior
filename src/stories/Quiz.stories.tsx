import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Quiz } from "@/components/Quiz";

export default {
  title: "Components/Quiz",
  component: Quiz
} as ComponentMeta<typeof Quiz>

const Template: ComponentStory<typeof Quiz> = (args) => 
  <div className="h-screen w-screen flex flex-col items-center">
    <Quiz {...args}/> 
  </div>

export const AnimalCells = Template.bind({})
AnimalCells.args = {
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
    // {
    //   correctAnswer: "A",
    //   options: ["A", "B", "C"]
    // },
  ]
}