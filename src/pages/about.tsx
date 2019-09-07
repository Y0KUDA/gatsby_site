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

import cppLogo from "./img/cpp.png";
import csLogo from "./img/csharp.png";
import luaLogo from "./img/lua.png";
import poshLogo from "./img/powershell.png";
import pythonLogo from "./img/python.png";
import rLogo from "./img/r.png";
import rubyLogo from "./img/ruby.png";
import tsLogo from "./img/ts.png";
import juliaLogo from "./img/julia.png";
import javaLogo from "./img/java.png";

import circleciLogo from "./img/circleci.png";
import dockerLogo from "./img/docker.png";
import droneciLogo from "./img/drone.png";
import gitLogo from "./img/git.png";
import githubLogo from "./img/github.png";
import jenkinsLogo from "./img/jenkins.png";
import jupyterLogo from "./img/jupyter.png";
import linuxLogo from "./img/linux.png";
import reactLogo from "./img/react.png";
import nodeLogo from "./img/nodejs.png";

import azureLogo from "./img/azure.png";
import databricksLogo from "./img/databricks.jpg";
import postogresqlLogo from "./img/postogresql.png";
import dwhouseLogo from "./img/sql_datawarehouse.png";

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
              <p>何でも屋さんです。</p>
              <p>直近は某社でC++とC#でパッケージソフトウェアを作ってました。</p>
              <Image.Group size="tiny">
                <Image src={cppLogo} />
                <Image src={csLogo} />
                <Image src={luaLogo} />
                <Image src={poshLogo} />
                <Image src={pythonLogo} />
                <Image src={rLogo} />
                <Image src={rubyLogo} />
                <Image src={tsLogo} />
                <Image src={juliaLogo} />
                <Image src={javaLogo} />
                <Image src={circleciLogo} />
                <Image src={dockerLogo} />
                <Image src={droneciLogo} />
                <Image src={gitLogo} />
                <Image src={githubLogo} />
                <Image src={jenkinsLogo} />
                <Image src={jupyterLogo} />
                <Image src={linuxLogo} />
                <Image src={reactLogo} />
                <Image src={nodeLogo} />
                <Image src={azureLogo} />
                <Image src={databricksLogo} />
                <Image src={postogresqlLogo} />
                <Image src={dwhouseLogo} />
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
              をフォークして作成されています。
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
