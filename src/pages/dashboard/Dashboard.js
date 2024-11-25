import React, { useEffect, useState } from "react";
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.js';
import Sidebar from '../../components/SideBar/Sidebar.js';
import StatsGrid from './components/StatsGrid.js';
import BetsTable from './components/BetsTable.js';
import { mockBets, mockStats } from './data/mockData.js';
import SideBarHeader from '../../components/SideBar/SideBarHeader.js';
import { getBuyRequestsByUser, getFixtureById } from "../../api/axios.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { transformBetData, calculateStats } from "./data/DataProcesor.js";
import { Trash } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [buyRequests, setBuyRequests] = useState([]);
  const [fixtures, setFixtures] = useState({});
  const [accessToken, setAccessToken] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchBuyRequests = async () => {
      if (isAuthenticated && accessToken) {
        const data = await getBuyRequestsByUser(accessToken);
        console.log(data);
        setBuyRequests(data);

        const fixtureDetails = {};
        for (const request of data) {
          if (!fixtureDetails[request.fixtureId]) {
            const fixture = await getFixtureById(
              accessToken,
              request.fixtureId
            );
            fixtureDetails[request.fixtureId] = fixture;
          }
        }
        setFixtures(fixtureDetails);
      }
    };

    fetchBuyRequests();
  }, [ accessToken, isAuthenticated]);

  // console.log(buyRequests);
  // console.log(fixtures);

  const betData = transformBetData(buyRequests, fixtures);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`transition-all duration-200 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <SideBarHeader setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} toggleTheme={toggleTheme} theme={theme} />

        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Mis apuestas
          </h1>
          
          <StatsGrid stats={calculateStats(betData)} />
          
          <div className="mt-8">
            <BetsTable bets={betData}/>
            {/* <BetsTable bets={mockBets}/> */}
          </div>
        </main>
      </div>
    </div>
  );
}