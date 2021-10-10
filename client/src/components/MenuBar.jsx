import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const user = null;

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const logout = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="purple">
      <Menu.Item name={user.username} active as={Link} to="/" />

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="purple">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Item
        name="class-story"
        active={activeItem === "class-story"}
        onClick={handleItemClick}
        as={Link}
        to="/class-story"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="sign-in"
          active={activeItem === "sign-in"}
          onClick={handleItemClick}
          as={Link}
          to="/auth"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
