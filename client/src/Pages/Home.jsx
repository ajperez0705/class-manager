import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { fetchStudents } from "../actions/users";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import UserCard from "../components/UserCard";

import successAudio from "../sound/SSBM_Success.mp3";
import failureAudio from "../sound/SSBM_Failure.mp3";

import { motion } from "framer-motion";

function Home() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.users);

  // current Id is used to grab the id of the post you want to edit
  const [currentId, setCurrentId] = useState(null);
  const [pointAnim, setPointAnim] = useState(false);
  const [showPoints, setShowPoints] = useState(0);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [currentId, dispatch]);

  const numPointsToShow = function (numPoints) {
    console.log(numPoints);
    setShowPoints(numPoints);

    if (numPoints > 0) {
      new Audio(successAudio).play();
    } else {
      new Audio(failureAudio).play();
    }
  };

  return (
    <div className="home-container">
      <h1>Home</h1>

      {pointAnim && (
        <>
          <motion.div
            className="point-modal"
            animate={{
              // fontSize: "500px",
              color: "red",
              opacity: "1",
            }}
            transition={{ duration: 3 }}
            initial={{ opacity: "0", fontSize: "200px" }}
          >
            <p>{showPoints > 0 ? `+${showPoints}` : `${showPoints}`}</p>
          </motion.div>
        </>
      )}

      <Grid stackable columns={5}>
        <Grid.Row>
          {students.map((student) => (
            <Grid.Column key={student._id} style={{ marginBottom: 20 }}>
              <UserCard
                student={student}
                setCurrentId={setCurrentId}
                pointAnim={pointAnim}
                setPointAnim={setPointAnim}
                numPointsToShow={numPointsToShow}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
