import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Header, Image, Modal, Card, Icon } from "semantic-ui-react";
import decode from "jwt-decode";
import { updateStudentPoints } from "../actions/users";

function StudentModal({ student, modalStatus, setModalStatus }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [feedBack, setFeedBack] = useState("positive");
  const [isTeacher, setIsTeacher] = useState(null);
  const dispatch = useDispatch();
  console.log(student);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));

    if (user.result.isTeacher) {
      setIsTeacher(true);
    } else return;
  }, []);

  const updatePoints = function (updateType, student) {
    if (updateType === "positive") {
      student.totalPoints++;
    } else if (updateType === "negative") {
      student.totalPoints--;
    }

    dispatch(updateStudentPoints(student._id, student));
  };

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

            {feedBack === "positive" ? (
              <Modal.Description>
                <div className="toggle-header">
                  <Header>Positive Feedback</Header>
                  <Header onClick={() => setFeedBack("negative")}>
                    Negative Feedback
                  </Header>
                </div>
                <Card onClick={() => updatePoints("positive", student)}>
                  <Icon name="thumbs up outline" size="huge" />
                  <Card.Content>
                    <Card.Header>Helping Others</Card.Header>
                  </Card.Content>
                </Card>
              </Modal.Description>
            ) : (
              <Modal.Description>
                <div className="toggle-header">
                  <Header onClick={() => setFeedBack("positive")}>
                    Positive Feedback
                  </Header>
                  <Header>Negative Feedback</Header>
                </div>
                <Card onClick={() => updatePoints("negative", student)}>
                  <Icon name="thumbs down outline" size="huge" />
                  <Card.Content>
                    <Card.Header>Disrespecting Others</Card.Header>
                  </Card.Content>
                </Card>
              </Modal.Description>
            )}
          </Modal.Content>

          <Modal.Actions>
            <Button color="black" onClick={() => setModalStatus(false)}>
              Close
            </Button>
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
              <Header>Points</Header>
              <Card meta="Current Points" description={student.totalPoints} />
            </Modal.Description>

            <Modal.Description>
              <Header>Trophies</Header>
              <Card meta="Trophies" description={student.totalTrophies} />
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
