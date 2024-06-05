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

let theme = createTheme({
  palette: {
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

export default theme;
