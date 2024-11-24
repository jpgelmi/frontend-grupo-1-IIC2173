import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getFixtures, getBonosCompradosPorAdmin } from "../../api/axios.js";
import "./Fixtures.css";
import { useAuth0 } from "@auth0/auth0-react";

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [bonos, setBonos] = useState([]);
  const [country, setCountry] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [count] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const getToken = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      } catch (error) {
        console.error('Error obtaining Access Token:', error);
      }
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  const fetchFixtures = useCallback(async () => {
    if (!isAuthenticated || !accessToken) return;

    try {
      const response = await getFixtures(
        accessToken,
        country,
        fromDate,
        toDate,
        page,
        count
      );

      if (response.status === 200 && response.data.fixtures) {
        setFixtures(response.data.fixtures);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } else {
        throw new Error('No fixtures found in the response');
      }
    } catch (error) {
      console.error('Error fetching fixtures:', error.message);
      setFixtures([]);
      setTotalPages(1);
    }
  }, [accessToken, country, fromDate, toDate, page, count, isAuthenticated]);

  const fetchBonosCompradosPorAdmin = useCallback(async () => {
    if (!isAuthenticated || !accessToken) return;

    try {
      const response = await getBonosCompradosPorAdmin(accessToken);
      if (response && Array.isArray(response)) {
        setBonos(response);
      } else {
        throw new Error('Invalid response format for bonos');
      }
    } catch (error) {
      console.error('Error fetching bonos:', error.message);
      setBonos([]);
    }
  }, [accessToken, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchBonosCompradosPorAdmin();
      fetchFixtures();
    }
  }, [isAuthenticated, accessToken, fetchBonosCompradosPorAdmin, fetchFixtures]);

  useEffect(() => {
    setIsAdmin(user?.user_roles?.includes("Admin IIC2173") || false);
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFixtures();
  };

  const handleFixtureClick = (fixture) => {
    navigate(`/match/${fixture.fixture.id}`, { state: { fixture } });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filteredFixtures = useCallback(() => {
    const result = isAdmin
      ? fixtures
      : fixtures.filter(fixture =>
          bonos.some(bono => bono.fixtureId === fixture.fixtureId.toString())
        );
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Fixtures to render:', result);
    }
    
    return result;
  }, [isAdmin, fixtures, bonos]);

  if (!isAuthenticated || !accessToken) {
    return null;
  }

  return (
    <div className="fixtures-container">
      <h2>{isAdmin ? "Partidos disponibles Admin" : "Partidos disponibles"}</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="País"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label htmlFor="fromDate">Desde:</label>
        <input
          id="fromDate"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label htmlFor="toDate">Hasta:</label>
        <input
          id="toDate"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="fixtures-list-container">
        <ul className="fixtures-list">
          {filteredFixtures().length > 0 ? (
            filteredFixtures().map((fixture) => (
              <li
                key={fixture.fixture.id}
                className="fixture-item"
                onClick={() => handleFixtureClick(fixture)}
              >
                <p>
                  {fixture.teams?.home?.name} vs {fixture.teams?.away?.name}
                </p>
                <p>{new Date(fixture.fixture?.date).toLocaleString()}</p>
                {!isAdmin && (
                  <p>
                    Bonos disponibles: {
                      bonos.find(bono => bono.fixtureId === fixture.fixtureId.toString())?.bonosCompradosAdmin || 0
                    }
                  </p>
                )}
              </li>
            ))
          ) : (
            <p>No se encontraron partidos.</p>
          )}
        </ul>
      </div>

      {filteredFixtures().length > 0 && (
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
  );
};

export default Fixtures;

