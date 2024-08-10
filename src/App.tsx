import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Menu from './menu'; // Adjust the path if necessary
import BrawlStars from './BrawlStars'; // Adjust the path if necessary
import BasePage from './BasePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/brawlstars" element={<BasePage children={<BrawlStars />}  />} />
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;