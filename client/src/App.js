import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ClassStory from "./Pages/ClassStory";
import "./App.css";
import { Container } from "semantic-ui-react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MenuBar from "./components/MenuBar";
import Auth from "./Pages/Auth";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route exact path="/register" component={Register} /> */}
          <Route exact path="/class-story" component={ClassStory} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
