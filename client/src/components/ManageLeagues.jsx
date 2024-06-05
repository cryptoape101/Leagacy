import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const ManageLeagues = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='leagues'>
      <Typography variant="h2">Manage Leagues</Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Current" />
            <Tab label="Past" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {/* Content for Current tab goes here */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Content for Past tab goes here */}
        </TabPanel>
      </Box>
    </div>
  );
};

function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default ManageLeagues;