import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getPost, deletePost } from '../actions/postAction';
import {
  Container, Box, Paper
} from '@mui/material';
import {POST_LIST_SUCCESS} from '../constants/postConstants'
import "../styles/Landing.css";

function ShowPost({ match }) {
  const postId = match.params.id
  //The way to find what match.params.id: 
  //in dev tool, click "Components", search component name, look in "props": history, match, etc.
  const postDetails = useSelector(state => state.postDetails);
  const { loading, post, error } = postDetails

  const postDelete = useSelector(state => state.postDelete);
  const { loading: loadingDelete, success, error: errorDelete } = postDelete

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {

    dispatch(getPost(postId))

  }, [postId, loading, dispatch])

  const handleDelete = (id) => {
    dispatch(deletePost(id))
    //history.push("/postList")
  }

  useEffect(() => {
    if(success) {
      dispatch({type: POST_LIST_SUCCESS})
      history.push("/postList")
    }
  }, [success])

  return (
    <div className="main">
    <Container maxWidth="sm" >
      <Paper sx={{ bgcolor: '#cfe8fc', margin: "16px" }} elevation={3} className="showPost">       
        <Box m={2} p={3}>
        <Link to={{ pathname: "/postList" }} style={{ textDecoration: 'none' }}>BACK</Link>
          <h2>{post?.title}</h2>
          {/* this "post" was destructed from postDetails above */}
          <small>Date: {post?.postedDate}</small>
          <p>{post?.description}</p>
            <Link to={`/postList/${post._id}/edit`} className='btn btn-info'>Edit</Link>
            <button className="btn btn-danger" type="button" onClick={()=>handleDelete(postId)}>Delete</button>
        </Box>
      </Paper>
    </Container>
    </div>  
  )
}

export default ShowPost;