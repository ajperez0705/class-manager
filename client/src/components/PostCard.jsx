import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

import { deletePost, likePost } from "../actions/posts";

// import LikeButton from "./LikeButton";
// import DeleteButton from "./DeleteButton";

export default function PostCard({
  post: { _id, title, message, createdAt, selectedFile, comments, likes },
  setCurrentId,
}) {
  const numOfLikes = likes.length;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <Button color="violet" basic>
            <Icon name="like" />
          </Button>
          <Label basic color="violet" pointing="left">
            {numOfLikes > 2
              ? `You and ${numOfLikes - 1} others`
              : `${numOfLikes} like${numOfLikes > 1 ? "s" : ""}`}
          </Label>
        </>
      ) : (
        <>
          <Button color="violet" basic>
            <Icon name="like" />
          </Button>
          <Label basic color="violet" pointing="left">
            {numOfLikes} {numOfLikes === 1 ? "Like" : "Likes"}
          </Label>
        </>
      );
    }

    return (
      <>
        <Button color="violet" basic>
          <Icon name="like" />
        </Button>
        <Label basic color="violet" pointing="left">
          Like
        </Label>
      </>
    );
  };

  return (
    <Card fluid>
      <Image
        src={selectedFile}
        wrapped
        ui={false}
        as={Link}
        to={`/posts/${_id}`}
        post={title}
      />
      <Card.Content as={Link} to={`/posts/${_id}`}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        {/* <p>{}</p> */}
        <Card.Description>{message}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* <LikeButton user={user} post={{ id, numOfLikes, likeCount }} /> */}
        <Button
          labelPosition="right"
          disabled={!user}
          onClick={() => dispatch(likePost(_id))}
        >
          <>
            <Likes />
          </>
        </Button>

        <Button labelPosition="right" as={Link} to={`/posts/${1}`}>
          <Button color="violet" basic>
            <Icon name="comments" />
          </Button>
          {/* <Label basic color="violet" pointing="left">
            {commentCount}
          </Label> */}
        </Button>

        {user?.result?.isTeacher === true && (
          <Button labelPosition="right" onClick={() => setCurrentId(_id)}>
            <Button color="violet" basic>
              <Icon name="edit" />
            </Button>
            {/* <Label basic color="violet" pointing="left">
            {commentCount}
          </Label> */}
          </Button>
        )}

        {user?.result?.isTeacher === true && (
          <Button
            labelPosition="right"
            onClick={() => dispatch(deletePost(_id))}
          >
            <Button color="violet" basic>
              <Icon name="delete" />
            </Button>
            {/* <Label basic color="violet" pointing="left">
            {commentCount}
          </Label> */}
          </Button>
        )}

        {/* {user && user.username === username && <DeleteButton postId={id} />} */}
      </Card.Content>
    </Card>
  );
}
