// BrawlStars.tsx
import { useState } from "react";
import Question, { generateQuestions, QuestionData } from "./question";
import { BrawlStarCharacter, BrawlStarsJson, CategoryProperties } from "./App";
import Characters from "./charaters";

  
interface BrawlStarsProps {
    allCharacters: BrawlStarsJson;
    characters: BrawlStarCharacter[];
    categories: CategoryProperties[];
    setCharacters: React.Dispatch<React.SetStateAction<BrawlStarCharacter[]>>;
}

const BrawlStars: React.FC<BrawlStarsProps> = ({ allCharacters, characters, categories, setCharacters }) => {
  const questionsGenerator = generateQuestions();
  const [question, setQuestion] = useState<QuestionData>(questionsGenerator.next().value!);

  const drawCharacter: () => void  = () => {
    const charactersNotInList = Object.values(allCharacters).filter(character => !characters.map(c=>c.name).includes(character.name));
    if (charactersNotInList.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * charactersNotInList.length);
    const newCharacter = charactersNotInList[randomIndex];
    newCharacter.isNew = true;
    const updatedCharacters = characters.map(c => ({...c, isNew: false}));
    setCharacters([...updatedCharacters, newCharacter]);
  }

  const removeCharacter = () => {
    if (characters.length === 0) {
      return;
    }
    const lastIndex = characters.length - 1;
    const newCharacters = [...characters];
    newCharacters.splice(lastIndex, 1);
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
        <Characters characters={characters} categories={categories} />
        <Question question={question.question} choices={question.choices} correctChoice={question.correctChoice} successCallback={onSuccessfulAnswer} failureCallback={onFailedAnswer} />
    </>
  );
}

export default BrawlStars;