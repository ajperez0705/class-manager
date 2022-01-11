import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Transition } from "semantic-ui-react";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../actions/posts";

export default function PostForm({
  currentId,
  setCurrentId,
  filterPostAfterForm,
  modalStatus,
  setModalStatus,
}) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();

    setTimeout(() => {
      filterPostAfterForm();
      setModalStatus(false);
    }, 1000);
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      selectedFile: "",
    });
  };

  return (
    <>
      <Form className="post-form">
        {currentId ? (
          <h2>Edit the story</h2>
        ) : (
          <h2>Create a Story for the class</h2>
        )}
        <Form.Field>
          <Form.Input
            placeholder="Title"
            name="title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <Form.Input
            placeholder="message"
            name="message"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>

          <Button type="submit" color="purple" onClick={onSubmit}>
            Submit
          </Button>
        </Form.Field>
      </Form>
      <Button color="purple" onClick={() => setModalStatus(false)}>
        Cancel
      </Button>
      {/* {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )} */}
    </>
  );
}
