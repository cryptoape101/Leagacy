import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LeaguesTable from './ManageLeaguesTable';

const ManageLeagues = () => {
  const leagues = useSelector((state) => state.app.leagues);
  const currentLeagues = leagues.filter(league => !league.archived);
  const pastLeagues = leagues.filter(league => league.archived);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className='leagues' sx={{ p: 3 }}>
      <Typography variant="h2">Manage Leagues</Typography>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Current" />
            <Tab label="Past" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {_.isEmpty(currentLeagues) ?
            <Typography variant="body1">No Active Leagues</Typography> :
            <LeaguesTable leagues={currentLeagues} leagueAriaLabel={'Current Leagues'} />
          }
        </TabPanel>
        <TabPanel value={value} index={1}>
          {_.isEmpty(pastLeagues) ?
            <Typography variant="body1">No Past Leagues</Typography> :
            <LeaguesTable leagues={pastLeagues} leagueAriaLabel={'Past Leagues'} />
          }
        </TabPanel>
      </Box>
    </Box>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

export default ManageLeagues;