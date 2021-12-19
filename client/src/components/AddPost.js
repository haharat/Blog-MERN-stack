import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Container
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { createPost } from "../actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { POST_LIST_SUCCESS, POST_CREATE_RESET } from '../constants/postConstants'
import "../styles/Landing.css";

const AddPost = () => {
  const dispatch = useDispatch();
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const postCreate = useSelector((state) => state.postCreate)
  const { loading, success, post } = postCreate

  const history = useHistory();

  useEffect(() => {
    if (success) {
      dispatch({ type: POST_LIST_SUCCESS })
      history.push("/postList")
      dispatch({type: POST_CREATE_RESET, payload: post})
    }
  }, [success])

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(createPost({ title: postTitle, description: postDescription }))
  };

  return (
    <div className="main">
      <Container maxWidth="sm" >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ margin: "20px" }} className="showPost">
              <Typography
                component="h4"
                variant="h4"
                align="center"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                Add Post
              </Typography>
              <form
                autoComplete="off"
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleAdd}
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


                <Button type="submit" disabled={loading} color="primary" variant="contained" onSubmit={handleAdd}>
                  Publish Post
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AddPost;