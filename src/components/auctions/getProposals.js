import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProposals, acceptProposal, rejectProposal } from "../../api/axios.js";
import "../../pages/fixtures/Fixtures.css";
import { useAuth0 } from "@auth0/auth0-react";
import FixtureItem from "../../components/FixtureItem/FixtureItem.js";


const SeeProposals = () => {
  const [fixtures, setFixtures] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [country, setCountry] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [count] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  // Obtención del Access Token
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          console.log("AccessToken obtenido:", token); // Log para verificar que el token se obtiene correctamente
          setAccessToken(token);
        } catch (error) {
          console.error("Error obteniendo el Access Token:", error);
        }
      }
    };
    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);
  // Función para obtener los fixtures
  const ShowProposals = async () => {
    try {
      if (isAuthenticated && accessToken) {
        const response = await getProposals(
          accessToken,
          country,
          fromDate,
          toDate,
          page,
          count
        );

        if (response.status === 200) {
          const responses = response.data
          if (responses) {
            setProposals(responses.proposals);
            setFixtures(responses.fixtures);
            setTotalPages(response.data.pagination?.totalPages || 1);
          } else {
            console.log("No se encontraron proposals en la respuesta");
            setProposals([]);
            setTotalPages(1);
          }
        } else {
          console.error("Error al obtener las proposals:", response);
          setFixtures([]);
          setTotalPages(1);
        }
      }
    } catch (error) {
      console.error("Error al obtener los fixtures:", error);
      setFixtures([]);
      setTotalPages(1);
    }
  };

  // Ejecutar fetchFixtures cuando cambien page, accessToken o isAuthenticated
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      ShowProposals();
    }
  }, [page, accessToken, isAuthenticated]);

  // Manejo de la búsqueda por país y fechas
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reiniciar a la página 1 para hacer la nueva búsqueda
    ShowProposals();
  };

  // Manejo del clic en un fixture
  const handleFixtureClick = (fixture) => {
  };

  // Manejo de la paginación
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const getFixtureById = (fixtureId) => {
    return fixtures.find(fixture => fixture.fixtureId === fixtureId);
  }

  return (
    isAuthenticated && accessToken && (
      <div className="fixtures-container">
        <h2>Partidos disponibles</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <label>Desde:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label>Hasta:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
  
        <div className="fixtures-list-container">
        <ul className="fixtures-list">
          {proposals.length > 0 ? (
            proposals.map((proposal, index) => {
              const fixture = getFixtureById(proposal.fixture_id);
              return (
                <li key={index} className="fixture-item">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
  <p style={{ marginRight: '10px' }}><strong>Grupo Ofertante:</strong> {proposal.group_id}</p>
  <p style={{ marginRight: '10px' }}> </p>
  <p><strong>Cantidad:</strong> {proposal.quantity}</p>
</div>
                  
                  {fixture && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <FixtureItem
                        key={index}
                        fixture={fixture}
                        handleFixtureClick={handleFixtureClick}
                      />
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                  
                  <button className="button-buy" onClick={(e) => { 
                    e.stopPropagation(); 
                    acceptProposal(accessToken, proposal); 
                  }}>
                    Aceptar Propuesta
                  </button>
                  <button className="button-buy" onClick={(e) => { 
                    e.stopPropagation(); 
                    rejectProposal(accessToken, proposal); 
                  }}>
                    Rechazar Propuesta
                  </button>
                </div>

                </li>
              );
            })
          ) : (
            <p>No se encontraron propuestas.</p>
          )}
        </ul>
        </div>
  
        {fixtures.length > 0 && (
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 1}>
              Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Siguiente
            </button>
          </div>
        )}
        <button className="back-button" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    )
  );
}
export default SeeProposals;