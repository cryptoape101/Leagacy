import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { formatCurrency } from '@leagacy/utils/displayFormat';

const LeagueDetails = () => {
  const { id } = useParams();
  const leagues = useSelector(state => state.app.leagues);
  const league = leagues.find(league => league.id === id);

  if (!league) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">League not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2">{league.name}</Typography>
      <Typography variant="h4">{league.sport} - {Array.isArray(league.year) ? league.year.join('/') : league.year}</Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">League Size: {league.leagueSize || 'Not specified'}</Typography>
        <Typography variant="body1">Fee: {formatCurrency(league.fee, league.currency)}</Typography>
        {league.commish && <Typography variant="body1">You are the commissioner of this league</Typography>}
      </Box>
    </Box>
  );

};

export default LeagueDetails;