import React, { useEffect, useState } from "react";
import DrawerLeft from "../Components/Drawer";
import { useFormik } from "formik";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { TextField, Button, Box, Card } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
import { setBanners } from "../redux/actions";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const validationSchema = yup.object({
  screen: yup.string("Select your screen").required("Screen is required"),
});

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

function Banners() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { drawerOpen, banners } = useSelector((state) => state.userReducer);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchApi = async () => {
    try {
      const res = await fetcher.get("/viewAllBanners");
      dispatch(setBanners(res.data));
      console.log(banners);
    } catch (error) {
      console.error(error);
    }
  };
  const notify = () =>
    toast.success("Banner Added Successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  const notify2 = () =>
    toast.success("Banner Deleted Successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  const formik = useFormik({
    initialValues: {
      screen: "",
      images: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values, formikActions) => {
      const formData = new FormData();
      formData.append("screen", values.screen);
      for (let pic of values.images) {
        formData.append("productPicture", pic);
      }
      try {
        const res = fetcher.post("/addNewBanner", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      formikActions.resetForm();
      notify();
      handleClose();
      fetchApi();
    },
  });
  const onSelectFile = (e) => {
    formik.setFieldValue("images", [
      ...formik.values.images,
      ...e.target.files,
    ]);
  };
  const deleteHandler = (key) => {
    let arr = [...formik.values.images];
    arr.splice(key, 1);
    formik.setFieldValue("images", arr);
  };

  useEffect(() => {
    fetchApi();
  }, []);
  const Banner = () => {
    return (
      <Grid container spacing={3} marginTop={1}>
        {banners &&
          banners.map((item, key) => {
            return (
              <Grid key={key} item xs>
                <Card
                  sx={{
                    margin: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.bannerImage[0].imgUrl}
                    alt="image"
                    height="200rem"
                    width="400rem"
                    style={{ borderRadius: 24 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" component="div" minWidth={50}>
                      SCREEN :
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      alignSelf="center"
                      marginLeft={1}
                      maxWidth="70%"
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      {item.screen}
                    </Typography>
                  </div>
                  <Button
                    sx={{
                      width: "6rem",
                      marginY: 1,
                      marginRight: 2,
                    }}
                    className="deleteBtn"
                    color="error"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={async () => {
                      try {
                        const res = await fetcher.delete(
                          `/deleteBanner/${item._id}`
                        );
                        console.log(res);
                        notify2();
                        fetchApi();
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    DELETE
                  </Button>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    );
  };
  return (
    <div>
      <DrawerLeft />
      <Main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        open={drawerOpen}
      >
        <Button
          sx={{ margin: 5 }}
          className="deleteBtn"
          color="primary"
          variant="contained"
          onClick={handleOpen}
        >
          ADD BANNER
        </Button>
        <Banner />
      </Main>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Grid container spacing={12}>
                <Grid item xs>
                  <FormControl sx={{ m: 1, minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      SCREEN
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      name="screen"
                      label="SCREEN"
                      value={formik.values.screen}
                      onChange={formik.handleChange}
                      fullWidth
                      error={
                        formik.touched.screen && Boolean(formik.errors.screen)
                      }
                      helperText={formik.touched.screen && formik.errors.screen}
                    >
                      {categories.map((category) => {
                        return <MenuItem value={category}>{category}</MenuItem>;
                      })}
                    </Select>
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
                        variant="contained"
                        component="label"
                        style={{
                          fontSize: 20,
                          borderRadius: 12,
                        }}
                      >
                        Upload
                        <input
                          disabled={
                            formik.values.images.length === 1 ? true : false
                          }
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={onSelectFile}
                        />
                      </Button>
                    </FormControl>
                  </div>
                  <PreviewImage
                    filesData={formik.values.images}
                    deleteHandler={deleteHandler}
                  />
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
                        ADD BANNER
                      </Button>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Banners;
