import axios from "axios";
import {
  POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_LIST_FAIL,
  POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_CREATE_FAIL,
  POST_UPDATE_REQUEST, POST_UPDATE_SUCCESS, POST_UPDATE_FAIL,
  POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAIL,
  POST_DETAILS_REQUEST, POST_DETAILS_SUCCESS, POST_DETAILS_FAIL
} from '../constants/postConstants'

export const listPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST })

    const response = await axios.get("http://localhost:5000/api/posts")

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const createPost = (data) => async (dispatch, getState) => {
  try {
    dispatch({type: POST_CREATE_REQUEST})

    const {userLogin: {userInfo}} = getState()
    //The way to find header info (content-type, Authorization etc. ):
    //in dev tool, click "Network", click data with desired name (eg. posts), click "Headers" on the right
    //you can also see "request payload" there
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.post('http://localhost:5000/api/posts', data, config)

    dispatch({type: POST_CREATE_SUCCESS, payload: response.data})

  } catch(error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getPost = (id) => async(dispatch) => {
  try {
    dispatch({type: POST_DETAILS_REQUEST})

    const response = await axios.get(`http://localhost:5000/api/posts/${id}`)

    dispatch({type: POST_DETAILS_SUCCESS, payload: response.data})
  } catch(error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const updatePost = (id, post) => async (dispatch, getState) => {
  try{
    dispatch({type: POST_UPDATE_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.put(`http://localhost:5000/api/posts/${id}`, post, config)

    dispatch({type: POST_UPDATE_SUCCESS, payload: response.data})
  }catch(error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deletePost = (id) => async (dispatch, getState) => {
  try{
    dispatch({type: POST_DELETE_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.delete(`http://localhost:5000/api/posts/${id}`, config)

    dispatch({type: POST_DELETE_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


