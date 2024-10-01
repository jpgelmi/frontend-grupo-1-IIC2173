import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Fixtures.css';

const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]); // Inicializar como un array vacío
  const [country, setCountry] = useState('');   // Filtro por país
  const [fromDate, setFromDate] = useState(''); // Fecha desde
  const [toDate, setToDate] = useState('');     // Fecha hasta
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchFixtures = async () => {
    try {
      // Construcción dinámica del query string solo si los filtros están presentes
      const queryParams = new URLSearchParams();
      if (country) queryParams.append('country', country);
      if (fromDate) queryParams.append('from', fromDate);
      if (toDate) queryParams.append('to', toDate);
      queryParams.append('page', page);

      const response = await fetch(`${API_URL}/fixtures?${queryParams.toString()}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fixtures:', data);

        // Verificar si data.fixtures existe y es un array
        if (Array.isArray(data.fixtures)) {
          setFixtures(data.fixtures); // Actualiza el estado con los fixtures
        } else {
          setFixtures([]); // Si no es un array, asigna un array vacío
        }

        // Actualiza las páginas totales
        setTotalPages(data.pagination?.totalPages || 1); // Manejar el caso de que no haya totalPages
      } else {
        console.error('Error fetching fixtures');
        setFixtures([]); // Si ocurre un error, asegurarse de que fixtures sea un array vacío
      }
    } catch (error) {
      console.error('Error fetching fixtures:', error);
      setFixtures([]); // En caso de error, asegúrate de que fixtures sea un array vacío
    }
  };

  useEffect(() => {
    fetchFixtures(); // Llama a la API cuando cambian los filtros o la página
  }, [country, fromDate, toDate, page]);

  const handleFixtureClick = (fixture) => {
    navigate(`/match/${fixture.fixture.id}`, { state: { fixture } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Resetea la página a 1 al hacer una nueva búsqueda
    fetchFixtures(); // Llama a la API después de la búsqueda
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
              <li key={index} className="fixture-item" onClick={() => handleFixtureClick(fixture)}>
                <p>{fixture.teams.away.name} vs {fixture.teams.home.name}</p>
                <p>{fixture.fixture.date}</p>
              </li>
            ))
          ) : (
            <p>No se encontraron partidos.</p> // Mensaje cuando no hay partidos
          )}
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