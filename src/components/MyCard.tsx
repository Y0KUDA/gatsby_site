import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Card, Icon, Image } from "semantic-ui-react";
import qiitaIcon from "../extra_icon/qiita.ico";
import atcoderIcon from "../extra_icon/atcoder.png";
import githubIcon from "../extra_icon/github.ico";
import kaggleIcon from "../extra_icon/kaggle.ico";
import laprasIcon from "../extra_icon/lapras.ico";
import twitterIcon from "../extra_icon/twitter.ico";
import vsmarketIcon from "../extra_icon/vsmarket.ico";
import npmIcon from "../extra_icon/npm.png";
import HLM from "react-hlm";

const MyCardProp = (props: {
  id?: string;
  bio?: string;
  avatar?: string;
  email?: string;
  twitter?: string;
  github?: string;
  qiita?: string;
  atcoder?: string;
  kaggle?: string;
  lapras?: string;
  vsmarket?: string;
  npm?: string;
}) => {
  return (
    <Card>
      <Image srcSet={props.avatar} wrapped ui={false} />
      <Card.Content>
        {props.id ? (
          <Card.Header>
            <HLM.Banner text={props.id}
                        rotationSpeed={1}
                        distanceMax={1}
                        distanceMin={0.3}
                        spring="none"
                        style={{fontSize: 35}}/>{"  "}
            <Link to="/about/" style={{top: -25, position: "relative"}}>
              {"　"}<Icon name="info circle" color="black" />
            </Link>
          </Card.Header>
        ) : null}
        {props.email ? (
          <Card.Meta>
            <Icon name="mail" size="small" />
            {props.email}
          </Card.Meta>
        ) : null}
        {props.bio ? <Card.Description>{props.bio}</Card.Description> : null}
      </Card.Content>
      <Card.Content extra>
        {props.twitter ? (
          <a href={props.twitter} target="_blank">
            <Icon.Group style={{ margin: "0.2rem 0.2rem 0.2rem 0.2rem" }}>
              <Icon />
              <Image src={twitterIcon} width={20} height={20} />
            </Icon.Group>
          </a>
        ) : null}
        {props.github ? (
          <a href={props.github} target="_blank">
            <Icon.Group style={{ margin: "0.2rem 0.2rem 0.2rem 0.2rem" }}>
              <Icon />
              <Image src={githubIcon} width={20} height={20} />
            </Icon.Group>
          </a>
        ) : null}
        {props.qiita ? (
          <a href={props.qiita} target="_blank">
            <Icon.Group style={{ margin: "0.2rem 0.2rem 0.2rem 0.2rem" }}>
              <Icon />
              <Image src={qiitaIcon} width={20} height={20} />
            </Icon.Group>
          </a>
        ) : null}
        {props.atcoder ? (
          <a href={props.atcoder} target="_blank">
            <Icon.Group style={{ margin: "0.2rem 0.2rem 0.2rem 0.2rem" }}>
              <Icon />
              <Image src={atcoderIcon} width={20} height={20} />
            </Icon.Group>
          </a>
        ) : null}
        {props.kaggle ? (
          <a href={props.kaggle} target="_blank">
            <Icon.Group style={{ margin: "0.2rem 0.2rem 0.2rem 0.2rem" }}>
              <Icon />
              <Image src={kaggleIcon} width={20} height={20} />
            </Icon.Group>
          </a>
        ) : null}
        {props.lapras ? (
          <a href={props.lapras} target="_blank">
            <Icon.Group style={{ margin: "0.2rem 0.2rem 0.2rem 0.2rem" }}>
              <Icon />
              <Image src={laprasIcon} width={20} height={20} />
            </Icon.Group>
          </a>
        ) : null}
        {props.vsmarket ? (
          <a href={props.vsmarket} target="_blank">
            <Icon.Group style={{ margin: "0.2rem 0.2rem 0.2rem 0.2rem" }}>
              <Icon />
              <Image src={vsmarketIcon} width={20} height={20} />
            </Icon.Group>
          </a>
        ) : null}
        {props.npm ? (
          <a href={props.npm} target="_blank">
            <Icon.Group style={{ margin: "0.2rem 0.2rem 0.2rem 0.2rem" }}>
              <Icon />
              <Image src={npmIcon} width={20} height={20} />
            </Icon.Group>
          </a>
        ) : null}
      </Card.Content>
    </Card>
  );
};

const MyCard = () => {
  const data = useStaticQuery(graphql`
    query MyCardQuery {
      authorJson {
        atcoder
        bio
        email
        github
        id
        kaggle
        lapras
        npm
        qiita
        twitter
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
  `);
  const avatar = data.authorJson.avatar.children[0];
  return <MyCardProp
      avatar={avatar.fixed.srcSet}
      id={data.authorJson.id}
      bio={data.authorJson.bio}
      email={data.authorJson.email}
      twitter={data.authorJson.twitter}
      github={data.authorJson.github}
      qiita={data.authorJson.qiita}
      atcoder={data.authorJson.atcoder}
      kaggle={data.authorJson.kaggle}
      lapras={data.authorJson.lapras}
      vsmarket={data.authorJson.vsmarket}
      npm={data.authorJson.npm}
    />;
};

export default MyCard;
