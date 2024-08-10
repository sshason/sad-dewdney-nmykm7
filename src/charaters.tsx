import React from 'react';

const Characters: React.FC<{ characters: { name: string, image: string }[] }> = ({ characters }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {characters.map((character: { name: string, image: string }) => (
                <div key={character.name} style={{ marginRight: '10px' }}>
                    <img src={character.image} alt={character.name} />
                    <p>{character.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Characters;