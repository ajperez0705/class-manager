import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ClassStory from "./Pages/ClassStory";
import "./App.css";
import { Container, Button } from "semantic-ui-react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MenuBar from "./components/MenuBar";
import Auth from "./Pages/Auth";
import SinglePost from "./Pages/SinglePost";
import StudentMarket from "./Pages/StudentMarket";
import MyAccount from "./Pages/MyAccount";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/class-story" component={ClassStory} />
          <Route
            exact
            path="/market"
            render={(props) => <StudentMarket {...props} />}
          />
          <Route exact path="/my-account" component={MyAccount} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
