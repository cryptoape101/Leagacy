import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Select, MenuItem, InputLabel, Grid, Box, Button, Typography } from '@mui/material';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import { Eth } from '@leagacy/icons/eth';
import { Tether } from '@leagacy/icons/tether';
import { Usdc } from '@leagacy/icons/usdc';
import { Base } from '@leagacy/icons/base';

const generateYears = (sport) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 5; i++) {
    if (['NFL', 'NBA', 'NHL'].includes(sport)) {
      years.push(`${currentYear + i}-${currentYear + i + 1}`);
    } else {
      years.push(`${currentYear + i}`);
    }
  }
  return years;
};

const CreateLeague = () => {
  const [customSport, setCustomSport] = React.useState('');
  
  const [leagueName, setLeagueName] = React.useState('');
  const [leagueSize, setLeagueSize] = React.useState(12);
  const [fee, setFee] = React.useState('');
  const [currency, setCurrency] = React.useState('Eth');
  const [sport, setSport] = useState('NFL');
  const [year, setYear] = useState(generateYears(sport)[0]);
  const [chain, setChain] = useState('Base');

  const [sportError, setSportError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [leagueNameError, setLeagueNameError] = useState(false);
  const [leagueSizeError, setLeagueSizeError] = useState(false);
  const [feeError, setFeeError] = useState(false);
  

  const handleChangeSport = (event) => {
    setSport(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleCustomSportChange = (event) => {
    setCustomSport(event.target.value);
  };

  const handleLeagueNameChange = (event) => {
    setLeagueName(event.target.value);
  };

  const handleLeagueSizeChange = (event) => {
    setLeagueSize(event.target.value);
  };

  const handleFeeChange = (event) => {
    setFee(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangeChain = (event) => {
    setChain(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    let isValid = true;
  
    if (!customSport) {
      setSportError(true);
      isValid = false;
    }
  
    if (!year) {
      setYearError(true);
      isValid = false;
    }
  
    if (!leagueName) {
      setLeagueNameError(true);
      isValid = false;
    }
  
    if (!leagueSize) {
      setLeagueSizeError(true);
      isValid = false;
    }
  
    if (!fee) {
      setFeeError(true);
      isValid = false;
    }
  
    if (isValid) {
      // Submit the form
      console.log('Form is valid');
    }
  };

  return (
    <div className='create-league'>
      <form onSubmit={handleSubmit}>
      <Typography variant="h2">Create League</Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Pick a Sport</FormLabel>
        <RadioGroup aria-label="sport" name="sport" value={sport} onChange={handleChangeSport} row margin="dense">
          <FormControlLabel value="NFL" control={<Radio />} label={<><SportsFootballIcon /> NFL</>} />
          <FormControlLabel value="NBA" control={<Radio />} label={<><SportsBasketballIcon /> NBA</>} />
          <FormControlLabel value="MLB" control={<Radio />} label={<><SportsBaseballIcon /> MLB</>} />
          <FormControlLabel value="NHL" control={<Radio />} label={<><SportsHockeyIcon /> NHL</>} />
          <FormControlLabel value="Custom" control={<Radio />} label={<><SettingsSuggestIcon /> Custom</>} />
        </RadioGroup>
        {sport === 'Custom' && (
          <TextField
            label="Sport"
            value={customSport}
            onChange={handleCustomSportChange}
            margin="dense"
            required
            error={sportError}
            helperText={sportError ? "Sport is required" : ""}
          />
        )}
        <InputLabel id="year-label">Year</InputLabel>
        <Select
          labelId="year-label"
          value={year}
          onChange={handleChangeYear}
          margin="dense"
          required
          error={yearError}
          helperText={sportError ? "Sport is required" : ""}
        >
          {generateYears(sport).map((year, index) => (
            <MenuItem key={index} value={year}>{year}</MenuItem>
          ))}
        </Select>
        <TextField
          label="League Name"
          value={leagueName}
          onChange={handleLeagueNameChange}
          margin="dense"
          required
          error={leagueNameError}
          helperText={leagueNameError ? "League Name is required" : ""}
        />
        <TextField
          label="League Size"
          value={leagueSize}
          onChange={handleLeagueSizeChange}
          margin="dense"
          required
          error={leagueSizeError}
          helperText={leagueSizeError ? "League Size is required" : ""}
        />
        <InputLabel id="chain-label">Chain</InputLabel>
        <Select
          labelId="chain-label"
          value={chain}
          onChange={handleChangeChain}
        >
          <MenuItem value="Base"><Base /> Base</MenuItem>
        </Select>
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            <TextField
              label="Fee"
              type="number"
              value={fee}
              onChange={handleFeeChange}
              margin="dense"
              required
              fullWidth
              error={feeError}
              helperText={feeError ? "Fee is required" : ""}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="currency-label">Currency</InputLabel>
                <Select
                  labelId="currency-label"
                  id="currency-select"
                  value={currency}
                  onChange={handleCurrencyChange}
                  margin="dense"
                  required
                >
                  <MenuItem value="ETH"><Eth /> ETH</MenuItem>
                  <MenuItem value="USDC"><Usdc /> USDC</MenuItem>
                  <MenuItem value="USDT"><Tether /> USDT</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Button variant="contained"
          color="primary"
          type="submit"
          size="large"
          sx={{ mt: 3 }}
        >
          Create League
        </Button>
      </FormControl>
      </form>
    </div>
  );
};

export default CreateLeague;