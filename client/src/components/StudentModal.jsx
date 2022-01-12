import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Header,
  Modal,
  Card,
  Form,
  Image,
  Icon,
  Grid,
} from "semantic-ui-react";
import { updateStudentPoints } from "../actions/users";
import UserAvatar from "./UserAvatar";
import PointsConfetti from "../utils/PointsConfetti";
import { motion } from "framer-motion";

// Negative Images
import bullying from "../images/point-icons/bullying.png";
import rules from "../images/point-icons/breaking-rules.png";
import phone from "../images/point-icons/phone-use.png";

// Positive Images
import helping from "../images/point-icons/helping-others.png";
import work from "../images/point-icons/stellar-work.png";
import participation from "../images/point-icons/participation.png";

function StudentModal({
  student,
  modalStatus,
  setModalStatus,
  pointAnim,
  setPointAnim,
  audioHandler,
}) {
  const positiveCards = [
    {
      id: 1,
      image: work,
      name: "Helping Others",
    },
    {
      id: 2,
      image: helping,
      name: "Stellar Work",
    },
    {
      id: 3,
      image: participation,
      name: "Participation",
    },
  ];

  const negativeCards = [
    {
      id: 1,
      image: bullying,
      name: "Bullying Others",
    },
    {
      id: 2,
      image: rules,
      name: "Breaking Rules",
    },
    {
      id: 3,
      image: phone,
      name: "Phone Use",
    },
  ];

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [feedBack, setFeedBack] = useState("positive");
  const [numPoints, setNumPoints] = useState(0);
  const [isTeacher, setIsTeacher] = useState(null);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));

    if (user.result.isTeacher) {
      setIsTeacher(true);
    } else return;
  }, []);

  const updatePoints = function (updateType, student, numPoints) {
    if (updateType === "negative" && numPoints === 0) {
      setErrors(
        "Please select how many points you would like to take away from this student."
      );
      return;
    }

    setErrors(null);
    setPointAnim(true);
    audioHandler(numPoints, updateType);

    if (updateType === "positive") {
      student.totalPoints = student.totalPoints + numPoints;
      student.allTimePoints = student.allTimePoints + numPoints;
    } else if (updateType === "negative") {
      student.totalPoints = student.totalPoints - numPoints;
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
              <Modal.Header className="modal-header">
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
              <Modal.Header className="modal-header">
                <div>
                  {student.username}'s Current Points:{" "}
                  <span>{student.totalPoints}</span>
                </div>
                {feedBack === "positive" ? (
                  <Modal.Actions className="modal_feedback-type-btns">
                    <Button color="green" disabled>
                      Positive Feedback
                    </Button>
                    <Button
                      color="red"
                      onClick={() => changeFeedbackType("negative")}
                    >
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
            </>
          )}

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
                      onClick={() =>
                        updatePoints("negative", student, numPoints)
                      }
                    >
                      <Card.Content textAlign={"center"}>
                        <Image src={card.image} size={"small"} />
                      </Card.Content>
                      <Card.Content>
                        <Card.Header textAlign={"center"}>
                          {card.name}
                        </Card.Header>
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
      ) : (
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
                  <Icon name="thumbs up outline" size="huge" />
                  <Header>Current Points</Header>
                </Card.Content>
                <Card.Content>
                  <Card.Header textAlign={"center"}>
                    {student.totalPoints}
                  </Card.Header>
                </Card.Content>
              </Card>
              <Card meta="Current Points" description={student.totalPoints} />
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
