import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const CreateLeagueButton = () => (
  <Button color="inherit" component={Link} to="/create" aria-label="Create new league">
    <AddIcon /> League
  </Button>
);

export default CreateLeagueButton;
