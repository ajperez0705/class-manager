import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

import { deletePost, likePost } from "../actions/posts";

// import LikeButton from "./LikeButton";
// import DeleteButton from "./DeleteButton";

export default function PostCard({
  post: { _id, title, message, createdAt, selectedFile, likeCount },
  setCurrentId,
}) {
  console.log(likeCount);
  const dispatch = useDispatch();

  return (
    <Card fluid>
      <Image
        src={selectedFile}
        wrapped
        ui={false}
        as={Link}
        to={`/posts/${1}`}
      />
      <Card.Content as={Link} to={`/posts/${1}`}>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        {/* <p>{totalPoints}</p> */}
        <Card.Description>{message}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* <LikeButton user={user} post={{ id, likes, likeCount }} /> */}
        <Button labelPosition="right" onClick={() => dispatch(likePost(_id))}>
          <Button color="violet" basic>
            <Icon name="like" />
          </Button>
          <Label basic color="violet" pointing="left">
            {likeCount}
          </Label>
        </Button>

        <Button labelPosition="right" as={Link} to={`/posts/${1}`}>
          <Button color="violet" basic>
            <Icon name="comments" />
          </Button>
          {/* <Label basic color="violet" pointing="left">
            {commentCount}
          </Label> */}
        </Button>

        <Button labelPosition="right" onClick={() => setCurrentId(_id)}>
          <Button color="violet" basic>
            <Icon name="edit" />
          </Button>
          {/* <Label basic color="violet" pointing="left">
            {commentCount}
          </Label> */}
        </Button>

        <Button labelPosition="right" onClick={() => dispatch(deletePost(_id))}>
          <Button color="violet" basic>
            <Icon name="delete" />
          </Button>
          {/* <Label basic color="violet" pointing="left">
            {commentCount}
          </Label> */}
        </Button>

        {/* {user && user.username === username && <DeleteButton postId={id} />} */}
      </Card.Content>
    </Card>
  );
}
