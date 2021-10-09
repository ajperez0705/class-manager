import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import FileBase from "react-file-base64";
import { createPost } from "../actions/posts";

export default function PostForm() {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(postData);

    dispatch(createPost(postData));
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a for the class</h2>
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
            {/* <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            /> */}
          </div>

          <Button type="submit" color="purple">
            Submit
          </Button>
        </Form.Field>
      </Form>
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
