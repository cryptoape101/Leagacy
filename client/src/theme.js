import { createTheme } from '@mui/material/styles';

// Define the color values
const colors = {
  primary: {
    light: '#5C9ECC', // Lighter shade of Dynamic Blue
    main: '#0077CC', // Dynamic Blue
    dark: '#005999', // Darker shade of Dynamic Blue
  },
  secondary: {
    light: '#FFECB3', // Lighter shade of Fantasy Gold
    main: '#FFD700', // Fantasy Gold
    dark: '#B29500', // Darker shade of Fantasy Gold
  },
  error: {
    light: '#E57373', // Light Red
    main: '#F44336', // Red
    dark: '#D32F2F', // Dark Red
  },
};

// TODO: Add dark mode theme
// const darkColors = {
//   primary: {
//     light: '#3B6A9A', // Darker shade of Dynamic Blue for dark mode
//     main: '#005999', // Darker shade of Dynamic Blue
//     dark: '#003C66', // Even darker shade of Dynamic Blue
//   },
//   secondary: {
//     light: '#CCAC00', // Darker shade of Fantasy Gold for dark mode
//     main: '#B29500', // Darker shade of Fantasy Gold
//     dark: '#806A00', // Even darker shade of Fantasy Gold
//   },
//   error: {
//     light: '#B23C2C', // Darker shade of Red for dark mode
//     main: '#D32F2F', // Dark Red
//     dark: '#9A2020', // Even darker shade of Red
//   },
// };

const fonts = {
  jakobenz: '"Jakobenz", "Roboto", "Helvetica", "Arial", sans-serif',
  prostoSans: '"Prosto Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  default: '"Roboto", "Helvetica", "Arial", sans-serif',
};

const typography = {
  fontFamily: fonts.default,
  fontSize: 14, // Add your desired base font size here
  h1: {
    fontFamily: fonts.jakobenz,
    fontSize: '2rem',
  },
  h2: {
    fontFamily: fonts.prostoSans,
    fontSize: '1.5rem',
  },
  h3: {
    fontFamily: fonts.prostoSans,
    fontSize: '1.17rem',
  },
  h4: {
    fontFamily: fonts.prostoSans,
    fontSize: '1rem',
  },
  h5: {
    fontFamily: fonts.prostoSans,
    fontSize: '0.83rem',
  },
  h6: {
    fontFamily: fonts.prostoSans,
    fontSize: '0.67rem',
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
  },
};

let theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark,
    },
    secondary: {
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark,
    },
    error: {
      light: colors.error.light,
      main: colors.error.main,
      dark: colors.error.dark,
    },
  },
  background: {
    default: '#FFFFFF', // Clean White
    paper: '#F7F7F7', // Off White
  },
  typography
});

// Update the theme with the contrast text
theme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    primary: {
      ...theme.palette.primary,
      contrastText: theme.palette.getContrastText(theme.palette.primary.main),
    },
    secondary: {
      ...theme.palette.secondary,
      contrastText: theme.palette.getContrastText(theme.palette.secondary.main),
    },
    error: {
      ...theme.palette.error,
      contrastText: theme.palette.getContrastText(theme.palette.error.main),
    },
  },
});

// let darkTheme = createTheme({
//   palette: {
//     type: 'dark',
//     primary: {
//       light: colors.primary.light,
//       main: colors.primary.main,
//       dark: colors.primary.dark,
//     },
//     secondary: {
//       light: colors.secondary.light,
//       main: colors.secondary.main,
//       dark: colors.secondary.dark,
//     },
//     error: {
//       light: colors.error.light,
//       main: colors.error.main,
//       dark: colors.error.dark,
//     },
//   },
//   background: {
//     default: '#121212', // Dark Grey
//     paper: '#1E1E1E', // Darker Grey
//   },
//   typography
// });

export default theme;
