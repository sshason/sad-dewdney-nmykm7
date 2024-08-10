import "./App.css";
import Menu from './menu'; // Adjust the path if necessary
import Characters from './charaters'; // Adjust the path if necessary
import { useState } from 'react';
import Question from "./question";

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
    const num2 = Math.floor(Math.random() * 10) + 1;
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

function App() {
  const [characters, setCharacters] = useState<any[]>([]);

  const drawCharacter: () => void  = () => {
    const charactersNotInList = allCharacters.filter(character => !characters.includes(character));
    if (charactersNotInList.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * charactersNotInList.length);
    setCharacters([...characters, charactersNotInList[randomIndex]]);
  }

  return (
    <>
      <div>
        <img src='https://th.bing.com/th/id/OIP.jts_eWK_m0N25cf5oATDFAHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7' />
      </div>
      <h1>המחשב של תום</h1>
      <Characters characters={characters} />
      <Question question="1+1=" choices={['1', '2', '3', '4']} correctChoice="2" successCallback={drawCharacter} />
      <Menu />
    </>
  );
}

export default App;
