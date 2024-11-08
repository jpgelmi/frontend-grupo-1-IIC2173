import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton.js";
import './SectionHero.css'; // Importa el archivo CSS

const SectionHero = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
  reference = "/",
  imgWidth = "100%", // Default width
  imgHeight = "auto", // Default height
}) => {
  return (
    <div
      className={`nc-SectionHero ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="section-hero-container">
        <div className="section-hero-content">
          <h2 className="section-hero-heading">{heading}</h2>
          <span className="section-hero-subheading">{subHeading}</span>
          <div className="button-container">
            {!!btnText && <PrimaryButton to={reference}>{btnText}</PrimaryButton>}
          </div>
        </div>
        <div className="flex-grow">
          <img className="section-hero-image" src={rightImg} alt="" style={{ width: imgWidth, height: imgHeight}} />
        </div>
      </div>
    </div>
  );
};


export default SectionHero;