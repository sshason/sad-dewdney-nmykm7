import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Menu from './menu'; // Adjust the path if necessary
import BrawlStars from './BrawlStars'; // Adjust the path if necessary
import BasePage from './BasePage';
import { useEffect, useState } from 'react';
import brawlstarsJson from './assets/brawls.json';
import Game from './BrawlstartsOlympics/Tournament';
import GoldMedal from './assets/gold_medal.jpeg'
import SilverMedal from './assets/silver_medal.jpeg'
import BronzeMedal from './assets/bronze_medal.jpeg'

export interface BrawlStarCharacter {
  name: string;
  category: string;
  imageUrlNew: string;
  imageUrlOld: string;
  isNew?: boolean;
  gold?: number;
  silver?: number;
  bronze?: number;
}

export type BrawlStarsJson = {
  [key: string]: BrawlStarCharacter;
};

export interface CategoryProperties {
  rank: number;
  name: string;
  color: string;
}

export const categories: CategoryProperties[] = [
  { rank: 0, name: 'Trophy Road', color: '#b5b5b5' },
  { rank: 1, name: 'Rare', color: '#00ff00' },
  { rank: 2, name: 'Super Rare', color: '#0000ff' },
  { rank: 3, name: 'Epic', color: '#800080' },
  { rank: 4, name: 'Mythic', color: '#ff00ff' },
  { rank: 5, name: 'Legendary', color: '#ff8c00' },
];

export enum Prize {
  None = 0,
  Bronze = 1,
  Silver = 2,
  Gold = 3,
}

export const PrizeToImage = {
  [Prize.Gold]: GoldMedal,
  [Prize.Silver]: SilverMedal,
  [Prize.Bronze]: BronzeMedal,
};

const allCharacters: BrawlStarsJson = brawlstarsJson;

function App() {
  const [characters, setCharacters] = useState<any[]>(() => {
    // Retrieve characters from localStorage if available
    const savedCharacters = localStorage.getItem('characters');
    if(savedCharacters) {
      // migrate old data
      const parsedCharacters = JSON.parse(savedCharacters);
      if (parsedCharacters.length > 0 && !parsedCharacters[0].category) {
        const result = parsedCharacters.map((character: any) => {
          return allCharacters[character.name];
        }).filter((character: any) => character);
        return result;
      }
    }
    const result = savedCharacters ? JSON.parse(savedCharacters) : [];
    result.forEach((c: BrawlStarCharacter) => {
      c.isNew = false;
    });
    return result;
  });

  useEffect(() => {
    // Store characters in localStorage whenever it changes
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  const updateCharacter = (newCharacter: BrawlStarCharacter) => {
    const updatedCharacters = characters.map((character: BrawlStarCharacter) => {
      if (character.name === newCharacter.name) {
        console.log('updatedCharacter', newCharacter);
        return newCharacter;
      }
      return character;
    });
    setCharacters(updatedCharacters);
  }
  
  return (
      <>
    <Router>
      <Routes>
        <Route path="/brawlstars" element={<BasePage children={<BrawlStars allCharacters={allCharacters} characters={[...characters]} categories={categories} setCharacters={setCharacters} />}  />} />
        <Route path="/brawlstarsOlympics" element={<BasePage children={<Game characters={[...characters]} categories={categories} updateCharacter={updateCharacter}/>}  />} />
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
      </>
  );
}

export default App;