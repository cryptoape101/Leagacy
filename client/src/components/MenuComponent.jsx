import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { Menu, IconButton, ListItemIcon, Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import CreateLeagueButton from './CreateLeagueButton';

/**
 * Generates a display formatted string for the year
 * If the year is a single digit, it returns the year as a string
 * If the year is a two digit array, it returns the years as a range
 * 
 * @param {*} year
 * @returns String
 */
const formatYear = (year) => {
  if (year.length === 1) {
    return year[0].toString();
  } else if (year.length === 2) {
    let sortedYear = [...year]; // Create a copy of the year array
    sortedYear.sort((a, b) => a - b); // Sort the copy
    return `${sortedYear[0]}-${sortedYear[1]}`;
  }
  return '';
}

const MenuComponent = ({ anchorEl, setAnchorEl, handleClose }) => {
  const leagues = useSelector((state) => state.app.leagues);
  const activeLeagues = leagues.filter((league) => !league.archived);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const MenuItemLink = React.forwardRef((props, ref) => (
    <ListItem button component={Link} ref={ref} {...props} />
  ));

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
          {(isEmpty(activeLeagues)) ? (
            <>
              <ListItemText primary="No Leagues" />
              <ListItem>
                <CreateLeagueButton />
              </ListItem>
            </>
          ) : (
            <>
              <ListItemText primary="Current Leagues" />
              {activeLeagues.map((league) => (
              <MenuItemLink onClick={handleClose} key={league.id} to={`/leagues/${league.id}`}>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <ListItemText
                    primary={league.name}
                    secondary={`${league.sport} ${formatYear(league.year)}`}
                  />
                  {league.commish && (
                    <ListItemIcon>
                      <SupervisorAccountIcon aria-label="Commissioner" />
                    </ListItemIcon>
                  )}
                </Box>
              </MenuItemLink>
            ))}
            </>
          )}
        </List>
      </Menu>
    </>
  );
};

export default MenuComponent;