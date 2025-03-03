/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Pristine`,
    description: `Pristine Gatsby Theme`,
    author: ``,
    logoUrl: ``,
    primaryColor: `#663399`,
    primaryColorDark: `#542c85`,
    secondaryColor: `#ff6b6b`,
    secondaryColorDark: `#e05252`,
    menuLinks: [
      {
        name: 'Home',
        link: '/',
      },
      {
        name: 'Sample',
        link: '/sample/',
      },
    ],
    footerLinks: [
      {
        name: 'GitHub',
        link: 'https://github.com/open-rpc/gatsby-openrpc-theme',
      },
      {
        name: 'OpenRPC',
        link: 'https://open-rpc.org',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-openrpc-theme`,
        short_name: `openrpc`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/open-rpc-icon.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
