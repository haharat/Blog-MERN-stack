import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { TextField, Button, Typography, Paper, Grid, Container } from "@mui/material"
import axios from "axios";
import { updatePost } from '../actions/postAction';
import { useHistory, } from "react-router-dom"
import { POST_UPDATE_SUCCESS, POST_UPDATE_RESET } from '../constants/postConstants'
import "../styles/Landing.css";

const EditPost = ({ match }) => {
  const dispatch = useDispatch();
  const postId = match.params.id

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const postUpdate = useSelector(state => state.postUpdate);
  const { loading, success, post } = postUpdate
  console.log(post)

  const history = useHistory();


  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/posts/${postId}`);
      console.log(data)
      setPostTitle(data.title);
      setPostDescription(data.description);
    };

    fetching();

  }, [postId]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedPost = {
      title: postTitle,
      description: postDescription,
    };
    dispatch(updatePost(postId, updatedPost))
  };

  useEffect(() => {
    if (success) {
      history.push(`/postList/${postId}`)
      dispatch({type: POST_UPDATE_RESET, payload: post})
    }
  }, [success])

  return (
    <div className="main">
      <Container maxWidth="sm" >
        <Grid container spacing={2} >
          <Grid item xs={12} maxWidth="sm">
            <Paper elevation={3} style={{ margin: "20px" }} className="showPost">
              <Typography
                component="h4"
                variant="h4"
                align="center"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                Edit Post
              </Typography>
              {/* {selectedPost ? ( */}
              <form
                autoComplete="off"
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleUpdate}
              >
                <TextField
                  variant="filled"
                  name="title"
                  id="title"
                  label="title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />

                <TextField
                  variant="filled"
                  name="description"
                  id="description"
                  label="description"
                  multiline
                  rows={20}
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                />
                <Button type="submit" color="primary" variant="contained">
                  Submit update
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default EditPost;