import React, { useState, ReactNode } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  ThemeProvider,
  Divider,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun icon (original)
import Brightness3Icon from '@mui/icons-material/Brightness3'; // Moon icon (original)
import { lightTheme, darkTheme } from '../themes/default';
// import Footer from "../components/Footer";

export interface LayoutProps {
  children: ReactNode;
  location?: Location;
}

const Layout = ({ children, location }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const data = useStaticQuery(graphql`
    query MainLayoutSiteMetadata {
      site {
        siteMetadata {
          title
          description
          logoUrl
          primaryColor
          primaryColorDark
          secondaryColor
          secondaryColorDark
          menuLinks {
            name
            link
          }
          footerLinks {
            name
            link
          }
        }
      }
    }
  `);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      {data.site.siteMetadata.logoUrl && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <img
            src={data.site.siteMetadata.logoUrl}
            alt={data.site.siteMetadata.title}
            style={{ maxWidth: '100%', maxHeight: '60px' }}
          />
        </Box>
      )}
      <Typography variant="h6" sx={{ mb: 2 }}>
        {data.site.siteMetadata.title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.site.siteMetadata.menuLinks.map((link: any) => (
          <ListItem
            key={link.name}
            component={Link}
            to={link.link}
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              bgcolor: location?.pathname === link.link ? 'action.selected' : 'transparent',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar
          position="sticky"
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: 0,
            zIndex: (theme) => theme.zIndex.appBar,
          }}
        >
          <Toolbar>
            {/* Mobile menu toggle */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop sidebar toggle - also using MenuIcon */}
            {!isMobile && (
              <IconButton
                color="inherit"
                aria-label={sidebarOpen ? 'close sidebar' : 'open sidebar'}
                edge="start"
                onClick={toggleSidebar}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {data.site.siteMetadata.logoUrl && (
                <img src={data.site.siteMetadata.logoUrl} alt="" style={{ height: 30 }} />
              )}
              {data.site.siteMetadata.title}
            </Typography>

            {/* Light/Dark mode toggle */}
            <Tooltip title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton
                onClick={toggleDarkMode}
                color="inherit"
                sx={{ ml: 1 }}
                aria-label="toggle dark/light mode"
              >
                {darkMode ? <WbSunnyIcon /> : <Brightness3Icon />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Sidebar for desktop */}
          {!isMobile && (
            <Drawer
              variant="temporary"
              open={sidebarOpen}
              onClose={toggleSidebar}
              ModalProps={{
                keepMounted: true, // Better open performance
              }}
              hideBackdrop={false} // Show backdrop overlay
              sx={{
                '& .MuiDrawer-paper': {
                  width: 240,
                  boxSizing: 'border-box',
                  borderRight: `1px solid ${theme.palette.divider}`,
                  zIndex: (theme) => theme.zIndex.drawer,
                },
              }}
            >
              {drawer}
            </Drawer>
          )}

          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { width: 240 },
            }}
          >
            {drawer}
          </Drawer>

          {/* Main content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 0,
              width: '100%',
            }}
          >
            <Toolbar sx={{ display: { md: 'none' } }} />
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
