import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Header,
  Image,
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
import PostForm from "./PostForm";

function FormModal({
  setModalStatus,
  modalStatus,
  setCurrentId,
  currentId,
  filterPostAfterForm,
}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [feedBack, setFeedBack] = useState("positive");
  const [numPoints, setNumPoints] = useState(0);
  const [isTeacher, setIsTeacher] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));

    if (user.result.isTeacher) {
      setIsTeacher(true);
    } else return;
  }, []);

  return (
    <Modal
      onClose={() => setModalStatus(false)}
      onOpen={() => setModalStatus(true)}
      open={modalStatus}
      modalStatus={modalStatus}
      trigger={<button className="btn_gen-avatar">Create a Post</button>}
    >
      <PostForm
        filterPostAfterForm={filterPostAfterForm}
        currentId={currentId}
        setCurrentId={setCurrentId}
        setModalStatus={setModalStatus}
        modalStatus={modalStatus}
      />
    </Modal>
  );
}

export default FormModal;
