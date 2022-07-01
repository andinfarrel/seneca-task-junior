import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Quiz } from "@/components/Quiz";

export default {
  title: "Components/Quiz",
  component: Quiz
} as ComponentMeta<typeof Quiz>

const Template: ComponentStory<typeof Quiz> = (args) => <Quiz {...args}/>

export const AnimalCells = Template.bind({})
AnimalCells.args = {
  title: "An  animal cell contains:",
  choices: [
    {
      correctAnswer: "Ribosomes",
      options: ["Cell wall", "Ribosomes"]
    },
    {
      correctAnswer: "Cytoplasm",
      options: ["Cytoplasm", "Chloroplast"]
    },
    {
      correctAnswer: "Partially permeable membrane",
      options: ["Partially permeable membrane", "Impermeable membrane"]
    },
    {
      correctAnswer: "Mitochondria",
      options: ["Cellulose", "Mitochondria"]
    },
  ]
}