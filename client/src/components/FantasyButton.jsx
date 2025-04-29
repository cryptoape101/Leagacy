import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFantasyButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: '0.5rem 1.5rem',
  backgroundColor: theme.palette.primary.main, // Royal purple (#6741D9)
  color: theme.palette.secondary.main, // Fantasy Gold (#FFD700)
  fontSize: '1.1rem',
  fontFamily: theme.typography.h1.fontFamily,
  letterSpacing: '0.05em',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  border: 'none',
  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
  borderRadius: '4px', // Match the slight rounding of the inner button

  // Inner border (gold outline)
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: `2px solid ${theme.palette.secondary.main}`, // Gold border
    borderRadius: '4px',
    pointerEvents: 'none',
  },

  // Outer parchment-like border with gradient
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: '0px',
    background: 'linear-gradient(to bottom, #fdf1dc, #e6d1a3)',
    zIndex: -1,
    pointerEvents: 'none',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    
    // Create inverted corners with mask-image
    maskImage: `
      radial-gradient(circle 10px at top left, transparent 0%, black 11px),
      radial-gradient(circle 10px at top right, transparent 0%, black 11px),
      radial-gradient(circle 10px at bottom right, transparent 0%, black 11px),
      radial-gradient(circle 10px at bottom left, transparent 0%, black 11px)
    `,
    maskComposite: 'intersect', // Make sure the corners combine properly
    WebkitMaskImage: `
      radial-gradient(circle 10px at top left, transparent 0%, black 11px),
      radial-gradient(circle 10px at top right, transparent 0%, black 11px),
      radial-gradient(circle 10px at bottom right, transparent 0%, black 11px),
      radial-gradient(circle 10px at bottom left, transparent 0%, black 11px)
    `,
    WebkitMaskComposite: 'source-in', // For webkit browsers
  },

  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Darker purple on hover
    boxShadow: `0 0 15px ${theme.palette.secondary.light}`,
    transform: 'translateY(-1px)',
    transition: 'all 0.2s ease',
  },
}));

/* 
 * FantasyButton is a styled CTA button component.
 * 
 * @param {object} props - The props for the button.
 * @returns {JSX.Element} - The styled button component.
 */
const FantasyButton = (props) => {
  return <StyledFantasyButton disableRipple {...props} />;
};

export default FantasyButton;