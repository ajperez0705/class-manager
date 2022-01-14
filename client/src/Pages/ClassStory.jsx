import React, { useEffect, useState } from "react";
import { Grid, Select } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
// import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import Pagination from "../utils/Pagination";
import Loading from "../utils/Loading";
import FormModal from "../components/FormModal";

// const filterOptions = [
//   { key: "Most Recent", value: "recent", text: "Most Recent" },
// ];

function ClassStory() {
  const dispatch = useDispatch();
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isTeacher, setIsTeacher] = useState(null);
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("recent");

  const posts = useSelector((state) => state.posts);
  let resetPagination = 1;

  // current Id is used to grab the id of the post you want to edit
  const [currentId, setCurrentId] = useState(null);

  // On initial render, checks if logged in and if user is teacher
  useEffect(() => {
    // if (!user) return;

    if (user.result.isTeacher) {
      setIsTeacher(true);
    }
  }, []);

  // Grabs the posts from the database on load
  useEffect(() => {
    setIsLoading(true);

    dispatch(getPosts(filter));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [currentId, dispatch]);

  // Re-calls the posts using the current filter whenever the filter handler changes
  useEffect(() => {
    dispatch(getPosts(filter));

    console.log("called get more posts");
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
  };

  const filterPostAfterForm = function () {
    console.log("reached function");
    dispatch(getPosts(filter));
  };

  return (
    <div>
      {isLoading === true ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Grid className="class-story-grid" columns={3} stackable>
            <Grid.Row className="page-title">
              <h1>Recent by MrTeacher</h1>
              <div className="class-story-controls">
                {isTeacher && (
                  <FormModal
                    setOpen={setOpen}
                    modalStatus={open}
                    setModalStatus={setOpen}
                    filterPostAfterForm={filterPostAfterForm}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                    showForm={showForm}
                  />
                )}
                <select className="dropdown" onChange={(e) => filterHandler(e)}>
                  <option value="recent">Most Recent</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </Grid.Row>
            {/* <Transition.Group>
            {posts &&
              posts?.map((post) => (
                <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                  <PostCard data={post} setCurrentId={setCurrentId} />
                </Grid.Column>
              ))}
          </Transition.Group> */}

            {posts && (
              <Pagination
                data={posts}
                RenderComponent={PostCard}
                pageLimit={Math.ceil(posts.length / 6)}
                dataLimit={6}
                setCurrentId={setCurrentId}
                filter={filter}
              />
            )}
          </Grid>
        </>
      )}
    </div>
  );
}

export default ClassStory;
