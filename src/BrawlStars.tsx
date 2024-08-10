// BrawlStars.tsx
import { useState } from "react";
import Question from "./question";
import { Character } from "./App";

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


  
  interface BrawlStarsProps {
    allCharacters: Character[];
    characters: Character[];
    setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  }

const BrawlStars: React.FC<BrawlStarsProps> = ({ allCharacters, characters, setCharacters }) => {
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
    const randomIndex = characters.length - 1;
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
        <h1>Brawl Stars</h1>
      <Question question={question.question} choices={question.choices} correctChoice={question.correctChoice} successCallback={onSuccessfulAnswer} failureCallback={onFailedAnswer} />
    </>
  );
}

export default BrawlStars;