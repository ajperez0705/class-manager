import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const Loading = (props) => (
  <Segment style={{ height: "90vh" }}>
    <Dimmer active>
      <Loader content={props.content} />
    </Dimmer>
  </Segment>
);

export default Loading;
