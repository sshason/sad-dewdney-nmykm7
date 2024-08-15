import React from 'react';
import './Menu.css'; // Assuming you will create a CSS file for styling
import WheelBodyPartsImage from './assets/wheel_body_parts.jpg';
import WheelColorImage from './assets/wheel_colors.png';
import WheelFamilyNames from './assets/wheel_family_names.png';
import BrawlStarsOlympics from './assets/brawlstars_olympics.jpg';
import { Link } from 'react-router-dom';


const menuItems = [
  { name: 'גלגל שמות', image: WheelFamilyNames, url: 'https://wheelofnames.com/he/n7s-4x8' },
  { name: 'צבעים באנגלית', image: WheelColorImage, url: 'https://wheelofnames.com/he/822-us7' },
  { name: 'חלקי גוף', image: WheelBodyPartsImage, url: 'https://wheelofnames.com/he/5f6-3pn' },
  { name: 'פקמן', image: 'https://th.bing.com/th/id/OIP.WnQgGM1kKQDCVouw8iO5kQHaEc?w=300&h=180&c=7&r=0&o=5&pid=1.7', url: 'https://pacman.js.org/' },
  { name: 'חשבון', image: 'https://th.bing.com/th/id/OIP.YQt1G5Ho2Gv6jzCcktHDpwHaHa?w=165&h=180&c=7&r=0&o=5&pid=1.7', url: 'https://www.matific.com/students/app/7.5.7/lite/' },
  { name: 'Brawl Stars', image: 'https://th.bing.com/th/id/OIP.jts_eWK_m0N25cf5oATDFAHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7', url: '/brawlstars' },
  { name: 'Brawl Olympics', image: BrawlStarsOlympics, url: '/brawlstarsOlympics' },
];

const Menu: React.FC = () => {
    return (
      <>
        <h1>המחשב של תום</h1>
        <div className="menu-container">
          {menuItems.map((item) => (
          <Link to={item.url} rel="noopener noreferrer" className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-name">{item.name}</div>
          </Link>
          ))}
        </div>
      </>
    );
  };

export default Menu;