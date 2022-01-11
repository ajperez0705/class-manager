import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ClassStory from "./Pages/ClassStory";
import "./style/App.css";
import "./style/Auth.css";
import "./style/Home.css";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";
import Auth from "./Pages/Auth";
import SinglePost from "./Pages/SinglePost";
import StudentMarket from "./Pages/StudentMarket";
import MyAccount from "./Pages/MyAccount";
import TestBigHead from "./Pages/TestBigHead";

function App() {
  return (
    <BrowserRouter>
      <Container className="menu-bar">
        <MenuBar />
      </Container>

      <Switch>
        <Route exact path="/" component={Auth} />
        <Container>
          <Route exact path="/home" component={Home} />
          <Route exact path="/class-story" component={ClassStory} />
          <Route
            exact
            path="/market"
            render={(props) => <StudentMarket {...props} />}
          />
          <Route exact path="/my-account" component={MyAccount} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/test" component={TestBigHead} />
        </Container>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
