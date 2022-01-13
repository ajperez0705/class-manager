import React, { useState, useContext, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = (e) => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // JWT...
    if (token) {
      const decodedToken = decode(token);

      // If the token has passed 1hr, then logout
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" inverted>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/home"
      />
      <Menu.Item
        name="class-story"
        active={activeItem === "class-story"}
        onClick={handleItemClick}
        as={Link}
        to="/class-story"
      />

      <Menu.Item
        name="market"
        active={activeItem === "market"}
        onClick={handleItemClick}
        as={Link}
        to="/market"
      />
      <Menu.Item
        name="my-account"
        active={activeItem === "my-account"}
        onClick={handleItemClick}
        as={Link}
        to="/my-account"
      />

      <Menu.Menu position="right">
        <Menu.Item className="menu-bar_welcome">
          Hello, {user.result.username}
        </Menu.Item>
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : null;
  // <Menu pointing secondary size="massive" color="purple">
  //   <Menu.Item
  //     name="home"
  //     active={activeItem === "home"}
  //     onClick={handleItemClick}
  //     as={Link}
  //     to="/"
  //   />

  //   <Menu.Item
  //     name="class-story"
  //     active={activeItem === "class-story"}
  //     onClick={handleItemClick}
  //     as={Link}
  //     to="/class-story"
  //   />

  //   <Menu.Menu position="right">
  //     {user ? (
  //       <Menu.Item
  //         name="sign-in"
  //         active={activeItem === "sign-in"}
  //         onClick={handleItemClick}
  //         as={Link}
  //         to="/auth"
  //       />
  //     ) : (
  //       <Menu.Item
  //         name="login"
  //         active={activeItem === "login"}
  //         onClick={handleItemClick}
  //         as={Link}
  //         to="/auth"
  //       />
  //     )}
  //   </Menu.Menu>
  // </Menu>

  return menuBar;
}

export default MenuBar;
