import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { Typography, Box, Paper } from '@mui/material';
import NextAndPrev from '../components/NextAndPrev';

// Define components for MDX
const components = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <Typography variant="h2" {...props} />,
  h3: (props: any) => <Typography variant="h3" {...props} />,
  h4: (props: any) => <Typography variant="h4" {...props} />,
  h5: (props: any) => <Typography variant="h5" {...props} />,
  h6: (props: any) => <Typography variant="h6" {...props} />,
  p: (props: any) => <Typography paragraph {...props} />,
  a: (props: any) => <Link {...props} />,
  pre: (props: any) => (
    <Box
      component="pre"
      sx={{ overflowX: 'auto', p: 2, bgcolor: 'background.paper', borderRadius: 1, mb: 2 }}
      {...props}
    />
  ),
  code: (props: any) => (
    <Box component="code" sx={{ fontFamily: 'monospace', p: 0.5, borderRadius: 0.5 }} {...props} />
  ),
  // Add more component mappings as needed
};
/* eslint-enable @typescript-eslint/no-explicit-any */

interface DefaultTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
      };
    };
  };
  children: React.ReactNode;
  pageContext: {
    slug: string;
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
  };
}

const DefaultTemplate = ({ children, pageContext }: DefaultTemplateProps) => {
  return (
    <>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <MDXProvider components={components}>{children}</MDXProvider>
        <NextAndPrev next={pageContext.next} prev={pageContext.prev} />
      </Paper>
    </>
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`;

export default DefaultTemplate;
