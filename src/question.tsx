import React, { useState } from 'react';
import './question.css';

export interface QuestionData {
    question: string;
    choices: string[];
    correctChoice: string;
  }
  
  export function* generateQuestions() {
    const generateQuestionAdditionData = (): QuestionData => {
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
  
    const generateSubtractionQuestionData = (): QuestionData => {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * Math.min(num1+1, 5));
      const answer = num1 - num2;
      const choices = [answer.toString()];
  
      while (choices.length < 4) {
        const randomChoice = Math.floor(Math.random() * 20) + 1;
        if (!choices.includes(randomChoice.toString())) {
          choices.push(randomChoice.toString());
        }
      }
  
      choices.sort(() => Math.random() - 0.5);
  
      return {
        question: `${num1} - ${num2} = ?`,
        choices,
        correctChoice: answer.toString(),
      };
    }
  
    while (true) {
      const randomOperation = Math.random() < 0 ? generateQuestionAdditionData : generateSubtractionQuestionData;
      yield randomOperation();
    }
  }

interface QuestionProps {
    question: string;
    choices: string[];
    correctChoice: string;
    successCallback?: () => void;
    failureCallback?: () => void;
}

const Question: React.FC<QuestionProps> = (prop: QuestionProps) => {
    const [selectedChoice, setSelectedChoice] = useState('');

    const handleChoiceClick = (choice: string) => {
        setSelectedChoice(choice);
        if (choice === prop.correctChoice) {
            prop.successCallback && prop.successCallback();
        } else {
            prop.failureCallback && prop.failureCallback();
        }
    };

    return (
        <div className="question-container">
            <h3 className="question-title">{prop.question}</h3>
            <ul className="choices-list">
                {prop.choices.map((choice, index) => (
                    <li
                        key={index}
                        onClick={() => handleChoiceClick(choice)}
                        className="choice-item"
                    >
                        {choice}
                    </li>
                ))}
            </ul>
            <p className="selected-choice">Selected choice: {selectedChoice}</p>
        </div>
    );
};

export default Question;