import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton.js";
import './SectionPromo.css'; // Importa el archivo CSS

const SectionPromo = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
  btnText2,
  reference = "/",
  reference2 = "/fixtures",
  imgWidth = "100%", // Default width
  imgHeight = "auto", // Default height
}) => {
  return (
    <div
      className={`nc-SectionPromo ${className}`}
      data-nc-id="SectionPromo"
    >
      <div className="section-promo-container">
        <div className="section-promo-content">
          <h2 className="section-promo-heading">{heading}</h2>
          <span className="section-promo-subheading">{subHeading}</span>
          <div className="button-container">
            {!!btnText && <PrimaryButton to={reference}>{btnText}</PrimaryButton>}
          </div>
          <div className="button-container-2">
            {!!btnText && <PrimaryButton to={reference2}>{btnText2}</PrimaryButton>}
          </div>
        </div>
        <div className="flex-grow">
          <img className="section-promo-image" src={rightImg} alt="" style={{ width: imgWidth, height: imgHeight}} />
        </div>
      </div>
    </div>
  );
};


export default SectionPromo;
