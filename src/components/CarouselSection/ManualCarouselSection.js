import React, { useState, useEffect } from "react";
import SectionHero from "../SectionHero/SectionHero.js";
import "./ManualCarouselSection.css"; // Asegúrate de crear este archivo para estilos personalizados
import PrimaryButton from "../Buttons/PrimaryButton.js";
import { Link } from 'react-router-dom';
import linkedinIcon from '../../assets/icons/linkedin.webp';
import xIcon from '../../assets/icons/x.png';
import instagramIcon from '../../assets/icons/instagram.webp';
import facebookIcon from '../../assets/icons/facebook.webp';
import youtubeIcon from '../../assets/icons/youtube.png';

const ManualCarouselSection = ({ sections }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
    }, 7000); // 5 segundos

    return () => clearInterval(interval);
  }, [sections.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sections.length) % sections.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };

  return (
    <div className="manual-carousel-section">
      <button className="carousel-button prev" onClick={goToPrevious}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {sections.map((section, index) => (
        <div
          key={index}
          className={`carousel-item ${index === currentIndex ? "active" : ""}`}
        >
          <SectionHero
            heading={section.heading}
            rightImg={section.rightImg}
            subHeading={section.subHeading}
            btnText={section.btnText}
            imgWidth={section.imgWidth ? section.imgWidth : "100%"}
            reference={section.reference}
          />
        </div>
      ))}
      <button className="carousel-button next" onClick={goToNext}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="bottom-elements">
          </div>
    </div>
  );
};

export default ManualCarouselSection;
