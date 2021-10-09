import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ClassStory from "./Pages/ClassStory";
import "./App.css";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Route exact path="/class-story" component={ClassStory} />
      </Container>
    </BrowserRouter>
  );
}

export default App;
