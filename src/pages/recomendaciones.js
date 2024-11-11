import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getRecomedation } from '../api/axios.js';
import "./style/recomendaciones.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { getActiveJobs } from '../api/axios.js';
import PrimaryButton from '../components/Buttons/PrimaryButton.js'
import FixtureItem from "../components/FixtureItem/FixtureItem.js";

export default function Recomendaciones() {
    const navigate = useNavigate();
    const [recomendaciones, setRecomendaciones] = useState([]);
    const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);
    const [activeJobs, setActiveJobs] = useState(false);


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
    const handleFixtureClick = (fixture) => {
        navigate(`/match/${fixture.fixture.id}`, { state: { fixture } });
      };

    useEffect(() => {
        const fetchRecomendaciones = async () => {
            if (accessToken) {
                try {
                    const response = await getRecomedation(accessToken);
                    setRecomendaciones(response);
                } catch (error) {
                    console.error('Error fetching recomendaciones:', error);
                }
            }
        };
    
        fetchRecomendaciones();
    }, [accessToken]);

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

    return (
        <div className="fixtures-container">
        <div className="fixtures-list-container">
          <ul className="fixtures-list">
            {recomendaciones.length > 0 ? (
              recomendaciones.map((fixture, index) => (
                  <FixtureItem
                    key={index}
                    fixture={fixture}
                    handleFixtureClick={handleFixtureClick}
                  />
              ))
            ) : (
              <p>Aún no has acertado a ningún partido, para acceder al servicio de recomendaciones debes acertar a al menos un resultado!</p>
            )}
          </ul>
        </div>
          {isLoadingJobs ? ( // Condición para mostrar el loading específico de jobs
            <p style={{ fontSize: "15px", color: "orange" }}>Cargando servicio de recomendaciones...</p>
          ) : activeJobs ? (
            <p style={{ fontSize: "15px", color: "green" }}>Servicio de recomendaciones disponible</p>
          ) : (
            <p style={{ fontSize: "15px", color: "red" }}>Servicio de recomendaciones no disponible</p>
          )}
          <PrimaryButton to="/">
          ⬅️ Volver al inicio
          </PrimaryButton>
        </div>
    );

}





    