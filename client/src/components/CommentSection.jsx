import React, { useState, useEffect } from "react";
import { Card, Form, Icon, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { commentPost, deleteComment } from "../actions/posts";

function CommentSection({ post }) {
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const [myComments, setMyComments] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (!comments) return;

    const userComments = comments.filter(
      (comment) =>
        user?.result?.username ===
        comment.message.substr(0, comment.message.indexOf(":"))
    );

    setMyComments(userComments);
  }, [comments, dispatch]);

  const submitComment = async (e) => {
    e.preventDefault();

    const finalComment = `${user.result.username}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post?._id));

    setComments(newComments);
    setComment("");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const deleteCommentHandler = async (e, clicked_id) => {
    e.preventDefault();

    const updatedComments = await dispatch(
      deleteComment(clicked_id, post?._id)
    );

    setComments(updatedComments);
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
      {comments?.map((comment) => (
        <Card className="comment-section-card" fluid key={comment._id}>
          <Card.Content>
            <Card.Header>{comment.message}</Card.Header>
            <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
          </Card.Content>
          {/* <Card.Description>{comment.message}</Card.Description> */}
          {myComments.includes(comment) && (
            <Card.Description>
              <Button
                basic
                color="purple"
                onClick={(e) => deleteCommentHandler(e, comment?._id)}
              >
                <Icon fitted name="delete" />
              </Button>
            </Card.Description>
          )}
        </Card>
      ))}
    </div>
  );
}

// {user && user.username === comment.username && (
//   <DeleteButton postId={id} commentId={comment.id} />
// )}
export default CommentSection;
