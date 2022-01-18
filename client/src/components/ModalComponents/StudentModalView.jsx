import React from "react";
import { Modal, Card, Header, Icon, Button } from "semantic-ui-react";
import StudentViewModalTrophies from "./StudentViewModalTrophies";
import UserAvatar from "../UserAvatar";

function StudentModalView({ student, setModalStatus }) {
  return (
    <>
      <Modal.Header>
        {student.username}'s Current Points: {student.totalPoints}
      </Modal.Header>
      <Modal.Content image>
        <UserAvatar studentAvatar={student.avatar} />
        <Modal.Description>
          <Header>Points</Header>
          <Card className="display-card">
            <Card.Content textAlign={"center"}>
              <Icon color="violet" name="target" size="huge" />
              <Header as="h4">Current Points</Header>
              <Card.Header textAlign={"center"}>
                {student.totalPoints}
              </Card.Header>
            </Card.Content>
          </Card>
          <Card className="display-card">
            <Card.Content textAlign={"center"}>
              <Icon color="violet" name="chart line" size="huge" />
              <Header as="h4">All-Time Points</Header>
              <Card.Header textAlign={"center"}>
                {student.allTimePoints}
              </Card.Header>
            </Card.Content>
          </Card>
        </Modal.Description>

        <Modal.Description className="student-modal-trophies">
          <Header>Trophies</Header>
          <StudentViewModalTrophies student={student} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setModalStatus(false)}>
          Close
        </Button>
      </Modal.Actions>
    </>
  );
}

export default StudentModalView;
