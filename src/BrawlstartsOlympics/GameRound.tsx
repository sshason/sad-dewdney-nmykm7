import React, { useEffect } from "react";
import Question, { QuestionData } from "../question";
import { Match } from "./Tournament";


interface GameRoundProps {
    match: Match;
    question: QuestionData;
    onWin: () => void;
    onLost: () => void;
    updateCurrentMatch: (match: Match) => void;
}


const GameRound: React.FC<GameRoundProps> = ({ match, question, onWin, onLost, updateCurrentMatch }) => {
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
    };

    const onFailedAnswer = () => {
        const newMatch = { ...match };
        newMatch.score.opponent++;
        updateCurrentMatch(newMatch);
      };
  
    return (
      <div>
        <Question question={question.question} choices={question.choices} correctChoice={question.correctChoice} successCallback={onSuccessfulAnswer} failureCallback={onFailedAnswer} />
      </div>
    );
  };

  export default GameRound;