import React, { useEffect, useState } from "react";
import DrawerLeft from "../Components/Drawer";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { TextField, Button, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import PreviewImage from "../Components/PreviewImage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetcher from "../Components/axios";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  })
);

const validationSchema = yup.object({
  title: yup
    .string("Enter notification title")
    .required("Notification title  is required"),
  body: yup
    .string("Enter notification body")
    .required("Notification body is required"),
});
function PushNotification() {
  const { drawerOpen } = useSelector((state) => state.userReducer);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const notify = () =>
    toast.success("Notification sent successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, formikActions) => {
      try {
        const res = fetcher.post("/sendNotification", values);
        console.log(res);
        // console.log(values);
        notify();
      } catch (error) {
        console.error(error);
      }
      formikActions.resetForm();
    },
  });
  return (
    <div>
      <DrawerLeft />
      <Main open={drawerOpen}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Grid container spacing={12}>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="TITLE"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="body"
                    label="BODY"
                    name="body"
                    multiline
                    maxRows={5}
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FormControl sx={{ m: 1 }}>
                    <Button
                      color="success"
                      variant="contained"
                      type="submit"
                      style={{
                        fontSize: 20,
                        borderRadius: 12,
                        alignSelf: "center",
                      }}
                    >
                      SEND NOTIFICATION
                    </Button>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          </Box>
        </form>
        <ToastContainer />
      </Main>
    </div>
  );
}

export default PushNotification;
