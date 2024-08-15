import React from "react";
import { BrawlStarCharacter, CategoryProperties } from "../App";
import Characters from "../charaters";

interface CharacterSelectionProps {
    onSelect: (char: BrawlStarCharacter) => void;
    characters: BrawlStarCharacter[];
    categories: CategoryProperties[];
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ characters, categories, onSelect }) => {
    return (
      <div>
        <h2>Select Your Character</h2>
        <Characters characters={characters} categories={categories} onSelect={onSelect} />
      </div>
    );
  };

export default CharacterSelection;  