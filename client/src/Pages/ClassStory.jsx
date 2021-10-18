import React, { useEffect, useState } from "react";
import { Grid, Transition } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
// import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

function ClassStory() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  // current Id is used to grab the id of the post you want to edit
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div>
      <h1>Class Story</h1>
      <PostForm currentId={currentId} setCurrentId={setCurrentId} />
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent by MrTeacher</h1>
        </Grid.Row>
        <Grid.Row>
          {/* <PostCard /> */}
          {/* {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )} */}

          <Transition.Group>
            {posts &&
              posts?.map((post) => (
                <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} setCurrentId={setCurrentId} />
                </Grid.Column>
              ))}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default ClassStory;
