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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
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
  productName: yup
    .string("Enter your product name")
    .required("Product name  is required"),
  category: yup.string("Select your category").required("category is required"),
  forMenOrWomen: yup
    .string("Select for Men or Women")
    .required("Gender is required"),
  description: yup
    .string("Enter product description")
    .required("Description is required"),
  price: yup.string("Enter product Price").required("Price is required"),
  status: yup
    .string("Select availability")
    .required("Availability is required"),
});
const sizes = ["2.2", "2.4", "2.6", "2.8", "2.10", "24", "30", "36", "42"];
const materials = ["Gold", "Silver", "Crystal", "Bronze"];
const categories = [
  "Bangle",
  "Tika & Tyra",
  "Nath",
  "Mukut/Crown",
  "Earing & Tops",
  "Bahubali Earing",
  "Chowker",
  "Bajubandh",
  "Necklace",
  "Long Set",
  "Kamarbandh",
  "Chur",
  "Hath Panja",
  "Finger Ring",
  "Payal/Anklet",
  "Bridal Necklace",
  "Chain",
  "Mangalsutra",
  "Bracelet",
  "Pendent Set",
  "Tie Set",
  "Mantasha",
  "Khopa Jhapta",
  "Sakha & Pola",
];
function AddProducts() {
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
      productName: "",
      category: "",
      forMenOrWomen: "",
      description: "",
      size: [],
      material: [],
      price: "",
      status: "",
      images: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values, formikActions) => {
      const formData = new FormData();
      formData.append("productName", values.productName);
      formData.append("category", values.category);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("forMenOrWomen", values.forMenOrWomen);
      formData.append("material", values.material);
      formData.append("size", values.size);
      formData.append("status", values.status);
      for (let pic of values.images) {
        formData.append("productPicture", pic);
      }
      try {
        const res = axios.post(
          "https://radhika-admin-backend.herokuapp.com/addNewProduct",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
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
                    id="productName"
                    name="productName"
                    label="PRODUCT NAME"
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.productName &&
                      Boolean(formik.errors.productName)
                    }
                    helperText={
                      formik.touched.productName && formik.errors.productName
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    CATEGORY
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    name="category"
                    label="CATEGORY"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    fullWidth
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                  >
                    {categories.map((category) => {
                      return <MenuItem value={category}>{category}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    FOR MEN OR WOMEN
                  </FormLabel>
                  <RadioGroup
                    row
                    id="forMenOrWomen"
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="forMenOrWomen"
                    value={formik.values.forMenOrWomen}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="women"
                      control={<Radio />}
                      label="WOMEN"
                    />
                    <FormControlLabel
                      value="men"
                      control={<Radio />}
                      label="MEN"
                    />
                  </RadioGroup>
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
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    MATERIAL
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="material"
                    label="MATERIAL"
                    multiple
                    value={formik.values.material}
                    onChange={formik.handleChange}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {materials.map((material) => (
                      <MenuItem key={material} value={material}>
                        <Checkbox
                          checked={
                            formik.values.material.indexOf(material) > -1
                          }
                        />
                        <ListItemText primary={material} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                    id="price"
                    label="PRICE"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    STATUS
                  </FormLabel>
                  <RadioGroup
                    row
                    id="status"
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="available"
                      control={<Radio />}
                      label="AVAILABLE"
                    />
                    <FormControlLabel
                      value="unavailable"
                      control={<Radio />}
                      label="UNAVAILABLE"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <Button variant="contained" component="label">
                    Upload
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={(event) => {
                        formik.setFieldValue("images", [
                          ...formik.values.images,
                          event.target.files[0],
                        ]);
                      }}
                    />
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <Button color="primary" variant="contained" type="submit">
                    ADD PRODUCT
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

export default AddProducts;
