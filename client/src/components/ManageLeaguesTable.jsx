import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import { formatCurrency, formatYear } from '@leagacy/utils/displayFormat';

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
            <LeagueRow league={league} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function LeagueRow({ league }) {
  const name = league.name || 'N/A';
  const sport = league.sport || 'N/A';
  const year = formatYear({year: league.year}) || 'N/A';
  const fee = formatCurrency(league.fee, league.currency) || 'N/A';

  return (
    <TableRow key={league.name}>
      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white' }}>
        <Typography variant="span" aria-label={`${name}${league.commish ? ' commissioner' : ''}`}>
          <Link to={`/leagues/${league.id}`}>{name}</Link> {league.commish ? <SupervisorAccountIcon /> : null}
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
        (<Button variant="contained" color="primary">Pay</Button>)
      }</TableCell>
    </TableRow>
  );
}

export default LeaguesTable;