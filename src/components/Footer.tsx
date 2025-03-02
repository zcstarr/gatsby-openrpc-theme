import React from 'react';
import { Box, Container, Typography, Link, useTheme } from '@mui/material';

export interface FooterProps {
  footerLinks?: Array<{
    name: string;
    link: string;
  }>;
}

const Footer = ({ footerLinks }: FooterProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: isDarkMode ? theme.palette.grey[900] : theme.palette.grey[200]
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()}{' '}
          <Link color="inherit" href="https://open-rpc.org/">
            OpenRPC
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Documentation built with{' '}
          <Link color="inherit" href="https://www.gatsbyjs.com/">
            Gatsby
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
