import * as React from "react";
import { graphql } from "gatsby";
import { MarkdownRemarkConnection, ImageSharp } from "../graphql-types";
import {
  Header,
  Container,
  Segment,
  Icon,
  Grid,
  Image,
} from "semantic-ui-react";
import { withLayout } from "../components/Layout";
import MyCard from "../components/MyCard";

const Logos = [
  {
    caption : "C++",
    img : require("./img/cpp.png"),
    link : "https://ja.wikipedia.org/wiki/C%2B%2B",
  }, {
    caption : "C#",
    img : require("./img/csharp.png"),
    link : "https://ja.wikipedia.org/wiki/C_Sharp",
  }, {
    caption : "",
    img : require("./img/lua.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/powershell.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/python.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/r.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/ruby.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/ts.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/julia.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/java.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/circleci.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/docker.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/drone.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/git.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/github.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/jenkins.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/jupyter.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/linux.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/react.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/nodejs.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/azure.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/databricks.jpg"),
    link : "",
  }, {
    caption : "",
    img : require("./img/postogresql.png"),
    link : "",
  }, {
    caption : "",
    img : require("./img/sql_datawarehouse.png"),
    link : "",
  },
];

const AboutPage = (props: any) => {
  const author = props.data.posts.edges[0].node.frontmatter.author;
  const avatar = author.avatar.children[0] as ImageSharp;
  return (
    <Container>
      <Segment vertical>
        <Header as="h2">
          <Icon name="info circle" />
          <Header.Content>About</Header.Content>
        </Header>
      </Segment>
      <Segment vertical>
        <Grid padded style={{ justifyContent: "space-around" }}>
          <div style={{ maxWidth: 600 }}>
            <Segment vertical>
              <p>IT系何でも屋さんを目指しています。</p>
              <p>今は東京のデータ系ITベンチャー企業で働いています。</p>
              <p>前職は某社でCADソフトウェアを作ってました。</p>
              <p>あと、投資もします。年収1000万を目指しています。</p>
              <Image.Group size="tiny">
                {Logos.map((logo) =>
                  <Image src={logo.img} />,
                )}
              </Image.Group>
              <Header as="h3">Contact</Header>
                <p>ご連絡、お仕事の依頼はこちらまで。</p>
                <Icon name="mail" size="small" />{"ykd.engineer@gmail.com"}<br/>
                <Icon name="twitter" size="small" />{"https://twitter.com/Y0KUDA"}
              <Header as="h3">Special Thanks</Header>
              このサイトは @fabien0102 さんが管理している
              <a
                href="https://github.com/fabien0102/gatsby-starter"
                target="_blank"
              >
                gatsby-starter
              </a>
              をフォークして作成しました。
            </Segment>
          </div>
          <div>
            <MyCard/>
          </div>
        </Grid>
      </Segment>
    </Container>
  );
};

export default withLayout(AboutPage);

export const pageQuery = graphql`
  query aboutMe {
    # Get posts
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/blog/" }
      }
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
