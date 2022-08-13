import React from "react";
import DrawerLeft from "../Components/Drawer";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { TextField, Button, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import axios from "axios";

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
  couponName: yup
    .string("Enter your Coupon code")
    .required("Coupon code  is required"),
  description: yup
    .string("Enter coupon description")
    .required("Description is required"),
  discountAmount: yup
    .string("Enter Amount in Rupees")
    .required("Discount Amount is required"),
  rule: yup
    .string("Select discount Rule")
    .required("Discount Rule is required"),
});
function AddCoupons() {
  const { drawerOpen } = useSelector((state) => state.userReducer);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
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
      couponName: "",
      discountAmount: "",
      description: "",
      rule: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, formikActions) => {
      try {
        const res = axios.post("http://localhost:50020/addNewCoupon", values);
        console.log(res);
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
                    id="couponName"
                    name="couponName"
                    label="COUPON NAME"
                    value={formik.values.couponName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.couponName &&
                      Boolean(formik.errors.couponName)
                    }
                    helperText={
                      formik.touched.couponName && formik.errors.couponName
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    RULE
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    name="rule"
                    label="RULE"
                    value={formik.values.rule}
                    onChange={formik.handleChange}
                    fullWidth
                    error={formik.touched.rule && Boolean(formik.errors.rule)}
                    helperText={formik.touched.rule && formik.errors.rule}
                  >
                    <MenuItem value=">1000">"Orders Amount > 1000"</MenuItem>
                    <MenuItem value=">2500">"Orders Amount > 2500"</MenuItem>
                    <MenuItem value=">5000">"Orders Amount > 5000"</MenuItem>
                    <MenuItem value=">10000">"Orders Amount > 10000"</MenuItem>
                    <MenuItem value=">15000">"Orders Amount > 15000"</MenuItem>
                    <MenuItem value=">20000">"Orders Amount > 20000"</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    fullWidth
                    id="discountAmount"
                    name="discountAmount"
                    label="DISCOUNT AMOUNT"
                    value={formik.values.discountAmount}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.discountAmount &&
                      Boolean(formik.errors.discountAmount)
                    }
                    helperText={
                      formik.touched.discountAmount &&
                      formik.errors.discountAmount
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="description"
                    label="DESCRIPTION"
                    name="description"
                    multiline
                    maxRows={5}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <Button color="primary" variant="contained" type="submit">
                    ADD COUPON
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Main>
    </div>
  );
}

export default AddCoupons;