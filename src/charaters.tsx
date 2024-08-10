import React from 'react';
import './Characters.css'; // Import the CSS file

const Characters: React.FC<{ characters: { name: string, image: string }[] }> = ({ characters }) => {
    return (
        <div className="characters-container">
            {characters.map((character: { name: string, image: string }) => (
                <div key={character.name} className="character-item">
                    <img src={character.image} alt={character.name} />
                    <p>{character.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Characters;