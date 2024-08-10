import React from 'react';
import './Menu.css'; // Assuming you will create a CSS file for styling

const menuItems = [
  { name: 'גלגל שמות', image: 'https://th.bing.com/th/id/OIP.GPg0Sc8awrPLPPD4_7wJvQHaFj?rs=1&pid=ImgDetMain', url: 'https://wheelofnames.com/he/n7s-4x8' },
  { name: 'צבעים באנגלית', image: 'https://th.bing.com/th/id/OIP.GPg0Sc8awrPLPPD4_7wJvQHaFj?rs=1&pid=ImgDetMain', url: 'https://wheelofnames.com/he/822-us7' },
  { name: 'חלקי גוף', image: 'https://th.bing.com/th/id/OIP.GPg0Sc8awrPLPPD4_7wJvQHaFj?rs=1&pid=ImgDetMain', url: 'https://wheelofnames.com/he/5f6-3pn' },
  { name: 'פקמן', image: 'https://th.bing.com/th/id/OIP.WnQgGM1kKQDCVouw8iO5kQHaEc?w=300&h=180&c=7&r=0&o=5&pid=1.7', url: 'https://pacman.js.org/' },
  { name: 'חשבון', image: 'https://th.bing.com/th/id/OIP.YQt1G5Ho2Gv6jzCcktHDpwHaHa?w=165&h=180&c=7&r=0&o=5&pid=1.7', url: 'https://www.matific.com/students/app/7.5.7/lite/' },
  // Add more items as needed
];

const Menu: React.FC = () => {
    return (
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-name">{item.name}</div>
          </a>
        ))}
      </div>
    );
  };

export default Menu;