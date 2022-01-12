import React from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

import { deletePost, likePost } from "../actions/posts";

// import LikeButton from "./LikeButton";
// import DeleteButton from "./DeleteButton";

export default function PostCard({
  data: { _id, title, message, createdAt, selectedFile, comments, likes },
  setCurrentId,
}) {
  const numOfLikes = likes.length;
  const numOfComments = comments.length;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <Button inverted onClick={() => dispatch(likePost(_id))}>
            <Icon fitted name="like" />
            {numOfLikes > 2
              ? `You and ${numOfLikes - 1} others`
              : `${numOfLikes}`}
          </Button>
        </>
      ) : (
        <>
          <Button inverted onClick={() => dispatch(likePost(_id))}>
            <Icon fitted name="like" />
            {numOfLikes}
          </Button>
        </>
      );
    }

    return (
      <>
        <Button inverted onClick={() => dispatch(likePost(_id))}>
          <Icon fitted name="like" />
        </Button>
      </>
    );
  };

  return (
    <Card className="class-story_post-card" fluid>
      <Image
        src={selectedFile}
        wrapped
        ui={false}
        as={Link}
        to={`/posts/${_id}`}
        post={title}
      />
      <Card.Content
        className="class-story_card-body"
        as={Link}
        to={`/posts/${_id}`}
        post={title}
      >
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {message.length > 50 ? `${message.substring(0, 50)}...` : message}
        </Card.Description>
      </Card.Content>
      <Card.Content className="class-story_card-stats" extra>
        <Likes />
        <Button inverted as={Link} to={`/posts/${_id}`} post={title}>
          <Icon fitted name="comments" />
          <span> {numOfComments}</span>
        </Button>

        {user?.result?.isTeacher === true && (
          <Button onClick={() => dispatch(deletePost(_id))} inverted>
            <Icon fitted name="delete" />
          </Button>
        )}

        {/* {user && user.username === username && <DeleteButton postId={id} />} */}
      </Card.Content>
    </Card>
  );
}
