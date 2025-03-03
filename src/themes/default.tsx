import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const lightBackground = '#fff';
const darkBackground = grey[900];

const headerFontWeight = 400;

// Common typography settings to maintain consistency
const typographySettings = {
  h1: {
    fontSize: '2.25rem',
    fontWeight: headerFontWeight,
  },
  h2: {
    fontSize: '2rem',
    letterSpacing: '0',
    fontWeight: headerFontWeight,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: headerFontWeight,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: headerFontWeight,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: headerFontWeight,
  },
  h6: {
    fontSize: '1.1rem',
    fontWeight: headerFontWeight,
  },
  body1: {
    fontSize: '1.06rem',
  },
  fontFamily: ['Helvetica', 'Arial', 'San-Serif'].join(','),
  fontSize: 17,
  fontWeightRegular: 250,
};

// Light theme with preserved styling
export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      background: {
        default: lightBackground,
        paper: lightBackground,
      },
    },
    typography: typographySettings,
    components: {
      MuiAppBar: {
        defaultProps: {
          position: 'sticky',
        },
        styleOverrides: {
          root: {
            backgroundColor: lightBackground,
          },
          colorDefault: {
            backgroundColor: lightBackground,
          },
          colorPrimary: {
            backgroundColor: lightBackground,
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            zIndex: 1,
            opacity: 1,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: lightBackground,
          },
        },
      },
    },
  })
);

// Dark theme with preserved styling
export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: darkBackground,
        paper: darkBackground,
      },
    },
    typography: typographySettings,
    components: {
      MuiAppBar: {
        defaultProps: {
          position: 'sticky',
        },
        styleOverrides: {
          root: {
            backgroundColor: darkBackground,
          },
          colorPrimary: {
            backgroundColor: darkBackground,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: darkBackground,
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: darkBackground,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            zIndex: 1,
            opacity: 1,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: grey[400],
          },
        },
      },
    },
  })
);
