import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { fetchStudents } from "../actions/users";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import UserCard from "../components/UserCard";

function Home() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.users);

  // current Id is used to grab the id of the post you want to edit
  const [currentId, setCurrentId] = useState(null);

  console.log(students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [currentId, dispatch]);

  return (
    <div>
      <h1>Home</h1>
      <Grid columns={3}>
        <Grid.Row>
          {students.map((student) => (
            <Grid.Column key={student._id} style={{ marginBottom: 20 }}>
              <UserCard student={student} setCurrentId={setCurrentId} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
