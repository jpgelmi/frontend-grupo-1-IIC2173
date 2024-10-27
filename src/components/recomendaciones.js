import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getRecomedation } from '../api/axios.js';
import "./style/recomendaciones.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



export default function Recomendaciones() {
    const navigate = useNavigate();
    const [recomendaciones, setRecomendaciones] = useState([]);
    const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
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
        console.log(accessToken)
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

    return (
        <div className="fixtures-container">
        <div className="fixtures-list-container">
          <ul className="fixtures-list">
            {recomendaciones.length > 0 ? (
              recomendaciones.map((fixture, index) => (
                <li
                  key={index}
                  className="fixture-item"
                  onClick={() => handleFixtureClick(fixture)}
                >
                  <p>
                    {fixture.teams?.home?.name} vs {fixture.teams?.away?.name}
                  </p>
                  <p>{new Date(fixture.fixture?.date).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p>No se encontraron partidos.</p>
            )}
          </ul>
        </div>
        </div>
    );

}





    