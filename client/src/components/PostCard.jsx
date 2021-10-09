import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

// import LikeButton from "./LikeButton";
// import DeleteButton from "./DeleteButton";

export default function PostCard() {
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header></Card.Header>
        <Card.Meta as={Link} to={`/posts/${1}`}>
          {/* {moment(createdAt).fromNow(true)} */}
        </Card.Meta>
        {/* <p>{totalPoints}</p> */}
        {/* <Card.Description>{body}</Card.Description> */}
      </Card.Content>
      <Card.Content extra>
        {/* <LikeButton user={user} post={{ id, likes, likeCount }} /> */}
        <Button labelPosition="right" as={Link} to={`/posts/${1}`}>
          <Button color="violet" basic>
            <Icon name="comments" />
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
