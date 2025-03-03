import React from 'react';
import { Link } from 'gatsby';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface NextAndPrevProps {
  next?: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
  prev?: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
    };
  };
}

const NextAndPrev: React.FC<NextAndPrevProps> = ({ next, prev }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  if (!next && !prev) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 6,
        pt: 2,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          {prev && (
            <Button
              component={Link}
              to={prev.fields.slug}
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              color="primary"
              sx={{
                textAlign: 'left',
                justifyContent: 'flex-start',
                width: '100%',
                height: '100%',
                p: 2,
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <Box>
                <Typography variant="caption" display="block" color="text.secondary">
                  Previous
                </Typography>
                <Typography variant="body2" noWrap>
                  {prev.frontmatter.title}
                </Typography>
              </Box>
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {next && (
            <Button
              component={Link}
              to={next.fields.slug}
              endIcon={<ArrowForwardIcon />}
              variant="outlined"
              color="primary"
              sx={{
                textAlign: 'right',
                justifyContent: 'flex-end',
                width: '100%',
                height: '100%',
                p: 2,
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <Box>
                <Typography variant="caption" display="block" color="text.secondary">
                  Next
                </Typography>
                <Typography variant="body2" noWrap>
                  {next.frontmatter.title}
                </Typography>
              </Box>
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default NextAndPrev;
