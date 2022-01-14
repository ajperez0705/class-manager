import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Header, Form, Segment, Message } from "semantic-ui-react";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../actions/posts";

export default function PostForm({
  currentId,
  setCurrentId,
  filterPostAfterForm,
  modalStatus,
  setModalStatus,
  errors,
  setErrors,
}) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(postData.title);

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      let feedback = await dispatch(createPost(postData, setErrors));
      if (feedback === "error") return;
      setSuccess(feedback);
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
    setErrors([]);
    setSuccess();
  };

  return (
    <>
      {currentId ? (
        <Header className="class-story_form-header" as="h2" attached="top">
          Edit the story
        </Header>
      ) : (
        <Header className="class-story_form-header" as="h2" attached="top">
          Create a Story for the class
        </Header>
      )}
      <Segment attached>
        <Form className="class-story_form">
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
          </Form.Field>
          <Button type="submit" color="blue" onClick={onSubmit}>
            Submit
          </Button>
          <Button basic color="red" onClick={() => setModalStatus(false)}>
            Cancel
          </Button>
        </Form>
        {errors.length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {errors.map((error) => {
                return <li key={error}>{error}</li>;
              })}
            </ul>
          </div>
        )}
        {success !== "" && (
          <Message
            success
            header="Post Created Successfully"
            content={success}
          />
        )}
      </Segment>
    </>
  );
}
