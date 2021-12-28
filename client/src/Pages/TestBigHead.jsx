import React, { useState } from "react";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../utils/bigheads";
import { Form, Message, Button } from "semantic-ui-react";

function TestBigHead() {
  const [avatar, setAvatar] = useState({});
  const [genAvatar, setGenAvatar] = useState(false);

  const generateAvatar = function (e) {
    e.preventDefault();

    setGenAvatar(true);

    setAvatar(getRandomOptions());

    // newAvatar = <BigHead {...avatar} />;
  };

  return (
    <Form error>
      <Form.Input label="Email" placeholder="joe@schmoe.com" />
      <Message
        error
        header="Action Forbidden"
        content="You can only sign up for an account once with a given e-mail address."
      />
      <Button>Submit</Button>
    </Form>
  );
}

export default TestBigHead;
