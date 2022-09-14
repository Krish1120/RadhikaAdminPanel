import React, { useState } from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../redux/actions";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, password, isLoggedIn } = useSelector(
    (state) => state.userReducer
  );
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid
          item
          xs={3}
          sx={{
            backgroundColor: "pink",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: 2,
            minHeight: "50vh",
            minWidth: "300px",
          }}
        >
          <h2>ADMIN LOGIN</h2>
          <TextField
            sx={{ minWidth: "100%", backgroundColor: "white", borderRadius: 1 }}
            required
            id="outlined-username-input"
            label="User"
            autoComplete="current-password"
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <TextField
            sx={{ minWidth: "100%", backgroundColor: "white", borderRadius: 1 }}
            required
            id="outlined-password-input"
            label="Password"
            autoComplete="current-password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              if (user === username && pass === password) {
                navigate("/home");
                dispatch(setIsLoggedIn(true));
              } else {
                alert("Enter Valid username / password");
              }
            }}
            color="success"
            variant="contained"
          >
            LOGIN
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
