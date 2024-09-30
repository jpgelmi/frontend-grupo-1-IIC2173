import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Fixtures.css';

const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchFixtures = async () => {
    try {
      const response = await fetch(`${API_URL}/fixtures?country=${country}&date=${date}&page=${page}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fixtures:', data);
        setFixtures(data);
        setTotalPages(data.totalPages);
      } else {
        console.error('Error fetching fixtures');
      }
    } catch (error) {
      console.error('Error fetching fixtures:', error);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, [country, date, page]);

  const handleFixtureClick = (fixture) => {
    navigate(`/match/${fixture.fixture.id}`, { state: { fixture } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset page to 1 on new search
    fetchFixtures();
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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <div className="fixtures-list-container">
        <ul className="fixtures-list">
          {fixtures.map((fixture, index) => (
            <li key={index} className="fixture-item" onClick={() => handleFixtureClick(fixture)}>
              <p>{fixture.teams.away.name} vs {fixture.teams.home.name}</p>
              <p>{fixture.fixture.date}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Siguiente</button>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
};

export default Fixtures;