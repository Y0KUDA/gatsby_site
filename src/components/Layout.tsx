import { Link } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import { Segment, Icon, Container, Sidebar } from "semantic-ui-react";
import "../css/styles.css";
import "../css/responsive.css";
import "../css/semantic.min.css";
import "prismjs/themes/prism-okaidia.css";
import { Provider } from "react-redux";
import { store } from "../store";

export const menuItems = [
  // { name: "Home", path: "/", exact: true, icon: "home", inverted: true },
  { name: "Blog", path: "/", exact: true, icon: "newspaper" },
  { name: "About", path: "/about/", exact: true, icon: "info circle" },
];

export interface LayoutProps {
  location: {
    pathname: string;
  };
  children: any;
  slug?: string;
  title?: string;
  siteUrl?: string;
  description?: string;
}

const Layout = (props: LayoutProps) => {
  const { pathname } = props.location;
  // const isHome = pathname === "/";
  const isHome = false;
  return (
    <Provider store={store}>
      {props.title ? props.siteUrl ? props.slug ?
        <Helmet title={props.title}>
          <meta name="twitter:card" content="summary_large_image" />
            <meta name="og:image" content={`${props.siteUrl}${props.slug}twitter-card.jpg`} />
            <meta property="og:url" content={`${props.siteUrl}${props.slug}`} />
            <meta property="og:title" content={props.title} />
            {props.description ? <meta property="og:description" content={props.description} /> : null}
        </Helmet>
      : null : null : null}
      <Sidebar.Pushable as={Segment} style={{transform: "none"}}>

        <SidebarMenu Link={Link} pathname={pathname} items={menuItems} visible={false} />

        <Sidebar.Pusher style={{ minHeight: "100vh" }}>
          {/* Header */}
          {isHome ? null : <HeaderMenu
            Link={Link}
            pathname={pathname}
            items={menuItems}
          />}

          {/* Render children pages */}
          <div style={{ paddingBottom: 60 }}>
            {props.children}
          </div>

          {/* Footer */}
          <Segment inverted vertical style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <Container textAlign="center">
              <p>Powered with <Icon name="heart" /> by Gatsby 2.0</p>
            </Container>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Provider>
  );
};

export default Layout;

export const withLayout = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
  class WithLayout extends React.Component<P & LayoutProps> {
    render() {
      return (
        <Layout location={this.props.location}
            slug={this.props.data.post ? this.props.data.post.fields.slug : null}
            title={this.props.data.post ? this.props.data.post.frontmatter.title : null}
            siteUrl={this.props.data.site ? this.props.data.site.siteMetadata.siteUrl : null}
            description={this.props.data.post ? this.props.data.post.frontmatter.description : null} >
          <WrappedComponent {...this.props} />
        </Layout>
      );
    }
  };
