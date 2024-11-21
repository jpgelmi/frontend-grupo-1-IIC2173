import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuctions } from "../../api/axios.js";
import "../style/Fixtures.css";
import { useAuth0 } from "@auth0/auth0-react";

const AuctionDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auction } = location.state || {};
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState('');

  // Obtener el Access Token de Auth0
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        } catch (error) {
          console.error('Error obteniendo el Access Token:', error);
        }
      }
    };

    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      if (!auction || !accessToken) return;
      try {
        setLoading(true);
        const response = await getAuctions(accessToken);

        if (response.status === 200) {
          setAuctionDetails(response.data);
        } else {
          console.error("Error fetching auction details");
        }
      } catch (error) {
        console.error("Error fetching auction details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionDetails();
  }, [accessToken, auction]);

  if (!auction) {
    return <div>No auction details available</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
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