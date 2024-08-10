import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Menu from './menu'; // Adjust the path if necessary
import BrawlStars from './BrawlStars'; // Adjust the path if necessary
import BasePage from './BasePage';
import { useEffect, useState } from 'react';
import Characters from './charaters';
import brawlstarsJson from './assets/brawls.json';

function getLastElement<Type>(array: Type[]): Type | undefined {
  if (array.length === 0) return undefined;
  return array[array.length - 1];
}

export interface Character {
  name: string;
  image: string;
}

const allCharacters: Character[] = brawlstarsJson.flatMap((category: string[]) => category.map(imageSrc => ({ name: getLastElement(imageSrc.split('/'))?.split('.png')[0]!, image: imageSrc })));

// const allCharacters = [
//   {
//       name: "Shelly",
//       image: "https://th.bing.com/th/id/OIP.tMaO1vPm-AiJ_Pm2YAO6mAAAAA?w=115&h=193&c=7&r=0&o=5&pid=1.7"
//   },
//   {
//       name: "Leon",
//       image: "https://th.bing.com/th/id/OIP.P6cnim9x6QykoA4R76UkIwHaFj?w=245&h=184&c=7&r=0&o=5&pid=1.7"
//   },
//   {
//       name: "Nita",
//       image: "https://th.bing.com/th/id/OIP.7UuQK6vtn88CFDzgeDy1ZgHaFj?w=226&h=180&c=7&r=0&o=5&pid=1.7"
//   },
//   {
//       name: "Ruffs",
//       image: "https://th.bing.com/th/id/OIP.N7syvExVZKzJ-TM5w5l97wHaMX?w=115&h=183&c=7&r=0&o=5&pid=1.7"
//   },
// ]

function App() {
  const [characters, setCharacters] = useState<any[]>(() => {
    // Retrieve characters from localStorage if available
    const savedCharacters = localStorage.getItem('characters');
    return savedCharacters ? JSON.parse(savedCharacters) : [];
  });

  useEffect(() => {
    // Store characters in localStorage whenever it changes
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);
  
  return (
      <>
      <Characters characters={characters} />
    <Router>
      <Routes>
        <Route path="/brawlstars" element={<BasePage children={<BrawlStars allCharacters={allCharacters} characters={characters} setCharacters={setCharacters} />}  />} />
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
      </>
  );
}

export default App;