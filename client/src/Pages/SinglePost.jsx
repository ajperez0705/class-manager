import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Icon,
  Image,
  Label,
  Sticky,
} from "semantic-ui-react";
import moment from "moment";
import { useSelector } from "react-redux";
import CommentSection from "../components/CommentSection";
import { likePost } from "../actions/posts";
import { useDispatch } from "react-redux";
import { BigHead } from "@bigheads/core";
import { profAvatar } from "../utils/profAvatar";
import { useParams } from "react-router";
import { getPosts } from "../actions/posts";

function SinglePost() {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [clickedPostData, setClickedPostData] = useState("");
  const dispatch = useDispatch();

  const currentPost = useSelector((state) => {
    const allPosts = state.posts;
    return allPosts.filter((p) => p?._id === postId);
  });

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    if (currentPost.length === 1) {
      setClickedPostData(currentPost[0]);
    }
  }, [currentPost.length, currentPost, postId]);

  return (
    <Container>
      {!clickedPostData && <h1>No data to show</h1>}
      {clickedPostData && (
        <Grid className="single-post-grid" centered>
          <Grid.Row>
            <Grid.Column width={2}>
              <Sticky>
                <BigHead {...JSON.parse(profAvatar)} />
              </Sticky>
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <CardContent>
                  <Card.Header>{clickedPostData.title}</Card.Header>
                  <Card.Meta>
                    {moment(clickedPostData.createdAt).fromNow()}
                  </Card.Meta>
                  <Card.Description>{clickedPostData.message}</Card.Description>
                  <Card.Description className="single-post_image">
                    <Image src={clickedPostData.selectedFile} />
                  </Card.Description>
                </CardContent>
                <hr />
                <Card.Content extra>
                  {/* <LikeButton user={user} post={{ id, likeCount, likes }} /> */}

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
                  <Button
                    // as="div"
                    onClick={() => console.log("comment on post")}
                    color="violet"
                    basic
                  >
                    <Icon name="comments" />
                    <span>
                      {clickedPostData.comments &&
                        clickedPostData.comments.length > 0 &&
                        clickedPostData.comments.length}
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
    </Container>
  );
}

export default SinglePost;
