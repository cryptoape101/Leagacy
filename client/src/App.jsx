// import { EthProvider } from "./contexts/EthContext";
// import Footer from "./components/Footer";
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';


import TopNavigation from "./components/TopNavigation";
import MainContent from "./components/MainContent";
import CreateLeague from "./components/CreateLeague";
import ManageLeagues from "./components/ManageLeagues";
import LeagueDetails from "./components/LeagueDetails";


import { fetchData } from '@leagacy/mock/data';
import { setLeagues } from '@leagacy/redux/appSlice';

import theme from './theme';


/**
 * Setups the main application routes and layout.
 * TODO: main component rendering to it's own Layout component
 * Fetches mock data if requested
 * 
 * @returns JSX.Element
 */
function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mockData')) { // TODO: Remove when live blockchain data is being used
      fetchData().then(data => {
        const {leagues} = data;
        console.log("Fetched mock data", leagues);
        if (leagues) {
          dispatch(setLeagues(leagues));
        }
      });
    }
  }, [location, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div id="App">
        <div className="container">
          <TopNavigation />
          <Routes>
            <Route path="/create" element={<CreateLeague />} />
            <Route path="/leagues" element={<ManageLeagues />} />
            <Route path="/league/:id" element={<LeagueDetails />} />
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
