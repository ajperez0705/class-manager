import React from "react";
import { Button, Modal, Card, Form, Image } from "semantic-ui-react";
import { motion } from "framer-motion";
import PointsConfetti from "../../utils/PointsConfetti";
import UserAvatar from "../UserAvatar";
import { positiveCards, negativeCards } from "../../utils/feedbackCards";

function ProfessorModalView({
  student,
  pointAnim,
  feedBack,
  changeFeedbackType,
  numPointsHandler,
  updatePoints,
  numPoints,
  setErrors,
  errors,
  setModalStatus,
}) {
  return (
    <>
      <Modal.Header className="modal-header">
        <div>
          <span>{student.username}'s Current Points: </span>
          {pointAnim ? (
            <>
              {feedBack === "positive" ? (
                <motion.span
                  animate={{
                    // fontSize: "500px",
                    scale: 1.1,
                    color: "green",
                  }}
                >
                  {student.totalPoints}
                </motion.span>
              ) : (
                <motion.span
                  animate={{
                    // fontSize: "500px",
                    scale: 1.1,
                    color: "red",
                  }}
                >
                  {student.totalPoints}
                </motion.span>
              )}
            </>
          ) : (
            <motion.span>{student.totalPoints}</motion.span>
          )}
        </div>

        {/* <span>{student.username}'s Current Points:</span>
  <div>
    {student.username}'s Current Points:{" "}
    <span>{student.totalPoints}</span>
  </div> */}
        {feedBack === "positive" ? (
          <Modal.Actions className="modal_feedback-type-btns">
            <Button color="green" disabled>
              Positive Feedback
            </Button>
            <Button color="red" onClick={() => changeFeedbackType("negative")}>
              Negative Feedback
            </Button>
          </Modal.Actions>
        ) : (
          <Modal.Actions className="modal_feedback-type-btns">
            <Button
              color="green"
              onClick={() => changeFeedbackType("positive")}
            >
              Positive Feedback
            </Button>
            <Button color="red" disabled>
              Negative Feedback
            </Button>
          </Modal.Actions>
        )}
      </Modal.Header>

      <Modal.Content className="modal-content" image centered="true">
        <UserAvatar studentAvatar={student.avatar} />
        {feedBack === "positive" ? (
          <Modal.Description>
            <h2>How many points do you want to give?</h2>

            <Form.Input
              className="modal-point-counter"
              name="numPoints"
              type="number"
              placeholder="1"
              step="1"
              min="1"
              max="10"
              onChange={numPointsHandler}
            />

            <PointsConfetti
              updatePoints={updatePoints}
              positive="positive"
              student={student}
              numPoints={numPoints}
              setErrors={setErrors}
              feedBack={feedBack}
              positiveCards={positiveCards}
            />

            {errors && (
              <div className="ui error message">
                <ul className="list">
                  <li key={errors}>{errors}</li>
                </ul>
              </div>
            )}
          </Modal.Description>
        ) : (
          <Modal.Description>
            <h2>How many points do you want to take away?</h2>

            <Form.Input
              name="numPoints"
              type="number"
              placeholder="1"
              step="1"
              min="1"
              max="10"
              onChange={numPointsHandler}
            />

            <Card.Group className="modal_feedback-cards">
              {negativeCards.map((card) => (
                <Card
                  key={card.id}
                  onClick={() => updatePoints("negative", student, numPoints)}
                >
                  <Card.Content textAlign={"center"}>
                    <Image src={card.image} size={"small"} />
                  </Card.Content>
                  <Card.Content>
                    <Card.Header textAlign={"center"}>{card.name}</Card.Header>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>

            {errors && (
              <div className="ui error message">
                <ul className="list">
                  <li key={errors}>{errors}</li>
                </ul>
              </div>
            )}
          </Modal.Description>
        )}
      </Modal.Content>
      <Modal.Actions className="modal-bottom">
        <Button color="black" onClick={() => setModalStatus(false)}>
          Close
        </Button>
      </Modal.Actions>
    </>
  );
}

export default ProfessorModalView;
