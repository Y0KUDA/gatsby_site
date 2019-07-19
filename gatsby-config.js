/* eslint-disable quotes */
module.exports = {
  siteMetadata: {
    title: `My Awesome Website`,
    siteUrl: `https://unearned-in.com`,
    googleVerification: `abcdefz`,
    disqus: `gatsby-typescript`
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': `AuthorJson`
  },
  plugins: [
    // Expose `/data` to graphQL layer
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`
      }
    },

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-144161806-1',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true
      }
    },

    // Parse all markdown files (each plugin add/parse some data into graphQL layer)
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-social-cards`,
            options: {
              title: {
                field: "title",
                font: "DejaVuSansCondensed",
                color: "white",
                size: 48,
                style: "bold",
                x: null,
                y: null
              },
              meta: {
                parts: [
                  "- ",
                  {field: "author"},
                  " » ",
                  {field: "date", format: "mmmm dS"}
                ],
                font: "DejaVuSansCondensed",
                color: "white",
                size: 24,
                style: "normal",
                x: null,
                y: null
              },
              background: "black",
              xMargin: 24,
              yMargin: 24
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690,
              backgroundColor: `#f7f0eb`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`
        ]
      }
    },

    // Parse all images files
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // Parse JSON files
    `gatsby-transformer-json`,

    // Add typescript stack into webpack
    `gatsby-plugin-typescript`,

    // This plugin takes your configuration and generates a
    // web manifest file so your website can be added to your
    // homescreen on Android.
    /* eslint-disable camelcase */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby website`,
        short_name: `Gatsby website`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#191919`,
        display: `minimal-ui`,
        icon: "src/favicon.png"
      }
    },
    /* eslint-enable camelcase */

    // This plugin generates a service worker and AppShell
    // html file so the site works offline and is otherwise
    // resistant to bad networks. Works with almost any
    // site!
    `gatsby-plugin-offline`,
    `gatsby-plugin-favicon`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `http://unearned-in.com`,
        stripQueryString: true
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://unearned-in.com',
        sitemap: 'https://unearned-in.com/sitemap.xml',
        policy: [{userAgent: '*', allow: '/'}]
      }
    }
  ]
};
