import React, { useState } from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setIsLoggedIn } from "../redux/actions";

const PrivateRoute = (props) => {
  const { children } = props;
  const { isLoggedIn } = useSelector((state) => state.userReducer);

  return isLoggedIn === true ? children : <Navigate to="/" />;
};

export default PrivateRoute;
