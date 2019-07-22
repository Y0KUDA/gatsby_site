import * as React from "react";
import { useRef } from "react";
import { Link } from "gatsby";
import { get } from "lodash";
import "../css/markdown-style.css";
import {
  Header,
  Container,
  Segment,
  Sticky,
  Icon,
  Label,
  Button,
  Grid,
  Card,
  Image,
  Item,
  Comment,
  Ref,
} from "semantic-ui-react";
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TumblrShareButton,
  TumblrIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import {
  MarkdownRemark,
  ImageSharp,
  MarkdownRemarkConnection,
  Site,
} from "../graphql-types";
import MyCard from "../components/MyCard";
import { DiscussionEmbed } from "disqus-react";
import { withLayout, withCardLayout, LayoutProps } from "../components/Layout";
import { graphql } from "gatsby";

interface BlogPostProps extends LayoutProps {
  data: {
    post: MarkdownRemark;
    recents: MarkdownRemarkConnection;
    site: Site;
  };
}

const BlogPostPage = (props: BlogPostProps) => {
  const { frontmatter, html, timeToRead, tableOfContents } = props.data.post;
  const avatar = frontmatter.author.avatar.children[0] as ImageSharp;

  const tags = props.data.post.frontmatter.tags.map((tag) => (
    <Label key={tag}>
      <Link to={`/blog/tags/${tag}/`}>{tag}</Link>
    </Label>
  ));

  const recents = props.data.recents.edges.map(({ node }) => {
    const recentAvatar = node.frontmatter.author.avatar
      .children[0] as ImageSharp;
    const recentCover = get(node, "frontmatter.image.children.0.fixed", {});
    const extra = (
      <Comment.Group>
        <Comment>
          <Comment.Avatar
            src={recentAvatar.fixed.src}
            srcSet={recentAvatar.fixed.srcSet}
          />
          <Comment.Content>
            <Comment.Author style={{ fontWeight: 400 }}>
              {node.frontmatter.author.id}
            </Comment.Author>
            <Comment.Metadata style={{ margin: 0 }}>
              {node.timeToRead} min read
            </Comment.Metadata>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    );

    return (
      <div key={node.fields.slug} style={{ paddingBottom: "1em" }}>
        <Card
          as={Link}
          to={node.fields.slug}
          image={recentCover}
          header={node.frontmatter.title}
          extra={extra}
        />
      </div>
    );
  });

  const disqusShortName = "yokuda-test";
  const disqusConfig = {
    identifier: props.data.post.fields.slug,
    title: props.data.post.frontmatter.title,
    url: "http://localhost:8000" + props.data.post.fields.slug,
  };
  const cover = get(frontmatter, "image.children.0.fixed", {});
  const contextRef = useRef(null);
  const author = frontmatter.author;
  return (
    <Container>
      <Segment vertical style={{ border: "none" }}>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Extra>
                {frontmatter.updatedDate} - {timeToRead} min read
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Grid padded style={{ justifyContent: "space-around" }}>
        <Ref innerRef={contextRef}>
          <div style={{ maxWidth: 600 }}>
            <Header
              as="h1"
              className="titleStyle"
            >
              {frontmatter.title}
            </Header>
            <Image {...cover} fluid />
            <Segment
              vertical
              className="mdstyle"
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </div>
        </Ref>
        <Grid.Column className="tablet hidden" width={4}>
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
                  />
          <Sticky context={contextRef}>
            <Card>
              <Card.Content>
                <Card.Header>
                  Index
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <div
                  className="tocStyle"
                  dangerouslySetInnerHTML={{
                    __html: tableOfContents,
                  }}
                />
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header>
                  Share
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid>
                  <Grid.Row columns={5}>
                    <Grid.Column width={2}>
                    <FacebookShareButton url={"https://unearned-in.com" + props.data.post.fields.slug}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <TwitterShareButton url={"https://unearned-in.com" + props.data.post.fields.slug}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <RedditShareButton url={"https://unearned-in.com" + props.data.post.fields.slug}>
                        <RedditIcon size={32} round />
                      </RedditShareButton>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <LinkedinShareButton url={"https://unearned-in.com" + props.data.post.fields.slug}>
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <TumblrShareButton url={"https://unearned-in.com" + props.data.post.fields.slug}>
                        <TumblrIcon size={32} round />
                      </TumblrShareButton>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          </Sticky>
        </Grid.Column>
      </Grid>
      <Segment vertical>{tags}</Segment>
      {props.data.site &&
        props.data.site.siteMetadata &&
        props.data.site.siteMetadata.disqus && (
          <Segment vertical>
            <DiscussionEmbed
              shortname={disqusShortName}
              config={disqusConfig}
            />
          </Segment>
        )}
      <Segment vertical>
        <Grid padded centered>
          {recents}
        </Grid>
      </Segment>
    </Container>
  );
};

export default withCardLayout(BlogPostPage);

export const pageQuery = graphql`
  query TemplateBlogPost($slug: String!) {
    site: site {
      siteMetadata {
        siteUrl
        disqus
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      tableOfContents
      timeToRead
      fields {
        slug
      }
      frontmatter {
        tags
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
        title
        updatedDate(formatString: "MMM D, YYYY")
        description
        image {
          children {
            ... on ImageSharp {
              fixed(width: 900, height: 300, quality: 100) {
                src
                srcSet
              }
            }
          }
        }
      }
    }
    recents: allMarkdownRemark(
      filter: {
        fields: { slug: { ne: $slug } }
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/blog/" }
      }
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      limit: 4
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            image {
              children {
                ... on ImageSharp {
                  fixed(width: 300, height: 100) {
                    src
                    srcSet
                  }
                }
              }
            }
            author {
              id
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(width: 36, height: 36) {
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
