import React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Typography, Box, Paper, Button, Divider } from "@mui/material"

// Define components for MDX
const components = {
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <Typography variant="h2" {...props} />,
  h3: (props: any) => <Typography variant="h3" {...props} />,
  h4: (props: any) => <Typography variant="h4" {...props} />,
  h5: (props: any) => <Typography variant="h5" {...props} />,
  h6: (props: any) => <Typography variant="h6" {...props} />,
  p: (props: any) => <Typography paragraph {...props} />,
  a: (props: any) => <Link {...props} />,
}

interface DefaultTemplateProps {
  data: {
    mdx: {
      frontmatter: {
        title: string
      }
    }
  }
  pageContext: {
    prev?: {
      name: string
      link: string
    }
    next?: {
      name: string
      link: string
    }
  }
  children: React.ReactNode
}

const DefaultTemplate = ({ data, pageContext, children }: DefaultTemplateProps) => {
  const { mdx } = data
  const { prev, next } = pageContext

  return (
    <>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          {mdx.frontmatter.title}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <MDXProvider components={components}>
          {children}
        </MDXProvider>
      </Paper>

      {(prev || next) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {prev ? (
            <Button
              component={Link}
              to={prev.link}
              variant="contained"
              color="primary"
            >
              ← {prev.name}
            </Button>
          ) : (
            <div />
          )}
          {next && (
            <Button
              component={Link}
              to={next.link}
              variant="contained"
              color="primary"
            >
              {next.name} →
            </Button>
          )}
        </Box>
      )}
    </>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`

export default DefaultTemplate
