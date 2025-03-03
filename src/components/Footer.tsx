import React from 'react';
import { Box, Container, Typography, Link, useTheme } from '@mui/material';

export interface FooterProps {
  footerLinks?: Array<{
    name: string;
    link: string;
  }>;
  copyrightText?: string;
  copyrightYear?: number;
  organizationName?: string;
  organizationUrl?: string;
  builtWithText?: string;
  builtWithName?: string;
  builtWithUrl?: string;
}

const Footer = ({
  footerLinks = [],
  copyrightYear = new Date().getFullYear(),
  copyrightText = '©',
  organizationName = 'OpenRPC',
  organizationUrl = 'https://open-rpc.org/',
  builtWithText = 'Documentation built with',
  builtWithName = 'Gatsby',
  builtWithUrl = 'https://www.gatsbyjs.com/',
}: FooterProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: isDarkMode ? theme.palette.grey[900] : theme.palette.grey[200],
      }}
    >
      <Container maxWidth="sm">
        {footerLinks.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
            {footerLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.link}
                  color="inherit"
                  sx={{
                    mx: 1,
                    color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
                  }}
                >
                  {link.name}
                </Link>
                {index < footerLinks.length - 1 && (
                  <Typography
                    component="span"
                    color={isDarkMode ? 'text.secondary' : 'text.primary'}
                    sx={{ mx: 0.5 }}
                  >
                    •
                  </Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}
        <Typography variant="body2" color="text.secondary" align="center">
          {copyrightText} {copyrightYear}{' '}
          <Link
            color="inherit"
            href={organizationUrl}
            sx={{
              color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
            }}
          >
            {organizationName}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {builtWithText}{' '}
          <Link
            color="inherit"
            href={builtWithUrl}
            sx={{
              color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark,
            }}
          >
            {builtWithName}
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
