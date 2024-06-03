import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { Menu, IconButton, ListItemIcon, Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import CreateLeagueButton from './CreateLeagueButton';

const MenuComponent = ({ anchorEl, setAnchorEl, handleClose }) => {
  const leagues = useSelector((state) => state.app.leagues);
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
          {(isEmpty(leagues)) ? (
            <>
              <ListItemText primary="No Leagues" />
              <ListItem>
                <CreateLeagueButton />
              </ListItem>
            </>
          ) : (
            <>
              <ListItemText primary="Current Leagues" />
              {leagues.map((league) => (
              <MenuItemLink onClick={handleClose} key={league.id} to={`/leagues/${league.id}`}>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <ListItemText
                    primary={league.name}
                    secondary={`${league.sport} ${league.year}`}
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