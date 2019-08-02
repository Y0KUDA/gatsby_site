import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { toggleSidebar } from "../../store";
import { Container, Label, Menu, Icon, Header } from "semantic-ui-react";
import { MenuProps } from "../Menu";

interface HeaderMenuProps extends MenuProps {
  dispatch?: Dispatch<any>;
  inverted?: boolean;
}

export const HeaderMenu = ({ items, pathname, Link, inverted, dispatch }: HeaderMenuProps) =>
  <Container>
    <Link to="/">
      <Header as="h1" style = {{ margin: "1rem 0 1rem 0" }}>
        <Icon name="rocket" />
        <Header.Content>My Awesome Blog (仮)</Header.Content>
        <Header.Subheader>　　　The lack of money is the root of all evil.</Header.Subheader>
      </Header>
    </Link>
    <Menu size="large" pointing secondary inverted={inverted}>
      <Menu.Item as="a" className="mobile only" icon="sidebar"  onClick={() => dispatch && dispatch(toggleSidebar())} />
      {items.map((item) => {
        const active = (item.exact) ? pathname === item.path : pathname.startsWith(item.path);
        return <Menu.Item
          as={Link}
          className="mobile hidden"
          icon={item.icon}
          name={item.name}
          to={item.path}
          key={item.path}
          active={active}
        />;
      })}
    </Menu>
  </Container>;

export default connect()(HeaderMenu);
