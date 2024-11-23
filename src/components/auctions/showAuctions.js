import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuctions } from "../../api/axios.js";
import "../style/Fixtures.css";
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
          setAuctionDetails(response[0]);
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

  return (
    <div className="fixtures-container">
      <h2>Detalles de la Subasta</h2>
      <p>ID de la Subasta: {auctionDetails.auction_id}</p>
      <p>ID de la Propuesta: {auctionDetails.proposal_id}</p>
      <p>ID del Fixture: {auctionDetails.fixture_id}</p>
      <p>Nombre de la Liga: {auctionDetails.league_name}</p>
      <p>Ronda: {auctionDetails.round}</p>
      <p>Resultado: {auctionDetails.result}</p>
      <p>Cantidad: {auctionDetails.quantity}</p>
      <p>ID del Grupo: {auctionDetails.group_id}</p>
      <p>Tipo: {auctionDetails.type}</p>
    </div>
  );
};

export default AuctionDetails;