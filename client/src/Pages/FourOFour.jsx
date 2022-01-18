import React from "react";
import { Button, Container, Header, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import fourOFour from "../images/404.png";

function FourOFour() {
  const history = useHistory();

  return (
    <Container className="fourOFour-container">
      <div className="fourOFour-text">
        <Header as="h1" content="404" />
        <Header as="h2" content="Oops, Page Not Found." />
        <p>
          This page does not exist or was removed! We suggest taking you back
          home!
        </p>
        <Button content="Back to Home" onClick={() => history.push("/")} />
      </div>
      <div className="fourOFour-image">
        <Image src={fourOFour} size="large" />
      </div>
    </Container>
  );
}

export default FourOFour;
