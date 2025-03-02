import React, { useState, ReactNode } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { 
  AppBar, 
  Box, 
  Container, 
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
  Tooltip
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WbSunnyIcon from "@mui/icons-material/WbSunny"; // Sun icon (original)
import Brightness3Icon from "@mui/icons-material/Brightness3"; // Moon icon (original)
import { lightTheme, darkTheme } from "../themes/default";
import Footer from "../components/Footer";

export interface LayoutProps {
  children: ReactNode;
  location?: Location;
}

const Layout = ({ children, location }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
              }
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
            boxShadow: 1,
            zIndex: theme.zIndex.drawer + 1 // Ensure AppBar is above drawer
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
                aria-label={sidebarOpen ? "close sidebar" : "open sidebar"}
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
                gap: 1
              }}
            >
              {data.site.siteMetadata.logoUrl && (
                <img 
                  src={data.site.siteMetadata.logoUrl} 
                  alt="" 
                  style={{ height: 30 }}
                />
              )}
              {data.site.siteMetadata.title}
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {data.site.siteMetadata.menuLinks.map((link: any) => (
                <Typography 
                  key={link.name} 
                  component={Link} 
                  to={link.link}
                  sx={{ 
                    color: 'inherit', 
                    textDecoration: 'none',
                    mx: 2,
                    '&:hover': {
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Box>
            
            {/* Light/Dark mode toggle */}
            <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
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
              variant="persistent"
              open={sidebarOpen}
              sx={{
                width: sidebarOpen ? 240 : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: 240,
                  boxSizing: 'border-box',
                  position: 'relative',
                  height: '100%',
                  borderRight: `1px solid ${theme.palette.divider}`
                },
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
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
          <Container component="main" sx={{ 
            flexGrow: 1, 
            p: 3, 
            width: { md: sidebarOpen ? `calc(100% - 240px)` : '100%' },
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}>
            <Toolbar sx={{ display: { md: 'none' } }} />
            {children}
          </Container>
        </Box>
        
        <Footer footerLinks={data.site.siteMetadata.footerLinks} />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
