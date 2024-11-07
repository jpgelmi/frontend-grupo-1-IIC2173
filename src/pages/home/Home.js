import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from '../LandingPage.js';
import Cargando from '../../components/Cargando.js';
import { getActiveJobs } from '../../api/axios.js';
import ManualCarouselSection from '../../components/CarouselSection/ManualCarouselSection.js';
import sections from './sections.js';
import FooterElements from '../../components/FooterElements/FooterElements.js';
import SectionPromo from '../../components/SectionPromo/SectionPromo.js';
import promoImage from '../../assets/images/beting.png';
import PrimaryButton from '../../components/Buttons/PrimaryButton.js';

const Home = () => {
  const { error, isLoading, isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [activeJobs, setActiveJobs] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [isLoadingJobs, setIsLoadingJobs] = useState(false); // Nuevo estado para el loading de jobs

  console.log('User:', user);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        } catch (error) {
          console.error("Error obteniendo el Access Token:", error);
        }
      }
    };

    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    const fetchActiveJobs = async () => {
      if (accessToken) {
        setIsLoadingJobs(true); // Inicia el loading
        try {
          const response = await getActiveJobs(accessToken);
          setActiveJobs(response);
        } catch (error) {
          console.error('Error fetching active jobs:', error);
        } finally {
          setIsLoadingJobs(false); // Finaliza el loading
        }
      }
    };

    fetchActiveJobs();
  }, [accessToken]);

  if (!error && isLoading) {
    return (
      <Cargando />
    )
  }

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePromoClick = () => {
    // Bajamos al Carouse
    console.log('Bajamos al Carousel');
    window.scrollTo({ top: 600, behavior: 'smooth' });
  }

  return (
    <div>
      {error && <div>Oops... Error en el Auth0</div>}
      {/* {!error && isLoading && <Cargando />} */}
      {!error && !isLoading && isAuthenticated ? (
        <div className="home-container">
          {/* {
            heading: "👋 CoolGoat!",
            rightImg: homeImage,
            imgWidth: "80%",
            subHeading: "Bienvenido a CoolGoat, la mejor plataforma de apuestas deportivas. Encuentra increíbles oportunidades de apuestas, con los últimos partidos. ",
            imgWidth: "65%",
          }, */}
          <SectionPromo
            heading="👋 CoolGoat!"
            subHeading="Bienvenido a CoolGoat, la mejor plataforma de apuestas deportivas. Encuentra increíbles oportunidades de apuestas, con los últimos partidos."
            rightImg={promoImage}
            imgWidth="90%"
            btnText="👀 Ver más"
            reference="/##"
          />
          <ManualCarouselSection sections={sections} />
          {/* <PrimaryButton text="👀 Ver más"/> */}
          {/* <div className="bet-button-container">
            <PrimaryButton to="/fixtures">👀 Apuesta con nosotros</PrimaryButton>
          </div> */}
          <div className="bottom-line"></div>
          <FooterElements handleClick={handleClick} />
        </div>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default Home;
