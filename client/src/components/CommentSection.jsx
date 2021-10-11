import React, { useState } from "react";
import { Card, Form } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { commentPost } from "../actions/posts";

function CommentSection({ post }) {
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const submitComment = async (e) => {
    e.preventDefault();

    const finalComment = `${user.result.username}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post.postId));
    console.log(newComments);

    setComments(newComments);
    setComment("");
  };

  return (
    <div>
      {(user?.result?.username || user?.result?.givenName) && (
        <Card fluid>
          <Card.Content>
            <p>Post a comment</p>
            <Form onSubmit={submitComment}>
              <div className="ui action input fluid">
                <input
                  type="text"
                  placeholder="Comment.."
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  // ref={commentInputRef}
                />
                <button
                  type="submit"
                  className="ui button teal"
                  disabled={!comment}
                >
                  Submit
                </button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      )}
      {comments?.map((comment, index) => (
        <Card fluid key={index}>
          <Card.Content>
            <Card.Header>{comment}</Card.Header>
            <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
            <Card.Description>{comment.message}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}

// {user && user.username === comment.username && (
//   <DeleteButton postId={id} commentId={comment.id} />
// )}
export default CommentSection;
