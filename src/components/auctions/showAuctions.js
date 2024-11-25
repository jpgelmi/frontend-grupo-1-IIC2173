import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuctions, proposeBuyAuction } from "../../api/axios.js";
import "../../pages/fixtures/Fixtures.css";
import { useAuth0 } from "@auth0/auth0-react";

const AuctionDetails = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { auction } = location.state || {};
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  // Obtener el Access Token de Auth0
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const response = await getAuctions(token);
          console.log('Auction details fetched:', response); // Log para verificar la respuesta
          setAuctionDetails(response);
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
  console.log(auctionDetails);
  return (
        <div className="fixtures-list-container">
          <ul className="fixtures-list">
            {auctionDetails.length > 0 ? (
              auctionDetails.map((detail, index) => (
                <ul className="fixtures-list">
                <li
                  key={index}
                  className="fixture-item"
                >
                  <p>ID de la Subasta: {detail.auction_id}</p>
                  <p>ID del Fixture: {detail.fixture_id}</p>
                  <p>ID del Grupo: {detail.group_id}</p>
                  <button onClick={(e) => { 
                    e.stopPropagation(); 
                    proposeBuyAuction(accessToken, detail); 
                  }}>
                    Realizar proposición
                  </button>
                </li>
                </ul>
            ))): (
              <p>No se encontraron partidos.</p>
            )}
          </ul>
        </div>
  );
};

export default AuctionDetails;