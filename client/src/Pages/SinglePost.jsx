import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";
import moment from "moment";
import { useSelector } from "react-redux";
import CommentSection from "../components/CommentSection";
import { likePost } from "../actions/posts";
import { useDispatch } from "react-redux";

function SinglePost(props) {
  console.log(props);
  //   const commentInputRef = useRef(null);
  // const _id = props.match.params.postId;
  const [postId, setPostId] = useState(props.match.params.postId);
  //   const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentPost = useSelector((state) =>
    state.posts.filter((p) => p?._id === postId)
  );
  const [clickedPostData, setClickedPostData] = useState(currentPost[0]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   init();
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    setClickedPostData(currentPost[0]);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setClickedPostData(currentPost[0]);
  }, [dispatch, currentPost]);

  return (
    <>
      {isLoading === true ? (
        <div>
          {" "}
          <h1>Loading...</h1>
        </div>
      ) : (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                size="small"
                float="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <CardContent>
                  <div>
                    <Card.Header>{clickedPostData.title}</Card.Header>
                    <Card.Meta>
                      {moment(clickedPostData.createdAt).fromNow()}
                    </Card.Meta>
                    <Card.Description>
                      {clickedPostData.message}
                    </Card.Description>
                    <Card.Description>
                      <Image src={clickedPostData.selectedFile} />
                    </Card.Description>
                  </div>
                </CardContent>
                <hr />
                <Card.Content extra>
                  {/* <LikeButton user={user} post={{ id, likeCount, likes }} /> */}
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log("comment on post")}
                  >
                    <Button basic color="purple">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="purple" pointing="left" />
                  </Button>

                  <Button
                    onClick={() => dispatch(likePost(clickedPostData._id))}
                    color="violet"
                    basic
                  >
                    <Icon name="like" />
                    <span>
                      {clickedPostData.likes &&
                        clickedPostData.likes.length > 0 &&
                        clickedPostData.likes.length}
                    </span>
                  </Button>
                  {/* {user && user.username === username && (
                      <DeleteButton postId={id} callback={deletePostCallback} />
                    )} */}
                </Card.Content>
              </Card>
              <CommentSection post={clickedPostData} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </>
  );
}

export default SinglePost;
