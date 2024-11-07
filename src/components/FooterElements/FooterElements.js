import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../Buttons/PrimaryButton.js';
import linkedinIcon from '../../assets/icons/linkedin.webp';
import xIcon from '../../assets/icons/x.png';
import instagramIcon from '../../assets/icons/instagram.webp';
import facebookIcon from '../../assets/icons/facebook.webp';
import youtubeIcon from '../../assets/icons/youtube.png';
import './FooterElements.css'; // Asegúrate de crear este archivo para estilos personalizados

const FooterElements = ({ handleClick }) => {
  return (
    <div className="bottom-elements">
      <div className="footer-bottom-line"></div>
      <div className="logo-button-bottom">
        <PrimaryButton to="/#">CoolGoat</PrimaryButton>
      </div>
      <div className="social-icons">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
        <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
          <img src={xIcon} alt="X" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={youtubeIcon} alt="YouTube" />
        </a>
      </div>
      <div className="home-link">
        <Link to="/" onClick={handleClick}>Volver al inicio</Link>
      </div>
    </div>
  );
};

export default FooterElements;