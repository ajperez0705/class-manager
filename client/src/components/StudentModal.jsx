import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateStudentPoints } from "../actions/users";

import ProfessorModalView from "./ModalComponents/ProfessorModalView";
import StudentModalView from "./ModalComponents/StudentModalView";

function StudentModal({
  student,
  modalStatus,
  setModalStatus,
  pointAnim,
  setPointAnim,
  audioHandler,
}) {
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
        <ProfessorModalView
          student={student}
          pointAnim={pointAnim}
          feedBack={feedBack}
          changeFeedbackType={changeFeedbackType}
          numPointsHandler={numPointsHandler}
          updatePoints={updatePoints}
          numPoints={numPoints}
          setErrors={setErrors}
          errors={errors}
          setModalStatus={setModalStatus}
        />
      ) : (
        <>
          <StudentModalView student={student} setModalStatus={setModalStatus} />
        </>
      )}
    </>
  );
}

export default StudentModal;
