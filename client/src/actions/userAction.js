import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL} from '../constants/userConstants'
import axios from 'axios'

export const login = (email, password) => async(dispatch) => {//this is made possible by thunk. async(dispatch) is a callback function
    try {
        dispatch({type: USER_LOGIN_REQUEST})

        //By default, if the 2nd parameter to axios.post() is an object, 
        //Axios serializes the object to JSON using the JSON.stringify() function. 
        //If the 2nd parameter is an object, Axios also sets the content-type header to application/json, 
        //so most web frameworks, like Express, will be able to automatically convert the request body into a JavaScript object for you.
        const config = { //config只是为了让header数据显示成json形式
            headers: {
                "Content-Type": "application/json"
            }
        }

        //To override the content-type header in Axios, 
        //you should use the third parameter to axios.post(): the options parameter, which is the config below
        //Set the options.header['content-type'] option to set the content-type header
        const response = await axios.post("http://localhost:5000/api/users/login", {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data
        })

        localStorage.setItem("userInfo", JSON.stringify(response.data))

    } catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type: USER_LOGOUT})
}

export const register= (name, email, password) =>async(dispatch) => {
    try{
        dispatch({type: USER_REGISTER_REQUEST})

        //When sending POST requests (also PUT and PATCH requests) with Axios, 
        //note how we pass a normal Javascript object as data. 
        //Axios converts this Javascript data to JSON by default. 
        //It also sets the “content-type” header to “application/json”.

        //However, if you pass a serialized JSON object as data, 
        //Axios treats the content type as “application/x-www-form-urlencoded” (form-encoded request body). 
        //If the intended content type is JSON, you have to manually set the header using the “headers” config option.
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await axios.post("http://localhost:5000/api/users/register", {name, email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data
        })

        localStorage.setItem("userInfo", JSON.stringify(response.data))


    } catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
    }
}
