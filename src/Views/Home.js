import React, { useEffect } from "react";
import DrawerLeft from "../Components/Drawer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCoupons, setProductData } from "../redux/actions";
import ImageSlider from "../Components/Carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import { pink } from "@mui/material/colors";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginTop: "-3%",
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
      marginTop: "-3%",
    }),
  })
);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Home() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState({
    activeCard: null,
    products: null,
  });
  const [couponShow, setCouponShow] = React.useState({
    activeCard: null,
    couponsdata: null,
  });
  const dispatch = useDispatch();
  const fetchApi = async () => {
    try {
      const res = await axios.get(
        "https://radhika-admin-backend.herokuapp.com/viewAllProducts"
      );
      dispatch(setProductData(res.data));
      setShow({ ...show, products: res.data });
      const res2 = await axios.get(
        "https://radhika-admin-backend.herokuapp.com/viewAllCoupons"
      );
      setCouponShow({ ...couponShow, couponsdata: res2.data });
      dispatch(setCoupons(res2.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [value]);
  const { drawerOpen, productData, coupons } = useSelector(
    (state) => state.userReducer
  );

  function toggleActive(id) {
    setShow({ ...show, activeCard: show.products.filter((p) => p._id === id) });
  }
  function toggleInActive(id) {
    setShow({ ...show, activeCard: null });
  }
  function toggleActiveDelete(id) {
    if (show.products !== null) {
      let select = show.products.filter((p) => p._id === id);
      if (
        select.length > 0 &&
        show.activeCard !== null &&
        select[0]._id === show.activeCard[0]._id
      ) {
        return "active";
      } else {
        return "inactive";
      }
    }
  }
  function toggleActiveCoupon(id) {
    setCouponShow({
      ...couponShow,
      activeCard: couponShow.couponsdata.filter((p) => p._id === id),
    });
  }
  function toggleInActiveCoupon(id) {
    setCouponShow({ ...couponShow, activeCard: null });
  }
  function toggleActiveDeleteCoupon(id) {
    if (couponShow.couponsdata !== null) {
      let select = couponShow.couponsdata.filter((p) => p._id === id);
      if (
        select.length > 0 &&
        couponShow.activeCard !== null &&
        select[0]._id === couponShow.activeCard[0]._id
      ) {
        return "activeCoupon";
      } else {
        return "inactiveCoupon";
      }
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const notify = () =>
    toast.success("Product Deleted Successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  const notifyCoupon = () =>
    toast.success("Coupon Deleted Successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  return (
    <div>
      <DrawerLeft />
      <Main open={drawerOpen}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", borderRadius: 12 }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  sx: {
                    transition: "ease",
                    transitionDelay: "0.1s",
                    transitionDuration: "0.1s",
                    height: 48,
                    zIndex: -1,
                    borderTopLeftRadius: value === 0 ? 12 : 0,
                    borderBottomLeftRadius: value === 0 ? 12 : 0,
                    borderTopRightRadius: value === 1 ? 12 : 0,
                    borderBottomRightRadius: value === 1 ? 12 : 0,
                    backgroundColor: pink[300],
                  },
                }}
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab
                  label="Products"
                  style={{
                    fontSize: 18,
                    transition: "linear",
                    transitionDelay: "0.1s",
                    transitionDuration: "0.1s",
                    color: value !== 1 ? "white" : "grey",
                  }}
                  {...a11yProps(0)}
                />
                <Tab
                  label="Coupons"
                  style={{
                    fontSize: 18,
                    transition: "linear",
                    transitionDelay: "0.1s",
                    transitionDuration: "0.1s",
                    color: value === 1 ? "white" : "grey",
                  }}
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Grid container spacing={3} marginTop={1}>
                {productData &&
                  productData.map((product) => {
                    return (
                      <Grid key={product._id} item xs>
                        <Card sx={{ margin: 1, width: "20rem" }}>
                          <Typography
                            variant="h5"
                            component="div"
                            margin={1}
                            textAlign="center"
                          >
                            {product.productName}
                          </Typography>
                          <CardContent>
                            <div style={{ height: "20rem" }}>
                              <ImageSlider data={product.images} />
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography variant="body1" component="div">
                                Description :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                {product.description}
                              </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography variant="body1" component="div">
                                Quantity :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                {product.quantity}
                              </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography variant="body1" component="div">
                                Category :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                {product.category}
                              </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography variant="body1" component="div">
                                Price :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                Rs.
                                {product.price}/-
                              </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography variant="body1" component="div">
                                Available in :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                {product.material}
                              </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography variant="body1" component="div">
                                Available sizes :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                {product.size}
                              </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography variant="body1" component="div">
                                Status :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                {product.status}
                              </Typography>
                            </div>
                          </CardContent>
                          <CardActions
                            className={toggleActiveDelete(product._id)}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className="confirmDelete"
                              style={{
                                flexDirection: "column",
                              }}
                            >
                              <Typography style={{ marginBottom: 10 }}>
                                Product Will be Permanently Deleted.
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  onClick={() => toggleInActive(product._id)}
                                >
                                  No
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={async () => {
                                    try {
                                      const res = await axios.delete(
                                        `https://radhika-admin-backend.herokuapp.com/deleteProduct/${product._id}`
                                      );
                                      console.log(res);
                                      notify();
                                    } catch (error) {
                                      console.error(error);
                                    }
                                  }}
                                >
                                  Proceed
                                </Button>
                              </div>
                            </div>
                            <Button
                              className="deleteBtn"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => toggleActive(product._id)}
                            >
                              DELETE
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Grid container spacing={3} marginTop={1}>
                {coupons &&
                  coupons.map((coupon) => {
                    return (
                      <Grid key={coupon._id} item xs>
                        <Card sx={{ margin: 1, width: "20rem" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="h5"
                              component="div"
                              margin={1}
                              textAlign="center"
                            >
                              CODE :
                            </Typography>
                            <Typography
                              variant="h5"
                              component="div"
                              margin={1}
                              textAlign="center"
                            >
                              {coupon.couponName}
                            </Typography>
                          </div>
                          <CardContent>
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <Typography
                                variant="body1"
                                component="div"
                                minWidth={90}
                              >
                                Description :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                {coupon.description}
                              </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography variant="body1" component="div">
                                Rule :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                {coupon.rule}
                              </Typography>
                            </div>
                            <div style={{ display: "flex" }}>
                              <Typography variant="body1" component="div">
                                Discount Amount :
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                alignSelf="center"
                                marginLeft={1}
                              >
                                {coupon.discountAmount}
                              </Typography>
                            </div>
                          </CardContent>
                          <CardActions
                            className={toggleActiveDeleteCoupon(coupon._id)}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className="confirmCouponDelete"
                              style={{
                                flexDirection: "column",
                              }}
                            >
                              <Typography style={{ marginBottom: 10 }}>
                                Coupon Will be Permanently Deleted.
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    toggleInActiveCoupon(coupon._id)
                                  }
                                >
                                  No
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={async () => {
                                    try {
                                      const res = await axios.delete(
                                        `https://radhika-admin-backend.herokuapp.com/deleteCoupon/${coupon._id}`
                                      );
                                      notifyCoupon();
                                      console.log(res);
                                    } catch (error) {
                                      console.error(error);
                                    }
                                  }}
                                >
                                  Proceed
                                </Button>
                              </div>
                            </div>
                            <Button
                              className="deleteCouponBtn"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => toggleActiveCoupon(coupon._id)}
                            >
                              DELETE
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            </TabPanel>
          </Box>
        </div>
        <ToastContainer />
      </Main>
    </div>
  );
}
