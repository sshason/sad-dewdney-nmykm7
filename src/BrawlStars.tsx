// BrawlStars.tsx
import { useState } from "react";
import Question from "./question";
import Characters from "./charaters";

const allCharacters = [
  {
      name: "Shelly",
      image: "https://th.bing.com/th/id/OIP.tMaO1vPm-AiJ_Pm2YAO6mAAAAA?w=115&h=193&c=7&r=0&o=5&pid=1.7"
  },
  {
      name: "Leon",
      image: "https://th.bing.com/th/id/OIP.P6cnim9x6QykoA4R76UkIwHaFj?w=245&h=184&c=7&r=0&o=5&pid=1.7"
  },
  {
      name: "Nita",
      image: "https://th.bing.com/th/id/OIP.7UuQK6vtn88CFDzgeDy1ZgHaFj?w=226&h=180&c=7&r=0&o=5&pid=1.7"
  },
  {
      name: "Ruffs",
      image: "https://th.bing.com/th/id/OIP.N7syvExVZKzJ-TM5w5l97wHaMX?w=115&h=183&c=7&r=0&o=5&pid=1.7"
  },
]

interface QuestionData {
  question: string;
  choices: string[];
  correctChoice: string;
}

function* generateQuestions() {
  const generateQuestionData = (): QuestionData => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    const answer = num1 + num2;
    const choices = [answer.toString()];

    while (choices.length < 4) {
      const randomChoice = Math.floor(Math.random() * 20) + 1;
      if (!choices.includes(randomChoice.toString())) {
        choices.push(randomChoice.toString());
      }
    }

    choices.sort(() => Math.random() - 0.5);

    return {
      question: `${num1} + ${num2} = ?`,
      choices,
      correctChoice: answer.toString(),
    };
  };

  while (true) {
    yield generateQuestionData();
  }
}

const BrawlStars = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const questionsGenerator = generateQuestions();
  const [question, setQuestion] = useState<QuestionData>(questionsGenerator.next().value!);

  const drawCharacter: () => void  = () => {
    const charactersNotInList = allCharacters.filter(character => !characters.map(c=>c.name).includes(character.name));
    if (charactersNotInList.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * charactersNotInList.length);
    setCharacters([...characters, charactersNotInList[randomIndex]]);
  }

  const removeCharacter = () => {
    if (characters.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * characters.length);
    const newCharacters = [...characters];
    newCharacters.splice(randomIndex, 1);
    setCharacters(newCharacters);
  }

  const onSuccessfulAnswer = () => {
    drawCharacter();
    setQuestion(questionsGenerator.next().value!);
  }

  const onFailedAnswer = () => {
    removeCharacter();
    setQuestion(questionsGenerator.next().value!);
  }

  return (
    <>
      <Characters characters={characters} />
      <Question question={question.question} choices={question.choices} correctChoice={question.correctChoice} successCallback={onSuccessfulAnswer} failureCallback={onFailedAnswer} />
    </>
  );
}

export default BrawlStars;