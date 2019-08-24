import * as React from "react";
import { useRef } from "react";
import { Link } from "gatsby";
import { get } from "lodash";
import "../css/markdown-style.css";
import "../css/styles.css";
import "../css/semantic.min.css";
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
import { withLayout, LayoutProps } from "../components/Layout";
import { graphql } from "gatsby";
import { TwitterTimelineEmbed } from "react-twitter-embed";

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

  const disqusShortName = "unearned-in-com";
  const disqusConfig = {
    identifier: props.data.post.fields.slug,
    title: props.data.post.frontmatter.title,
    url: "https://unearned-in.com" + props.data.post.fields.slug,
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

      <Grid columns={3} padded style={{ justifyContent: "space-around" }}>
        <div className="tablet hidden mobile hidden" style={{ maxWidth: 300 }}>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="Y0KUDA"
            options={{height: 1200}}
          />
        </div>
        <Ref innerRef={contextRef}>
          <div style={{ maxWidth: 800, minWidth: 200 }}>
            <Header
              as="h1"
              className="titleStyle"
            >
              {frontmatter.title}
            </Header>
            <Segment vertical>{tags}</Segment>
            <Image {...cover} fluid />
            <Segment
              vertical
              className="ui celled padded table mdstyle"
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </div>
        </Ref>
        {/* Don't change Grid.Column to div. Sticky won't work. */}
        <Grid.Column className="tablet hidden mobile hidden" style={{ maxWidth: 300 }}>
          <MyCard/>
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
              <div className="Demo__container">
                  <div className="Demo__some-network">
                    <FacebookShareButton
                      url={
                        "https://unearned-in.com" + props.data.post.fields.slug
                      }
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <TwitterShareButton
                      url={
                        "https://unearned-in.com" + props.data.post.fields.slug
                      }
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <RedditShareButton
                      url={
                        "https://unearned-in.com" + props.data.post.fields.slug
                      }
                    >
                      <RedditIcon size={32} round />
                    </RedditShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <LinkedinShareButton
                      url={
                        "https://unearned-in.com" + props.data.post.fields.slug
                      }
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </div>
                  <div className="Demo__some-network">
                    <TumblrShareButton
                      url={
                        "https://unearned-in.com" + props.data.post.fields.slug
                      }
                    >
                      <TumblrIcon size={32} round />
                    </TumblrShareButton>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </Sticky>
        </Grid.Column>
      </Grid>

      <Segment.Group className="tablet only mobile only computer only">
        <Segment>
          <Header as="h3">Share</Header>
        </Segment>
        <Segment>
          <div className="Demo__container">
            <div className="Demo__some-network">
              <FacebookShareButton
                url={"https://unearned-in.com" + props.data.post.fields.slug}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
            <div className="Demo__some-network">
              <TwitterShareButton
                url={"https://unearned-in.com" + props.data.post.fields.slug}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <div className="Demo__some-network">
              <RedditShareButton
                url={"https://unearned-in.com" + props.data.post.fields.slug}
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>
            <div className="Demo__some-network">
              <LinkedinShareButton
                url={"https://unearned-in.com" + props.data.post.fields.slug}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
            <div className="Demo__some-network">
              <TumblrShareButton
                url={"https://unearned-in.com" + props.data.post.fields.slug}
              >
                <TumblrIcon size={32} round />
              </TumblrShareButton>
            </div>
          </div>
        </Segment>
      </Segment.Group>

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

export default withLayout(BlogPostPage);

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
