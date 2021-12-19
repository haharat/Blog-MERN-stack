import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {logout} from  '../actions/userAction'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Header = () => {
 const dispatch = useDispatch()
 const userLogin = useSelector(state => state.userLogin)
 const {userInfo} = userLogin

  const handleLogout = () => {
    dispatch(logout())
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MERN Blog APP
          </Typography>
          {userInfo ? (
            <>
              <Typography variant="p" component="p">
                Welcome {userInfo.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" href="/login">
                Login
              </Button>
              <Button color="inherit" href="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
