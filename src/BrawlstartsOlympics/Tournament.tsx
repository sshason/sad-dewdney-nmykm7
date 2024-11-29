import React, { useState } from 'react';
import CharacterSelection from './CharacterSelection';
import GameRound from './GameRound';
import { BrawlStarCharacter, CategoryProperties, Prize } from '../App';
import TournamentMap from './TournamentMap';
import TournamentResult from './TournamentResult';
import {generateQuestions, QuestionType} from "../question";

interface GameProps {
    characters: BrawlStarCharacter[];
    categories: CategoryProperties[];
    updateCharacter: (characters: BrawlStarCharacter) => void;
}

export enum Round {
    QuarterFinal = 'Quarter Final',
    SemiFinal = 'Semi Final',
    Final = 'Final',
}

export const roundToQuestionTypeMap = new Map<Round, QuestionType>();
roundToQuestionTypeMap.set(Round.QuarterFinal, QuestionType.Addition);
roundToQuestionTypeMap.set(Round.SemiFinal, QuestionType.Substraction);
roundToQuestionTypeMap.set(Round.Final, QuestionType.DecimalAddition);

function getNextPrize(prize: Prize): Prize {
    return prize + 1

}

export interface Match {
    character: BrawlStarCharacter;
    opponent: BrawlStarCharacter;
    round: Round;
    score: { character: number; opponent: number };
}

function drawOpponents(characters: BrawlStarCharacter[], selectedCharacter: BrawlStarCharacter, numberOfOpponents: number): BrawlStarCharacter[] {
    const opponents = [];
    const charactersNotInList = characters.filter(character => character.name !== selectedCharacter.name);
    for (let i = 0; i < numberOfOpponents; i++) {
      const randomIndex = Math.floor(Math.random() * (charactersNotInList.length - i));
      opponents.push(charactersNotInList[randomIndex]);
      charactersNotInList[randomIndex] = charactersNotInList[charactersNotInList.length - 1];
    }
    return opponents;
  }

const Game: React.FC<GameProps> = ({characters, categories, updateCharacter}) => {
    const [selectedCharacter, setSelectedCharacter] = useState(undefined as BrawlStarCharacter | undefined);
    const [matches, setMatches] = useState([] as Match[]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const [showTorunamentResult, setShowTournamentResult] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const [currentPrize, setCurrentPrize] = useState(Prize.None);
    const [currentRound, setCurrentRound] = useState(Round.QuarterFinal);
    const [questionType, setQuestionType] = useState(roundToQuestionTypeMap.get(currentRound)!);
    const [questionsGenerator, setQuestionGenerator] = useState(generateQuestions(questionType));
    const [currentQuestion, setCurrentQuestion] = useState(questionsGenerator.next().value!);
  
    const handleCharacterSelect = (char: BrawlStarCharacter) => {
      setSelectedCharacter(char);
      const opponents = drawOpponents(characters, char, 3);
      const newMatches = opponents.map(opponent => ({ character: char, opponent, round: Round.QuarterFinal, score: { character: 0, opponent: 0 } }));
      newMatches[0].round = Round.QuarterFinal;
      newMatches[1].round = Round.SemiFinal;
      newMatches[2].round = Round.Final;
      setMatches(newMatches);
    };

    const handleWin = () => {
      const prize = getNextPrize(currentPrize);
      setCurrentPrize(prize);
      if (currentMatchIndex === matches.length - 1) {
        setIsWin(true);
        onTournamentComplete(prize);
      } else {
        setCurrentMatchIndex((prevMatch: number) => prevMatch + 1);
        updateQuestion(matches[currentMatchIndex + 1]);
      }
    };

    const handleLost = () => {
      setIsWin(false);
      onTournamentComplete(currentPrize);
    };
    
    const onTournamentComplete = (prize: Prize) => {
      const gold = prize === Prize.Gold ? 1 : 0;
      const silver = prize === Prize.Silver ? 1 : 0;
      const bronze = prize === Prize.Bronze ? 1 : 0;
      const updatedCharacter: BrawlStarCharacter = { ...selectedCharacter!, gold: (selectedCharacter?.gold ?? 0) + gold, silver: (selectedCharacter?.silver ?? 0) + silver, bronze: (selectedCharacter?.bronze ?? 0) + bronze };
      console.log('onTournamentComplete', prize, gold, silver, bronze, updatedCharacter);
      updateCharacter(updatedCharacter);
      setShowTournamentResult(true);
    }

    const updateCurrentMatch = (match: Match) => {
      const newMatches = [...matches];
      newMatches[currentMatchIndex] = match;
      setMatches(newMatches);
      setCurrentRound(match.round);
      updateQuestion(match);
    }

    const updateQuestion = (match: Match) => {
      setCurrentRound(match.round);
      setQuestionType(roundToQuestionTypeMap.get(match.round)!);
      const generator = generateQuestions(roundToQuestionTypeMap.get(match.round)!);
      setQuestionGenerator(generator);
      setCurrentQuestion(generator.next().value!);
    }

    const handleRestart = () => {
        setSelectedCharacter(undefined);
        setMatches([]);
        setCurrentMatchIndex(0);
        setShowTournamentResult(false);
        setIsWin(false);
        setCurrentPrize(Prize.None);
    }

  
    if (!selectedCharacter) {
        return (
            <CharacterSelection characters={characters} categories={categories} onSelect={handleCharacterSelect} />
        );
    } else {
        return (
            <div>
                <TournamentMap matches={matches} activeMatchIndex={currentMatchIndex} />
                <GameRound match={matches[currentMatchIndex]} question={currentQuestion} onLost={handleLost} onWin={handleWin} updateCurrentMatch={updateCurrentMatch} />
                { showTorunamentResult && <TournamentResult isWin={isWin} onRestart={handleRestart} onClose={handleRestart} character={selectedCharacter} prize={currentPrize} />}
            </div>
        );
    }
  };
  
  export default Game;