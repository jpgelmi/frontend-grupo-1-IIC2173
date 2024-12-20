import React from 'react';
import { Link } from 'react-router-dom';
import './styles/PrimaryButton.css';

const PrimaryButton = ({ to, children, icon, disabled}) => {
  const handleClick = () => {
    console.log('To:', to);
    if (to === "/#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } 
    else if (to === "/##") {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };
  
  return (
    <Link to={disabled ? "#" : to} className={`primary-button ${disabled ? "disabled" : ""}`} onClick={handleClick}>
      {icon && <img src={icon} alt="icon" className="button-icon" />}
      <span>{children}</span>
    </Link>
  );
};

export default PrimaryButton;
