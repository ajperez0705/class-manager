import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "semantic-ui-react";
import { fetchStudents } from "../actions/users";
import UserCard from "../components/UserCard";

import successAudio from "../sound/success.mp3";
import failureAudio from "../sound/failure.mp3";

function Home() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.users);

  // current Id is used to grab the id of the post you want to edit
  const [currentId, setCurrentId] = useState(null);
  const [pointAnim, setPointAnim] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [currentId, dispatch]);

  const audioHandler = function (numPoints, updateType) {
    if (updateType === "positive") {
      new Audio(successAudio).play();
    } else {
      new Audio(failureAudio).play();
    }
  };

  return (
    <Container>
      <div className="home-container">
        <Grid className="home-grid" stackable columns={5}>
          <Grid.Row>
            {students.map((student) => (
              <Grid.Column key={student._id} style={{ marginBottom: 20 }}>
                <UserCard
                  student={student}
                  setCurrentId={setCurrentId}
                  pointAnim={pointAnim}
                  setPointAnim={setPointAnim}
                  audioHandler={audioHandler}
                />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </div>
    </Container>
  );
}

export default Home;
