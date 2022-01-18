import React, { useState, useEffect } from "react";
import { Modal } from "semantic-ui-react";
import PostForm from "./PostForm";

function FormModal({
  setModalStatus,
  modalStatus,
  setCurrentId,
  currentId,
  filterPostAfterForm,
}) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isTeacher, setIsTeacher] = useState(null);
  const [errors, setErrors] = useState([]);

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
      trigger={<button className="primary-btn">Create a Post</button>}
    >
      <PostForm
        filterPostAfterForm={filterPostAfterForm}
        currentId={currentId}
        setCurrentId={setCurrentId}
        setModalStatus={setModalStatus}
        modalStatus={modalStatus}
        errors={errors}
        setErrors={setErrors}
      />
    </Modal>
  );
}

export default FormModal;
