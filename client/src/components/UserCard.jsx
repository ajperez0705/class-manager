import React, { useState } from "react";
import { BigHead } from "@bigheads/core";

import { Modal, Card, Icon } from "semantic-ui-react";
import StudentModal from "./StudentModal";

function UserCard({ student, pointAnim, setPointAnim, audioHandler }) {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Card className="student-card" centered>
          <Card.Header className="student-card_header" textAlign="center">
            {student.username}
          </Card.Header>
          <BigHead {...JSON.parse(student.avatar)} />
          <Card.Content className="student-card_score" extra>
            <div className="point-totals">
              <p>
                <Icon name="target" />
                {student.totalPoints}
              </p>
              <p>
                <Icon name="trophy" />
                {student.totalTrophies}
              </p>
            </div>
          </Card.Content>
        </Card>
      }
    >
      <StudentModal
        student={student}
        modalStatus={open}
        setModalStatus={setOpen}
        pointAnim={pointAnim}
        setPointAnim={setPointAnim}
        audioHandler={audioHandler}
      />
    </Modal>
  );
}

export default UserCard;
