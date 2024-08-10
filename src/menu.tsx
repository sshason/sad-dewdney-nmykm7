import React from 'react';
import './Menu.css'; // Assuming you will create a CSS file for styling

const menuItems = [
  { name: 'גלגל שמות', image: 'https://th.bing.com/th/id/OIP.GPg0Sc8awrPLPPD4_7wJvQHaFj?rs=1&pid=ImgDetMain', url: 'https://www.bing.com/ck/a?!&&p=658073dd52b26c41JmltdHM9MTcyMzE2MTYwMCZpZ3VpZD0wMGE2NmFkYy1mMjFiLTY1ODAtMWVhMi03OWIzZjM4YjY0OTQmaW5zaWQ9NTE5NQ&ptn=3&ver=2&hsh=3&fclid=00a66adc-f21b-6580-1ea2-79b3f38b6494&psq=%d7%92%d7%9c%d7%92%d7%9c+%d7%a9%d7%9e%d7%95%d7%aa&u=a1aHR0cHM6Ly93aGVlbG9mbmFtZXMuY29tL2hlLw&ntb=1' },
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