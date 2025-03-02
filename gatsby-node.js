/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");
const _ = require("lodash");

// Add schema customization to ensure fields and frontmatter exist
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SiteSiteMetadata {
      title: String
      description: String
      author: String
      logoUrl: String
      primaryColor: String
      primaryColorDark: String
      secondaryColor: String
      secondaryColorDark: String
      menuLinks: [MenuLink]
      footerLinks: [FooterLink]
    }
    
    type MenuLink {
      name: String
      link: String
      ignoreNextPrev: Boolean
    }
    
    type FooterLink {
      name: String
      link: String
    }
    
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: MdxFields
    }
    
    type MdxFrontmatter {
      title: String
    }
    
    type MdxFields {
      slug: String
    }
  `;
  createTypes(typeDefs);
};

function findDoc(doc) {
  if (!doc.link) return null
  return (
    doc.link === this.link ||
    doc.link === this.link.substring(0, this.link.length - 1)
  )
}

function getSibling(index, list, direction) {
  if (direction === `next`) {
    const next = index === list.length - 1 ? null : list[index + 1]
    return next
  } else if (direction === `prev`) {
    const prev = index === 0 ? null : list[index - 1]
    return prev
  } else {
    return null
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  
  // Dynamically import slash
  const { default: slash } = await import('slash');
  const defaultTemplate = path.resolve(__dirname, "src/templates/default.tsx");

  // Update GraphQL query syntax for Gatsby v5
  const result = await graphql(`
    query {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
            ignoreNextPrev
          }
        }
      }
      allMdx {
        edges {
          node {
            id
            internal {
              contentFilePath
            }
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
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
    return;
  }

  // Create pages from MDX files
  const allPages = result.data?.allMdx?.edges || [];
  const links = result.data?.site?.siteMetadata?.menuLinks || [];
  
  allPages.forEach(({ node }) => {
    const slug = _.get(node, `fields.slug`);
    if (!slug) return;
    
    const docIndex = links.findIndex(findDoc, { link: slug });
    let nextAndPrev = {}
    
    if (docIndex > -1) {
      nextAndPrev.prev = links[docIndex - 1] || null;
      nextAndPrev.next = links[docIndex + 1] || null;
    }
    
    if (nextAndPrev.prev && nextAndPrev.prev.ignoreNextPrev) {
      delete nextAndPrev.prev;
    }
    if (nextAndPrev.next && nextAndPrev.next.ignoreNextPrev) {
      delete nextAndPrev.next;
    }
    
    createPage({
      path: `${node.fields.slug}`,
      component: slash(defaultTemplate),
      context: {
        slug: node.fields.slug,
        ...nextAndPrev,
      },
    });
  });
};

// Create slugs for files
exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  
  if (node.internal.type === `Mdx`) {
    // Dynamically import slash
    const { default: slash } = await import('slash');
    
    const fileNode = getNode(node.parent);
    if (!fileNode) return;
    
    const parsedFilePath = path.parse(fileNode.relativePath || '');
    
    // Use slash to normalize paths
    const slug = slash(`/${parsedFilePath.dir}/${parsedFilePath.name}/`);
    
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

// Support for webpack ESM modules
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        // Add any polyfills needed for Node.js modules
      },
    },
  })
}
