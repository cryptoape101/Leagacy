import React, { useState } from 'react';
import {
  Grid, Box, Button, Typography,
  FormControl, TextField, Select, MenuItem, InputLabel, FormHelperText,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import { Eth } from '@leagacy/assets/icons/eth';
import { Tether } from '@leagacy/assets/icons/tether';
import { Usdc } from '@leagacy/assets/icons/usdc';
import { Base } from '@leagacy/assets/icons/base';

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
  const [leagueName, setLeagueName] = React.useState('');
  const [leagueSize, setLeagueSize] = React.useState(12);
  const [fee, setFee] = React.useState('');
  const [currency, setCurrency] = React.useState('ETH');
  
  const [sport, setSport] = useState('NFL');
  const [customSport, setCustomSport] = React.useState('');
  const [year, setYear] = useState(generateYears(sport)[0]);
  const [chain, setChain] = useState('Base');

  const [sportError, setSportError] = useState(false);
  const [customSportError, setCustomSportError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [leagueNameError, setLeagueNameError] = useState(false);
  const [leagueSizeError, setLeagueSizeError] = useState(false);
  const [feeError, setFeeError] = useState(false);

  const [open, setOpen] = React.useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    let isValid = true;
  
    if (!sport) {
      setSportError(true);
      isValid = false;
      console.log('Sport is required');
    }

    if (sport === 'custom' && !customSport) {
      setCustomSportError(true);
      isValid = false;
      console.log('Custom Sport is required');
    }
  
    if (!year) {
      setYearError(true);
      isValid = false;
      console.log('Year is required');
    }
  
    if (!leagueName) {
      setLeagueNameError(true);
      isValid = false;
      console.log('League Name is required');
    }
  
    if (!leagueSize) {
      setLeagueSizeError(true);
      isValid = false;
      console.log('League Size is required'); 
    }
  
    if (!fee) {
      setFeeError(true);
      isValid = false;
      console.log('Fee is required');
    }
  
    if (isValid) {
      handleClickOpen();
      console.log('Form is valid');
    }
  };

  return (
    <>
      <Box className='create-league' sx={{ p: 3 }} >
        <form onSubmit={handleSubmit}>
        <Typography variant="h2">Create League</Typography>
          <Box sx={{ mb: 2, position: 'relative' }}>
            <FormControl error={sportError} required margin="dense">
              <InputLabel id="sport-label">Sport</InputLabel>
              <Select
                labelId="sport-label"
                value={sport}
                onChange={handleChangeSport}
              >
                <MenuItem value="NFL"><SportsFootballIcon /> NFL</MenuItem>
                <MenuItem value="NBA"><SportsBasketballIcon /> NBA</MenuItem>
                <MenuItem value="MLB"><SportsBaseballIcon /> MLB</MenuItem>
                <MenuItem value="NHL"><SportsHockeyIcon /> NHL</MenuItem>
                <MenuItem value="custom"><SettingsSuggestIcon /> Custom</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {sport === 'custom' && (
            <Box sx={{ mb: 2, position: 'relative' }}>
              <FormControl error={customSportError} required margin="dense">
                <TextField
                  label="Sport"
                  value={customSport}
                  onChange={handleCustomSportChange}
                  helperText={customSportError ? "Sport is required" : ""}
                />
              </FormControl>
            </Box>
          )}

          <Box sx={{ mb: 2, position: 'relative' }}>
            <FormControl error={yearError} required margin="dense">
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                value={year}
                onChange={handleChangeYear}
              >
                {generateYears(sport).map((year, index) => (
                  <MenuItem key={index} value={year}>{year}</MenuItem>
                ))}
              </Select>
              {yearError && <FormHelperText>Sport is required</FormHelperText>}
            </FormControl>
          </Box>
          <Box sx={{ mb: 2, position: 'relative' }}>
            <TextField
              label="League Name"
              value={leagueName}
              onChange={handleLeagueNameChange}
              margin="dense"
              required
              error={leagueNameError}
              helperText={leagueNameError ? "League Name is required" : ""}
            />
          </Box>
          <Box sx={{ mb: 2, position: 'relative' }}>
            <TextField
              label="League Size"
              value={leagueSize}
              onChange={handleLeagueSizeChange}
              margin="dense"
              required
              error={leagueSizeError}
              helperText={leagueSizeError ? "League Size is required" : ""}
            />
          </Box>
          <Box sx={{ mb: 2, position: 'relative' }}>
            <InputLabel id="chain-label">Chain</InputLabel>
            <Select
              labelId="chain-label"
              value={chain}
              onChange={handleChangeChain}
            >
              <MenuItem value="Base"><Base /> Base</MenuItem>
            </Select>
          </Box>
          <Box sx={{ mb: 2, position: 'relative' }}>
            <Grid container spacing={2}>
              <Grid item sm={8} xs={12}>
                <TextField
                  label="Fee"
                  type="number"
                  value={fee}
                  onChange={handleFeeChange}
                  margin="dense"
                  required
                  error={feeError}
                  helperText={feeError ? "Fee is required" : ""}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Box sx={{ mt: 2, position: 'relative' }}>
                  <FormControl >
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
          </Box>
          <Box sx={{ mb: 2, position: 'relative' }}>
            <Button variant="contained"
              color="primary"
              type="submit"
              size="large"
              sx={{ mt: 3 }}
            >
              Create League
            </Button>
          </Box>
        </form>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h3">Confirm League Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here are the league settings you've chosen:
            {/* Display the league settings here */}
            Are you sure you want to create the league with these settings? Modifying these settings will require additional transactions once the league is created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, I want to modify the settings</Button>
          <Button onClick={handleClose} autoFocus>Yes, create the league</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateLeague;