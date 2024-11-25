import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuctions, proposeBuyAuction } from "../../api/axios.js";
import "../../pages/fixtures/Fixtures.css";
import { useAuth0 } from "@auth0/auth0-react";
import FixtureItem from "../../components/FixtureItem/FixtureItem.js";


const AuctionDetails = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { auction } = location.state || {};
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [fixtures, setFixtures] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const getFixtureById = (fixtureId) => {
    return fixtures.find(fixture => fixture.fixtureId === fixtureId);
  }
  // Obtener el Access Token de Auth0
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const response = await getAuctions(token);
          console.log('Auction details fetched:', response); // Log para verificar la respuesta
          setAuctionDetails(response.auctions);
          setFixtures(response.fixtures);
          setAccessToken(token);
        } catch (error) {
          console.error('Error fetching auctions:', error); // Log para verificar el error
          setError('Error fetching auctions');
        } finally {
          setLoading(false);
        }
      }
    };
    

    fetchAuctionDetails();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }

  const handleFixtureClick = (fixture) => {};
  
  return (
    <div className="fixtures-container" style={{ marginTop: '200px', align:'center' }}>
      <ul className="fixtures-list">
        {auctionDetails.length > 0 ? (
          auctionDetails.map((detail, index) => {
            const fixture = getFixtureById(detail.fixture_id);
            return (
              <li key={index} className="fixture-item">
                <div className="auction-details">
                  <p><strong>Grupo Vendedor:</strong> {detail.group_id}</p>
                  <p><strong>Cantidad Ofrecida:</strong> {detail.quantity}</p>
                </div>
                {fixture && (
                  <div className="fixture-details">
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
                    proposeBuyAuction(accessToken, detail); 
                  }}>
                    Realizar proposición
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p>No se encontraron partidos.</p>
        )}
      </ul>
    </div>
  );
};

export default AuctionDetails;