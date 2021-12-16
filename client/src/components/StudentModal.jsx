import React, { useState, useEffect } from "react";
import { Button, Header, Image, Modal, Card, Icon } from "semantic-ui-react";
import decode from "jwt-decode";

function StudentModal({ student, modalStatus, setModalStatus }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isTeacher, setIsTeacher] = useState(null);
  console.log(student);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));

    if (user.result.isTeacher) {
      setIsTeacher(true);
    } else return;
  }, []);

  return (
    <>
      {isTeacher ? (
        <>
          <Modal.Header>
            {student.username}'s Current Points: {student.totalPoints}
          </Modal.Header>
          <Modal.Content image>
            <Image
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
              wrapped
            />
            <Modal.Description>
              <div className="toggle-header">
                <Header>Positive Feedback</Header>
                <Header>Negative Feedback</Header>
              </div>
              <Card>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Helping Others</Card.Header>
                </Card.Content>
              </Card>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setModalStatus(false)}>
              Nope
            </Button>
            <Button
              content="Yep, that's me"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setModalStatus(false)}
              positive
            />
          </Modal.Actions>
        </>
      ) : (
        <>
          <Modal.Header>
            {student.username}'s Current Points: {student.totalPoints}
          </Modal.Header>
          <Modal.Content image>
            <Image
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
              wrapped
            />
            <Modal.Description>
              <div className="toggle-header">
                <Header>Positive Feedback</Header>
                <Header>Negative Feedback</Header>
              </div>
              <Card>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>Helping Others</Card.Header>
                </Card.Content>
              </Card>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setModalStatus(false)}>
              Nope
            </Button>
            <Button
              content="Yep, that's me"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setModalStatus(false)}
              positive
            />
          </Modal.Actions>
        </>
      )}
    </>
  );
}

export default StudentModal;
