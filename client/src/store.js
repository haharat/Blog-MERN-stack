import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {postListReducer, postCreateReducer, postUpdateReducer, postDeleteReducer, postDetailsReducer} from './reducers/postReducer'
import {userLoginReducer, userRegisterReducer} from './reducers/userReducer'

const reducer = combineReducers({
    postList: postListReducer,
    postCreate: postCreateReducer,
    postUpdate: postUpdateReducer,
    postDelete: postDeleteReducer,
    postDetails: postDetailsReducer,
    userLogin: userLoginReducer,     
    //this userLogin is a name key, it is used in useSelector((state) => state.userLogin)
    //it is also the name key list in state shown in Redux dev tool extension
    userRegister: userRegisterReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;