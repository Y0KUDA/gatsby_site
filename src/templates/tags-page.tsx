import * as React from "react";
import Blog from "../pages/index";
import { graphql } from "gatsby";

export default Blog;

export const pageQuery = graphql`
query TemplateTagPage($tag: String) {
  # Get tags
  tags: allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}}) {
    group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
  }

  # Get posts
  posts: allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___updatedDate] },
    filter: {
      frontmatter: {
        draft: { ne: true }
        tags: { in: [$tag] }
      },
      fileAbsolutePath: { regex: "/blog/" }
    }
  ) {
    totalCount
    edges {
      node {
        excerpt
        timeToRead
        fields {
          slug
        }
        frontmatter {
          title
          updatedDate(formatString: "DD MMMM, YYYY")
          image {
          	children {
              ... on ImageSharp {
                fixed(width: 700, height: 100) {
                  src
                  srcSet
                }
              }
            }
          }
          author {
            id
            bio
            twitter
            email
            github
            qiita
            atcoder
            kaggle
            lapras
            vsmarket
            avatar {
              children {
                ... on ImageSharp {
                  fixed(width: 150, height: 150, quality: 100) {
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
