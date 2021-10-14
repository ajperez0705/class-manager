import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  Image,
  Label,
  Form,
} from "semantic-ui-react";
import moment from "moment";
import { useSelector } from "react-redux";
import CommentSection from "../components/CommentSection";

function SinglePost(props) {
  //   const commentInputRef = useRef(null);
  const postId = props.match.params.postId;
  //   const [comment, setComment] = useState("");
  const [clickedPostData, setClickedPostData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const posts = useSelector((state) => state.posts);
  let postMarkup;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setIsLoading(true);
      const clickedPost = await posts?.filter((post) => post._id === postId);

      const { title, message, createdAt, selectedFile, likes, comments } =
        await clickedPost[0];

      setClickedPostData((prevState) => ({
        ...prevState,
        postId,
        title,
        message,
        createdAt,
        selectedFile,
        likes,
        comments,
      }));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid>
      {isLoading === true ? (
        <h1>Loading...</h1>
      ) : (
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
                  <Card.Description>{clickedPostData.message}</Card.Description>
                  <Card.Description>
                    {clickedPostData.selectedFile}
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
                {/* {user && user.username === username && (
                      <DeleteButton postId={id} callback={deletePostCallback} />
                    )} */}
              </Card.Content>
            </Card>
            <CommentSection post={clickedPostData} />
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
}

export default SinglePost;
