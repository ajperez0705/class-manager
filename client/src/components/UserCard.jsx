import React from "react";
import { Card, Image } from "semantic-ui-react";

function UserCard({ student }) {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Card>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{student.username}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className="point-totals">
          <h6>Positive: {student.posPoints}</h6>
          <h6>Negative: {student.negPoints}</h6>
          <h6>Total: {student.totalPoints}</h6>
        </div>
      </Card.Content>
    </Card>
  );
}

export default UserCard;
