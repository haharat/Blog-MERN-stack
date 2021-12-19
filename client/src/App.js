import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/Register";
import Login from "./components/Login";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import ShowPost from "./components/ShowPost";
import Landing from "./components/Landing";


function App() {
  return (
    <div className="App">
      <Header />
      {/* <SignUp /> */}
      <Switch>
      <Route path="/" component={Landing} exact />
      <Route exact path="/register" component={SignUp}  />
      <Route exact path="/login" component={Login}  />
      <Route exact path="/addPost" component={AddPost}  />
      <Route exact path="/postList" component={PostList}  />
      <Route exact path="/postList/:id" component={ShowPost} />
      <Route exact path="/postList/:id/edit" component={EditPost} />
      </Switch>
    </div>
  );
}

export default App;
