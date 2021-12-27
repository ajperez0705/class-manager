import React, { useState } from "react";
import { BigHead } from "@bigheads/core";

import { Image, Modal, Card } from "semantic-ui-react";
import StudentModal from "./StudentModal";

function UserCard({ student }) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Card>
          <BigHead {...JSON.parse(student.avatar)} />

          <Card.Content>
            <Card.Header>{student.username}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <div className="point-totals">
              <h6>Current Points: {student.totalPoints}</h6>
              <h6>Trophies: {student.totalTrophies}</h6>
            </div>
          </Card.Content>
        </Card>
      }
    >
      <StudentModal
        student={student}
        modalStatus={open}
        setModalStatus={setOpen}
      />
    </Modal>
  );
}

export default UserCard;
