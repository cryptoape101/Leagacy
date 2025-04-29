import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

import FantasyButton from './FantasyButton';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import { formatCurrency, formatYear } from '@leagacy/utils/displayFormat';

import { useNavigateWithParams } from '@leagacy/hooks/useNavigateWithParams';

function LeaguesTable({ leagues, leagueAriaLabel }) {

  return (
    <TableContainer component={Paper} sx={{ component: 'div' }}>
      <Table sx={{ minWidth: 650 }} aria-label={leagueAriaLabel}>
        <TableHead>
          <TableRow>
          <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white' }}>Name (Commish)</TableCell>
            <TableCell>Season</TableCell>
            <TableCell>Fee</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leagues.map((league) => (
            <LeagueRow key={league.id} league={league} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function LeagueRow({ league }) {
  const navigate = useNavigateWithParams();
  const name = league.name || 'N/A';
  const sport = league.sport || 'N/A';
  const year = formatYear({year: league.year}) || 'N/A';
  const fee = formatCurrency(league.fee, league.currency) || 'N/A';

  const handleNavigation = () => {
    navigate(`/league/${league.id}`);
  };

  return (
    <TableRow key={league.name}>
      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white' }}>
        <Typography variant="span" aria-label={`${name}${league.commish ? ' commissioner' : ''}`}>
        <Typography 
            component="span" 
            onClick={handleNavigation} 
            sx={{ 
              cursor: 'pointer',
              color: 'primary.main',
              textDecoration: 'underline',
              '&:hover': {
                textDecoration: 'none',
              }
            }}
          >
            {name} {league.commish ? <SupervisorAccountIcon /> : null}
          </Typography>
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="span">{`${sport} ${year}`}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="span">{fee}</Typography>
      </TableCell>
      <TableCell>{league.paid ?
        (<Typography variant="span">Paid</Typography>) :
        (<FantasyButton onClick={handleNavigation} size="small">Pay</FantasyButton>)
      }</TableCell>
    </TableRow>
  );
}

export default LeaguesTable;