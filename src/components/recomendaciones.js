import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getRecomedation } from '../api/axios.js';
import "./style/recomendaciones.css";
import { Link } from 'react-router-dom';

export default function Recomendaciones() {
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
        <section className="container">
            <h1 className="titulo">Recomendaciones</h1>
            {Array.isArray(recomendaciones) && recomendaciones.length > 0 ? (
                recomendaciones.map((recomendacion) => (
                    <div
                        key={recomendacion._id}
                        className="element"
                        aria-labelledby={`recomendacion-title-${recomendacion._id}`}
                    >
                        <h3 id={`recomendacion-title-${recomendacion._id}`} className="text-xl font-semibold mb-2">
                            {`${recomendacion.teams.home.name} vs ${recomendacion.teams.away.name}`}
                        </h3>
                        <p>{`Fecha: ${new Date(recomendacion.fixture.date).toLocaleString()}`}</p>
                        <Link to={`/match/${recomendacion.fixture.id}`} style={{ backgroundColor: '#2563EB', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
                            Partido
                        </Link>
                    </div>
                ))
            ) : (
                <p>No hay recomendaciones disponibles.</p>
            )}
            <Link to="/" style={{ backgroundColor: '#2563EB', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>Volver al Inicio</Link>
        </section>


    );
}





    