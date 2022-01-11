import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Header,
  Grid,
  Modal,
  Card,
  Icon,
  Form,
} from "semantic-ui-react";
import decode from "jwt-decode";
import { updateStudentPoints } from "../actions/users";
import UserAvatar from "./UserAvatar";
import PointsConfetti from "../utils/PointsConfetti";
import { motion } from "framer-motion";

function StudentModal({
  student,
  modalStatus,
  setModalStatus,
  pointAnim,
  setPointAnim,
  numPointsToShow,
}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [feedBack, setFeedBack] = useState("positive");
  const [numPoints, setNumPoints] = useState(0);
  const [isTeacher, setIsTeacher] = useState(null);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();
  console.log(student);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));

    if (user.result.isTeacher) {
      setIsTeacher(true);
    } else return;
  }, []);

  console.log(0 > -1);

  const updatePoints = function (updateType, student, numPoints) {
    if (updateType === "negative" && numPoints > -1) {
      setErrors(
        "Please select how many points you would like to take away from this student."
      );
      return;
    }

    setErrors(null);
    setPointAnim(true);
    numPointsToShow(numPoints);

    if (updateType === "positive") {
      student.totalPoints = student.totalPoints + numPoints;
      student.allTimePoints = student.allTimePoints + numPoints;
    } else if (updateType === "negative") {
      student.totalPoints = student.totalPoints - Math.abs(numPoints);
    }

    dispatch(updateStudentPoints(student._id, student));
    setNumPoints(0);

    setTimeout(() => {
      setPointAnim(false);
      setModalStatus(false);
    }, 1000);
  };

  const numPointsHandler = function (e) {
    setNumPoints(parseInt(e.target.value));
  };

  const changeFeedbackType = function (feedbackType) {
    setErrors(null);

    if (feedbackType === "positive") {
      setFeedBack("positive");
    } else if (feedbackType === "negative") {
      setFeedBack("negative");
    }
  };

  return (
    <>
      {isTeacher ? (
        <>
          {pointAnim ? (
            <>
              <Modal.Header>
                <span>{student.username}'s Current Points:</span>
                <motion.p
                  //className="point-modal"
                  animate={{
                    // fontSize: "500px",
                    scale: 1.3,
                    originX: 0,
                    originY: 0,
                  }}
                  // transition={{ duration: 3 }}
                >
                  {student.totalPoints}
                </motion.p>
              </Modal.Header>
            </>
          ) : (
            <>
              <Modal.Header>
                <span>
                  {student.username}'s Current Points: {student.totalPoints}
                </span>
              </Modal.Header>
            </>
          )}

          <Modal.Content image centered={true}>
            <UserAvatar studentAvatar={student.avatar} />
            {feedBack === "positive" ? (
              <Modal.Description>
                <h2>How many points do you want to give?</h2>
                <Form.Input
                  name="numPoints"
                  type="number"
                  placeholder="1"
                  step="1"
                  min="1"
                  max="10"
                  onChange={numPointsHandler}
                />
                <Modal.Actions>
                  <Button disabled>Positive Feedback</Button>
                  <Button onClick={() => changeFeedbackType("negative")}>
                    Negative Feedback
                  </Button>
                </Modal.Actions>

                <PointsConfetti
                  updatePoints={updatePoints}
                  positive="positive"
                  student={student}
                  numPoints={numPoints}
                  icon="thumbs up outline"
                  message="Helping Others"
                  setErrors={setErrors}
                  feedBack={feedBack}
                />

                {errors && (
                  <div className="ui error message">
                    <ul className="list">
                      <li key={errors}>{errors}</li>
                    </ul>
                  </div>
                )}
                {/* <Card
                  onClick={() => updatePoints("positive", student, numPoints)}
                >
                  <Icon name="thumbs up outline" size="huge" />
                  <Card.Content>
                    <Card.Header>Helping Others</Card.Header>
                  </Card.Content>
                </Card> */}
              </Modal.Description>
            ) : (
              <Modal.Description>
                <h2>How many points do you want to take away?</h2>
                <Form.Input
                  name="numPoints"
                  type="number"
                  placeholder="-1"
                  step="1"
                  min="-10"
                  max="-1"
                  onChange={numPointsHandler}
                />

                <Modal.Actions>
                  <Button onClick={() => changeFeedbackType("positive")}>
                    Positive Feedback
                  </Button>
                  <Button disabled>Negative Feedback</Button>
                </Modal.Actions>

                <Card.Group className="feedback-cards">
                  <Card
                    onClick={() => updatePoints("negative", student, numPoints)}
                  >
                    <Icon name="thumbs down outline" size="huge" />
                    <Card.Content>
                      <Card.Header>Disrespecting Others</Card.Header>
                    </Card.Content>
                  </Card>
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
            <UserAvatar studentAvatar={student.avatar} />
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
