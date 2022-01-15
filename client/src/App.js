import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ClassStory from "./Pages/ClassStory";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";
import Auth from "./Pages/Auth";
import SinglePost from "./Pages/SinglePost";
import StudentMarket from "./Pages/StudentMarket";
import MyAccount from "./Pages/MyAccount";
import TestBigHead from "./Pages/TestBigHead";
import PrivateRoute from "./utils/PrivateRoute";
import "./style/App.css";
import "./style/Auth.css";
import "./style/Home.css";
import "./style/Class-Story.css";
import "./style/Market.css";
import "./style/MyAccount.css";

function App() {
  return (
    <BrowserRouter>
      <MenuBar />
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/class-story" component={ClassStory} />
        <PrivateRoute
          exact
          path="/market"
          component={(props) => <StudentMarket {...props} />}
        />
        <PrivateRoute exact path="/my-account" component={MyAccount} />
        <PrivateRoute exact path="/posts/:postId" component={SinglePost} />
        <PrivateRoute exact path="/test" component={TestBigHead} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
