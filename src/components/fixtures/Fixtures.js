// components/Fixtures.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Fixtures.css';

const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [country, setCountry] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [count] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchFixtures = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (country) queryParams.append('country', country);
      if (fromDate) queryParams.append('from', fromDate);
      if (toDate) queryParams.append('to', toDate);
      queryParams.append('page', page.toString());
      queryParams.append('count', count.toString());

      const response = await fetch(`${API_URL}/fixtures?${queryParams.toString()}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (data && data.fixtures) {
          setFixtures(data.fixtures);
          if (data.pagination && data.pagination.totalPages) {
            setTotalPages(data.pagination.totalPages);
          } else {
            setTotalPages(1);
          }
        } else {
          console.error('No se encontraron fixtures en la respuesta');
          setFixtures([]);
          setTotalPages(1);
        }
      } else {
        console.error('Error al obtener los fixtures');
        setFixtures([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error al obtener los fixtures:', error);
      setFixtures([]);
      setTotalPages(1);
    }
  };

  // Llamar a fetchFixtures cuando cambien page, country, fromDate o toDate
  useEffect(() => {
    fetchFixtures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, country, fromDate, toDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reiniciar a la primera página al realizar una nueva búsqueda
  };

  const handleFixtureClick = (fixture) => {
    navigate(`/match/${fixture.fixture.id}`, { state: { fixture } });
  };

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

  return (
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
          {fixtures.length > 0 ? (
            fixtures.map((fixture, index) => (
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
      <button className="back-button" onClick={() => navigate('/')}>
        Volver al inicio
      </button>
    </div>
  );
};

export default Fixtures;