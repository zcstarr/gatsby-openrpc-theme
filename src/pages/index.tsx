import React from 'react';
import { graphql, Link } from 'gatsby';
import { Typography, Box, Button, Grid, Card, CardContent, CardActions } from '@mui/material';

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
      };
    };
    allMdx: {
      edges: Array<{
        node: {
          id: string;
          fields: {
            slug: string;
          };
          frontmatter: {
            title: string;
          };
        };
      }>;
    };
  };
}

const IndexPage = ({ data }: IndexPageProps) => {
  const { title, description } = data.site.siteMetadata;
  const posts = data.allMdx.edges;

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="p" color="textSecondary" paragraph>
          {description}
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/sample/" sx={{ mt: 2 }}>
          View Sample Page
        </Button>
      </Box>

      {posts.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h2" gutterBottom>
            Documentation
          </Typography>
          <Grid container spacing={3}>
            {posts.map(({ node }) => (
              <Grid item xs={12} sm={6} md={4} key={node.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {node.frontmatter.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} to={node.fields.slug}>
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
