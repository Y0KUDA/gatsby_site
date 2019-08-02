import * as React from "react";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { Header, Grid, Card, List, Container, Feed, Segment, Comment } from "semantic-ui-react";
import { MarkdownRemarkConnection, ImageSharp } from "../graphql-types";
import TagsCard from "../components/TagsCard/TagsCard";
import BlogPagination from "../components/BlogPagination/BlogPagination";
import { get } from "lodash";
import {withLayout, LayoutProps} from "../components/Layout";
import { MarkdownRemark } from "../graphql-types";
import MyCard from "../components/MyCard";

interface BlogProps extends LayoutProps {
  data: {
    tags: MarkdownRemarkConnection;
    posts: MarkdownRemarkConnection;
  };
  pageContext: {
    tag?: string; // only set into `templates/tags-pages.tsx`
  };
}

const BlogPage = (props: BlogProps) => {
  const tags = props.data.tags.group;
  const posts = props.data.posts.edges;
  const { pathname } = props.location;
  const pageCount = Math.ceil(props.data.posts.totalCount / 10);

  // TODO export posts in a proper component
  const Posts = (
    <Container>
      {posts.map(({ node }: {node: MarkdownRemark}) => {
        const { frontmatter, timeToRead, fields: { slug }, excerpt } = node;
        const avatar = frontmatter.author.avatar.children[0] as ImageSharp;
        const cover = get(frontmatter, "image.children.0.fixed", {});

        const extra = (
          <Comment.Group>
            <Comment>
              <Comment.Content>
                <Comment.Metadata style={{ margin: 0 }}>
                  {frontmatter.updatedDate} - {timeToRead} min read
              </Comment.Metadata>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        );

        const description = (
          <Card.Description>
            {excerpt}
            <br />
            <Link to={slug}>Read more…</Link>
          </Card.Description>
        );

        return (
          <Card key={slug}
            fluid
            image={cover}
            header={frontmatter.title}
            extra={extra}
            description={description}
          />
        );
      })}
    </Container>
  );

  const author = props.data.posts.edges[0].node.frontmatter.author;
  const avatar = author.avatar.children[0] as ImageSharp;
  return (
    <Container>
      {/* Title */}

      {/* Content */}
      <Segment vertical>
        <Grid padded style={{ justifyContent: "space-around" }}>
          <div style={{ maxWidth: 600 }}>
            {Posts}
            <Segment vertical textAlign="center">
              <BlogPagination Link={Link} pathname={pathname} pageCount={pageCount} />
            </Segment>
          </div>
          <div>
            <MyCard avatar={avatar.fixed.srcSet}
                    id={author.id}
                    bio={author.bio}
                    email={author.email}
                    twitter={author.twitter}
                    github={author.github}
                    qiita={author.qiita}
                    atcoder={author.atcoder}
                    kaggle={author.kaggle}
                    lapras={author.lapras}
                    vsmarket={author.vsmarket}
                    npm={author.npm}
                    />
            <TagsCard Link={Link} tags={tags} tag={props.pageContext.tag} />
          </div>
        </Grid>
      </Segment>
    </Container>
  );
};

export default withLayout(BlogPage);

export const pageQuery = graphql`
query PageBlog {
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
      frontmatter: { draft: { ne: true } },
      fileAbsolutePath: { regex: "/blog/" }
    },
    limit: 10
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
            npm
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
