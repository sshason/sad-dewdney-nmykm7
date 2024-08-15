import React from 'react';
import './Characters.css'; // Import the CSS file
import { BrawlStarCharacter, CategoryProperties } from './App';
import CharacterMedals from './CharacterMedals';

interface CharactersProps {
    characters: BrawlStarCharacter[];
    categories: CategoryProperties[];
    onSelect?: (char: BrawlStarCharacter) => void;
}

const Characters: React.FC<CharactersProps> = ({ characters, categories, onSelect }) => {
    return (
        <div>
        {categories
        .filter((category: CategoryProperties) => characters.some((character: BrawlStarCharacter) => character.category === category.name))
        .map((category: CategoryProperties) => (
            <div key={category.name} className="category">
                <h2 className='categoey-name' style={{ color: category.color }}>{category.name}</h2>
                <div className="characters-container">
                    {characters
                    .filter((character: BrawlStarCharacter) => character.category === category.name)
                    .map((character: BrawlStarCharacter) => (
                        <div className='single-character-container' onClick={() => onSelect && onSelect(character)}>
                            <div key={character.name} className={character.isNew ? 'character-item new-character' : 'character-item'} style={{ borderColor: category.color }}>
                                <img src={character.imageUrlNew} title={character.name} />
                            </div>
                            <p className='character-name'>{character.name}</p>
                            <CharacterMedals character={character} />
                        </div>
                    ))}
                </div>
            </div>
        ))}
        </div>
    );
};

export default Characters;