// BasePage.tsx
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import './BasePage.css'; // Import the CSS file

interface BasePageProps {
  children: ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // Navigate back to the previous page
  };

  return (
    <div className="base-page">
      <button className="back-button" onClick={handleBackClick}>Back</button>
      <div>{children}</div>
    </div>
  );
};

export default BasePage;