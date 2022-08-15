import React, { useEffect } from "react";
import DrawerLeft from "../Components/Drawer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCoupons, setProductData } from "../redux/actions";
import ImageSlider from "../Components/Carousel";

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

export default function Home() {
  const [value, setValue] = React.useState("one");
  const dispatch = useDispatch();
  const fetchApi = async () => {
    try {
      const res = await axios.get(
        "https://radhika-admin-backend.herokuapp.com/viewAllProducts"
      );
      dispatch(setProductData(res.data));
      const res2 = await axios.get(
        "https://radhika-admin-backend.herokuapp.com/viewAllCoupons"
      );
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              centered
            >
              <Tab value="one" label="Products" style={{ fontSize: 18 }} />
              <Tab value="two" label="Coupons" style={{ fontSize: 18 }} />
            </Tabs>
            {value === "one" && (
              <Grid container spacing={3} marginTop={1}>
                {productData &&
                  productData.map((product) => {
                    return (
                      <Grid item xs>
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
                          <CardActions>
                            <Button
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={async () => {
                                try {
                                  const res = await axios.delete(
                                    `https://radhika-admin-backend.herokuapp.com/deleteProduct/${product._id}`
                                  );
                                  console.log(res);
                                } catch (error) {
                                  console.error(error);
                                }
                              }}
                            >
                              DELETE
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            )}
            {value === "two" && (
              <Grid container spacing={3} marginTop={1}>
                {coupons &&
                  coupons.map((coupon) => {
                    return (
                      <Grid item xs>
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
                          <CardActions>
                            <Button
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={async () => {
                                try {
                                  const res = await axios.delete(
                                    `https://radhika-admin-backend.herokuapp.com/deleteCoupon/${coupon._id}`
                                  );
                                  console.log(res);
                                } catch (error) {
                                  console.error(error);
                                }
                              }}
                            >
                              DELETE
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            )}
          </Box>
        </div>
      </Main>
    </div>
  );
}
