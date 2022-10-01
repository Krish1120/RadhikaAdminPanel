import React, { useEffect, useState } from "react";
import DrawerLeft from "../Components/Drawer";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
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
import { useLocation, useNavigate } from "react-router-dom";

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

const sizes = [
  "2.2",
  "2.4",
  "2.6",
  "2.8",
  "2.10",
  "24",
  "30",
  "36",
  "42",
  "FREE",
];
function EditSize() {
  const data = useLocation().state;
  const navigate = useNavigate();
  const { drawerOpen } = useSelector((state) => state.userReducer);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const notify = () =>
    toast.success("Product Size Updated Successfully!", {
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
      productId: data.product._id,
      productName: data.product.productName,
      size: data.product.size[0].split(","),
    },
    onSubmit: (values, formikActions) => {
      try {
        const res = fetcher.patch(`/updateProductSize/${values.productId}`, {
          size: values.size.toString(),
        });
        formikActions.resetForm();
        navigate("/home");
        notify();
      } catch (error) {
        console.error(error);
      }
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
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h4" m={2}>
                    Edit Size of {formik.values.productName}
                  </Typography>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      SIZE
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      name="size"
                      label="SIZE"
                      multiple
                      value={formik.values.size}
                      onChange={formik.handleChange}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {sizes.map((size) => (
                        <MenuItem key={size} value={size}>
                          <Checkbox
                            checked={formik.values.size.indexOf(size) > -1}
                          />
                          <ListItemText primary={size} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
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
                      UPDATE PRODUCT SIZE
                    </Button>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Main>
    </div>
  );
}

export default EditSize;
