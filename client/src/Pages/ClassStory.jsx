import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
// import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function ClassStory() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  useEffect(() => {
    dispatch(getPosts);
  }, [dispatch]);

  return (
    <div>
      <h1>Class Story</h1>
      <PostForm />
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent by MrTeacher</h1>
        </Grid.Row>
        <Grid.Row>
          {/* <PostCard /> */}
          {/*{user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
           {loading ? (
            <h1>Loading posts...</h1>
          ) : (
            <Transition.Group>
              {users &&
                users.map((userEl) => (
                  <Grid.Column key={userEl.id} style={{ marginBottom: 20 }}>
                    <PostCard post={userEl} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )} */}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default ClassStory;
