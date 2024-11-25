import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFixtures } from "../../api/axios.js";
import { useAuth0 } from "@auth0/auth0-react";
import FixtureItem from "../../components/FixtureItem/FixtureItem.js";
import { getBonoByFixtureId, getAvailableBonds } from "../../api/axios.js";
import "./Fixtures.css";

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [country, setCountry] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [count] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  // Obtención del Access Token
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

  // Función para obtener los fixtures
  const fetchFixtures = async () => {
    try {
      if (isAuthenticated && accessToken) {
        const response = await getFixtures(
          accessToken,
          country,
          fromDate,
          toDate,
          page,
          count
        );

        if (response.status === 200) {
          if (response.data.fixtures) {
            setFixtures(response.data.fixtures);
            setTotalPages(response.data.pagination?.totalPages || 1);
          } else {
            console.log("No se encontraron fixtures en la respuesta");
            setFixtures([]);
            setTotalPages(1);
          }
        } else {
          console.error("Error al obtener los fixtures:", response);
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
      fetchFixtures();
    }
  }, [page, accessToken, isAuthenticated]);

  // Manejo de la búsqueda por país y fechas
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reiniciar a la página 1 para hacer la nueva búsqueda
    fetchFixtures();
  };

  // Manejo del clic en un fixture
  const handleFixtureClick = (fixture) => {
    navigate(`/match/${fixture.fixture.id}`, { state: { fixture } });
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

  const isAdmin = user ? user.user_roles.includes("Admin IIC2173") : false;

  const filterFixturesIfIsNotAdmin = async (fixtures) => {
    if (!isAdmin) {
      try {
        if (isAuthenticated && accessToken) {
          const response = await getAvailableBonds(accessToken);
          console.log("Response:", response);
          if (response.data) {
            const filteredFixtures = response.data[1];
            const uniqueFixtures = [];
            const fixtureIds = new Set();

            for (const fixture of filteredFixtures) {
              if (!fixtureIds.has(fixture.fixtureId)) {
                fixtureIds.add(fixture.fixtureId);
                uniqueFixtures.push(fixture);
              }
            }

            setFixtures((prevFixtures) => {
              if (JSON.stringify(prevFixtures) !== JSON.stringify(uniqueFixtures)) {
                return uniqueFixtures;
              }
              return prevFixtures;
            });
          } else {
            console.error("Error al obtener los bonos:", response);
          }
        }
      } catch (error) {
        console.error("Error al obtener los bonos:", error);
      }
    }
  };

  useEffect(() => {
    const filterAndSetFixtures = async () => {
      await filterFixturesIfIsNotAdmin(fixtures);
    };

    if (isAuthenticated && accessToken) {
      filterAndSetFixtures();
    }
  }, [fixtures, accessToken, isAuthenticated]);

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
          <button className="search-button" type="submit">
            Buscar
          </button>
        </form>

        <div className="fixtures-list-container">
          <ul className="fixtures-list">
            {fixtures.length > 0 ? (
              fixtures.map((fixture, index) => (
                <FixtureItem
                key={index}
                fixture={fixture}
                handleFixtureClick={handleFixtureClick}
              />
              ))
            ) : (
              <p>No se encontraron partidos.</p>
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
};

export default Fixtures;