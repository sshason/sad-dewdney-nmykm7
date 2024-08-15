import React from 'react';
import GoldMedal from './assets/gold_medal.jpeg'
import SilverMedal from './assets/silver_medal.jpeg'
import BronzeMedal from './assets/bronze_medal.jpeg'
import './CharacterMedals.css';

const CharacterMedals: React.FC<{ character: any }> = ({ character }) => {
    return (
        <ul className="medal-list">
            {character.gold > 0 && (
                <li>
                    <div className="medal-container">
                        <img src={GoldMedal} className="medal-icon" alt="Gold Medal" />
                        <span className="medal-count">{character.gold}</span>
                    </div>
                </li>
            )}
            {character.silver > 0 && (
                <li>
                    <div className="medal-container">
                        <img src={SilverMedal} className="medal-icon" alt="Silver Medal" />
                        <span className="medal-count">{character.silver}</span>
                    </div>
                </li>
            )}
            {character.bronze > 0 && (
                <li>
                    <div className="medal-container">
                        <img src={BronzeMedal} className="medal-icon" alt="Bronze Medal" />
                        <span className="medal-count">{character.bronze}</span>
                    </div>
                </li>
            )}
        </ul>
    );
};

export default CharacterMedals;