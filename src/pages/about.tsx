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
  Popup,
} from "semantic-ui-react";
import { withLayout } from "../components/Layout";
import MyCard from "../components/MyCard";

const Logos = [
  {
    img : require("./img/cpp.png"),
    link : "https://ja.wikipedia.org/wiki/C%2B%2B",
    popup : "C++",
  }, {
    img : require("./img/csharp.png"),
    link : "https://ja.wikipedia.org/wiki/C_Sharp",
    popup : "C#",
  }, {
    img : require("./img/lua.png"),
    link : "https://ja.wikipedia.org/wiki/Lua",
    popup : "Lua",
  }, {
    img : require("./img/powershell.png"),
    link : "https://ja.wikipedia.org/wiki/PowerShell",
    popup : "Powershell",
  }, {
    img : require("./img/python.png"),
    link : "https://ja.wikipedia.org/wiki/Python",
    popup : "Python",
  }, {
    img : require("./img/r.png"),
    link : "https://ja.wikipedia.org/wiki/R%E8%A8%80%E8%AA%9E",
    popup : "R",
  }, {
    img : require("./img/ruby.png"),
    link : "https://ja.wikipedia.org/wiki/Ruby",
    popup : "Ruby",
  }, {
    img : require("./img/ts.png"),
    link : "https://ja.wikipedia.org/wiki/TypeScript",
    popup : "TypeScript",
  }, {
    img : require("./img/julia.png"),
    link : "https://ja.wikipedia.org/wiki/Julia_(%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E8%A8%80%E8%AA%9E)",
    popup : "Julia",
  }, {
    img : require("./img/java.png"),
    link : "https://ja.wikipedia.org/wiki/Java",
    popup : "Java",
  }, {
    img : require("./img/circleci.png"),
    link : "https://circleci.com/",
    popup : "CircleCI",
  }, {
    img : require("./img/docker.png"),
    link : "https://ja.wikipedia.org/wiki/Docker",
    popup : "Docker",
  }, {
    img : require("./img/drone.png"),
    link : "https://drone.io/",
    popup : "Drone CI",
  }, {
    img : require("./img/git.png"),
    link : "https://ja.wikipedia.org/wiki/Git",
    popup : "Git",
  }, {
    img : require("./img/github.png"),
    link : "https://ja.wikipedia.org/wiki/GitHub",
    popup : "GitHub",
  }, {
    img : require("./img/jenkins.png"),
    link : "https://ja.wikipedia.org/wiki/Jenkins",
    popup : "Jenkins",
  }, {
    img : require("./img/jupyter.png"),
    link : "https://en.wikipedia.org/wiki/Project_Jupyter",
    popup : "Jupyter Notebook",
  }, {
    img : require("./img/linux.png"),
    link : "https://ja.wikipedia.org/wiki/Linux",
    popup : "Linux",
  }, {
    img : require("./img/react.png"),
    link : "https://ja.wikipedia.org/wiki/React",
    popup : "React",
  }, {
    img : require("./img/nodejs.png"),
    link : "https://ja.wikipedia.org/wiki/Node.js",
    popup : "Node.js",
  }, {
    img : require("./img/azure.png"),
    link : "https://ja.wikipedia.org/wiki/Microsoft_Azure",
    popup : "Microsoft Azure",
  }, {
    img : require("./img/databricks.jpg"),
    link : "https://en.wikipedia.org/wiki/Databricks",
    popup : "Databricks",
  }, {
    img : require("./img/postogresql.png"),
    link : "https://ja.wikipedia.org/wiki/PostgreSQL",
    popup : "PostgreSQL",
  }, {
    img : require("./img/sql_datawarehouse.png"),
    link : "https://docs.microsoft.com/ja-jp/azure/sql-data-warehouse/",
    popup : "Azure SQL Data Warehouse",
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
                  <Popup content={logo.popup}
                    trigger={<Image src={logo.img} href={logo.link} target="_blank"/>}/>,
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
