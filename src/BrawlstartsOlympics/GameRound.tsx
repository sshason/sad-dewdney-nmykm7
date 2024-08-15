import React, { useEffect, useState } from "react";
import Question, { generateQuestions, QuestionData } from "../question";
import { Match } from "./Tournament";

interface GameRoundProps {
    match: Match;
    onWin: () => void;
    onLost: () => void;
    updateCurrentMatch: (match: Match) => void;
}

const GameRound: React.FC<GameRoundProps> = ({ match, onWin, onLost, updateCurrentMatch }) => {
    const questionsGenerator = generateQuestions();
    const [question, setQuestion] = useState<QuestionData>(questionsGenerator.next().value!);
  
    useEffect(() => {
        if (match.score.character + match.score.opponent === 3) {
            if (match.score.character > match.score.opponent) {
                onWin();
            } else {
                onLost();
            }
        }
    }, [match]);

    const onSuccessfulAnswer = () => {
        const newMatch = { ...match };
        newMatch.score.character++;
        updateCurrentMatch(newMatch);
        setQuestion(questionsGenerator.next().value!);
    };

    const onFailedAnswer = () => {
        const newMatch = { ...match };
        newMatch.score.opponent++;
        updateCurrentMatch(newMatch);
        setQuestion(questionsGenerator.next().value!);
      };
  
    return (
      <div>
        <Question question={question.question} choices={question.choices} correctChoice={question.correctChoice} successCallback={onSuccessfulAnswer} failureCallback={onFailedAnswer} />
      </div>
    );
  };

  export default GameRound;