import { createTheme } from '@mui/material/styles';


// Define the color values
// const colors = {
//   primary: {
//     light: '#5C9ECC', // Lighter shade of Dynamic Blue
//     main: '#0077CC', // Dynamic Blue
//     dark: '#005999', // Darker shade of Dynamic Blue
//   },
//   secondary: {
//     light: '#FFECB3', // Lighter shade of Fantasy Gold
//     main: '#FFD700', // Fantasy Gold
//     dark: '#B29500', // Darker shade of Fantasy Gold
//   },
// };

// Fantasy Grimoire Theme
const colors = {
  primary: {
    light: '#A08CF7',    // Lavender glow
    main: '#6741D9',     // Royal purple
    dark: '#4C2CA2',     // Deeper magic
  },
  secondary: {
    light: '#FFF4B3',    // Light gold
    main: '#FFD700',     // Fantasy Gold
    dark: '#B29500',     // Ancient gold
  },
  error: {
    light: '#E57373',
    main: '#F44336',
    dark: '#D32F2F',
  },
  parchment: {
    light: '#fdf1dc',
    main: '#f5e4c3',
    dark: '#e6d1a3',
  }
};

const fonts = {
  jakobenz: '"Jakobenz", "Roboto", "Helvetica", "Arial", sans-serif',
  prostoSans: '"Prosto Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  default: '"Roboto", "Helvetica", "Arial", sans-serif',
};

const typography = {
  fontFamily: fonts.default,
  fontSize: 14,
  h1: {
    fontFamily: fonts.jakobenz,
    fontSize: '2rem',
    letterSpacing: '0.05em',
    fontWeight: 'bold',
  },
  h2: {
    fontFamily: fonts.jakobenz,
    fontSize: '1.75rem',
    letterSpacing: '0.04em',
  },
  h3: {
    fontFamily: fonts.prostoSans,
    fontSize: '1.5rem',
  },
  h4: {
    fontFamily: fonts.prostoSans,
    fontSize: '1.25rem',
  },
  h5: {
    fontFamily: fonts.prostoSans,
    fontSize: '1rem',
  },
  h6: {
    fontFamily: fonts.prostoSans,
    fontSize: '0.875rem',
  },
  body1: {
    fontSize: '1rem',
  },
  body2: {
    fontSize: '0.875rem',
  },
  button: {
    fontFamily: fonts.prostoSans,
    textTransform: 'none',
    fontWeight: 600,
  },
};

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    background: {
      default: colors.parchment.main,
      paper: colors.parchment.main,
    },
  },
  typography,
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary.main,
          color: colors.secondary.main,
          boxShadow: `0 0 8px ${colors.secondary.main}`,
          '&:hover': {
            backgroundColor: colors.primary.dark,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.secondary.light,
          backgroundImage: `
            radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px),
            radial-gradient(circle, rgba(0,0,0,0.015) 1px, transparent 1px),
            linear-gradient(to bottom, #fdf1dc 0%, #f5e4c3 100%)
          `,

        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary.main,
        },
      },
    },
  },
});



// Add contrast text color for all palettes
theme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      ...theme.palette.primary,
      contrastText: '#fff',
    },
    secondary: {
      ...theme.palette.secondary,
      contrastText: '#000',
    },
    error: {
      ...theme.palette.error,
      contrastText: '#fff',
    },
    parchment: {
      ...theme.palette.parchment,
      contrastText: '#000',
    },
  },
});

export default theme;
