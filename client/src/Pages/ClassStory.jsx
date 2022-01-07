import React, { useEffect, useState } from "react";
import { Grid, Transition, Select } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
// import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

// const filterOptions = [
//   { key: "Most Recent", value: "recent", text: "Most Recent" },
// ];

function ClassStory() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isTeacher, setIsTeacher] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("recent");

  const posts = useSelector((state) => state.posts);

  // current Id is used to grab the id of the post you want to edit
  const [currentId, setCurrentId] = useState(null);

  // On initial render, checks if logged in and if user is teacher
  useEffect(() => {
    if (!user) return;

    if (user.result.isTeacher) {
      setIsTeacher(true);
    }
  }, []);

  // Grabs the posts from the database on load
  useEffect(() => {
    dispatch(getPosts(filter));
  }, [currentId, dispatch]);

  // Re-calls the posts using the current filter whenever the filter handler changes
  useEffect(() => {
    dispatch(getPosts(filter));
  }, [filter, dispatch]);

  const showPostForm = function () {
    if (showForm === true) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const filterHandler = function (e) {
    e.preventDefault();

    setFilter(e.target.value);

    console.log(filter);
  };

  const filterPostAfterForm = function () {
    console.log("reached function");
    dispatch(getPosts(filter));
  };

  return (
    <div>
      <h1>Class Story</h1>
      {isTeacher && (
        <>
          {showForm ? (
            <button onClick={showPostForm}>Cancel</button>
          ) : (
            <button onClick={showPostForm}>Create Post</button>
          )}
          {showForm && (
            <Transition.Group>
              <PostForm
                filterPostAfterForm={filterPostAfterForm}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Transition.Group>
          )}
        </>
      )}

      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent by MrTeacher</h1>
          {/* <Select
            placeholder="Filter Posts"
            onChange={(e) => filterHandler(e)}
            options={filterOptions}
            value={filter}
          /> */}
          <select onChange={(e) => filterHandler(e)}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
          </select>
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
