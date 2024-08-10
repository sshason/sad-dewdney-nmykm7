import React, { useState } from 'react';
import './question.css';

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