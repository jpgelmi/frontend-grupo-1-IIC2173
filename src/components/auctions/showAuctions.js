import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuctions, proposeBuyAuction } from "../../api/axios.js";
import "../../pages/fixtures/Fixtures.css";
import { useAuth0 } from "@auth0/auth0-react";
import FixtureItem from "../../components/FixtureItem/FixtureItem.js";
import Swal from "sweetalert2";

const AuctionDetails = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
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
  const isAdmin = user?.user_roles?.includes("Admin IIC2173");
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
  if (!isAdmin) {
    navigate('/AdminError');
  }
  return (
    <div className="fixtures-container" style={{textAlign: 'center'}}>
      <div style={{ maxHeight: '500px', overflowY: 'scroll', width:'900px' }}> {/* Add this container */}
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
                      <FixtureItem
                        key={index}
                        fixture={fixture}
                        handleFixtureClick={handleFixtureClick}
                      />
                  )}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="button-buy" onClick={(e) => { 
                      e.stopPropagation(); 
                      proposeBuyAuction(accessToken, detail); 
                      Swal.fire({
                        title: "Proposición realizada",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          window.location.reload();
                        }
                      });
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
    </div>
  );
};

export default AuctionDetails;