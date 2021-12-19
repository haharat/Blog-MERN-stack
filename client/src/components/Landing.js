import React, { useEffect } from "react";
import { Button, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Landing({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo) {
//       history.push("/");
//     }
//   }, [history, userInfo]);

  return (
    <div className="main">
      <Container>
        <Grid>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to MERN Blog</h1>
              <p className="subtitle">Record of your life stories</p>
            </div>
            <div className="buttonContainer">
              <Link to="/postList">
                <Button size="lg" className="landingbutton">
                  Continue to read...
                </Button>
              </Link>
              {/* <Link to="/register">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </Link> */}
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default Landing;
