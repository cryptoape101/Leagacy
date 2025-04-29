import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { Menu, IconButton, ListItemIcon, Box, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import CreateLeagueButton from './CreateLeagueButton';
import { formatYear } from '@leagacy/utils/displayFormat';

import { useNavigateWithParams } from '@leagacy/hooks/useNavigateWithParams';


const MenuComponent = ({ anchorEl, setAnchorEl, handleClose }) => {
  const leagues = useSelector((state) => state.app.leagues);
  const activeLeagues = leagues.filter((league) => !league.archived);
  const navigate = useNavigateWithParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const MenuItemLink = React.forwardRef((props, ref) => {
    const { to, onClick, ...other } = props;
    
    const handleNavigation = (event) => {
      // Call the original onClick if provided
      if (onClick) {
        onClick(event);
      }
      // Navigate to the destination with preserved params
      navigate(to);
    };
    
    return (
      <ListItem button onClick={handleNavigation} ref={ref} {...other} />
    );
  });

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
              <MenuItemLink onClick={handleClose} key={league.id} to={`/league/${league.id}`}>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <ListItemText
                    primary={league.name}
                    secondary={`${league.sport} ${formatYear({year: league.year, shortFormat: true})}`}
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