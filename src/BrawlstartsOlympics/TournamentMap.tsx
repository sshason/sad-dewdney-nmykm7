import React from 'react';
import { Match } from "./Tournament";
import './TournamentMap.css';

interface TournamentMapProps {
    matches: Match[];
    activeMatchIndex: number;
}

const TournamentMap: React.FC<TournamentMapProps> = ({ matches, activeMatchIndex }) => {
    return (
        <div className="tournament-map">
            {matches.map((match, index) => (
                <div key={index} className={`match-container ${index === activeMatchIndex ? 'active-match' : ''}`}>
                    <h2>{match.round}</h2>
                    <h3>{match.character.name} vs {match.opponent.name}</h3>
                    <div className="score">
                        <span>{match.score.character}</span> - <span>{match.score.opponent}</span>
                    </div>
                    <img src={match.character.imageUrlNew} alt={match.character.name} />
                    <img src={match.opponent.imageUrlNew} alt={match.opponent.name} />
                </div>
            ))}
        </div>
    );
};

export default TournamentMap;