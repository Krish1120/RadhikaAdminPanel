import React, { useState, useEffect } from "react";
import DrawerLeft from "../Components/Drawer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import fetcher from "../Components/axios";
import { setUsers } from "../redux/actions";
import { ToastContainer, toast } from "react-toastify";

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

function Orders() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  const notify = () =>
    toast.success("Order status updated Successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  const fetchApi = async () => {
    try {
      const res = await fetcher.get("/showOrders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUsersApi = async () => {
    try {
      const res = await fetcher.get("/viewAllUsers");
      dispatch(setUsers(res.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApi();
    fetchUsersApi();
  }, []);
  const { drawerOpen, productData, users } = useSelector(
    (state) => state.userReducer
  );
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
            <Grid container spacing={3}>
              {orders &&
                orders.map((order) => {
                  return (
                    <Grid item xs={12}>
                      <Card sx={{ margin: 1, padding: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            margin={1}
                            textAlign="center"
                          >
                            Order ID :
                          </Typography>
                          <Typography
                            component="div"
                            fontSize={16}
                            textAlign="center"
                          >
                            {order.razorpay_order_id}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            margin={1}
                            textAlign="center"
                            minwidth={150}
                          >
                            Razorpay Payment ID
                          </Typography>
                          <Typography variant="h6">:</Typography>
                          <Typography
                            component="div"
                            fontSize={16}
                            textAlign="center"
                            marginLeft={1}
                          >
                            {order.razorpay_payment_id}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            margin={1}
                            textAlign="center"
                          >
                            Shiprocket Order ID :
                          </Typography>
                          <Typography
                            component="div"
                            fontSize={16}
                            textAlign="center"
                          >
                            {order.shipRocketOrderId}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            margin={1}
                            textAlign="center"
                          >
                            Shiprocket Shipment ID :
                          </Typography>
                          <Typography
                            component="div"
                            fontSize={16}
                            textAlign="center"
                          >
                            {order.shipRocketShipmentId}
                          </Typography>
                        </div>
                        <CardContent>
                          <Grid container spacing={3}>
                            {order.products.map((prod) => {
                              return (
                                <Grid item xs={3}>
                                  <Card
                                    style={{
                                      margin: 5,
                                      padding: 5,
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={prod.product.images[0].imgUrl}
                                      alt="image"
                                      height="150rem"
                                      width="120rem"
                                    />
                                    <div style={{ margin: 1 }}>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography variant="body1">
                                          Name
                                        </Typography>
                                        <Typography variant="body1" marginX={1}>
                                          :
                                        </Typography>
                                        <Typography variant="body2">
                                          {prod.product.productName}
                                        </Typography>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography variant="body1">
                                          Size
                                        </Typography>
                                        <Typography variant="body1" marginX={1}>
                                          :
                                        </Typography>
                                        <Typography variant="body2">
                                          {prod.size}
                                        </Typography>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Typography variant="body1">
                                          Quantity
                                        </Typography>
                                        <Typography variant="body1" marginX={1}>
                                          :
                                        </Typography>
                                        <Typography variant="body2">
                                          {prod.quantity}
                                        </Typography>
                                      </div>
                                    </div>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                          <div>
                            {users &&
                              users
                                .filter((user) => {
                                  if (user._id === order.userID) {
                                    return user;
                                  }
                                })
                                .map((item) => {
                                  return (
                                    <div>
                                      <div style={{ display: "flex" }}>
                                        <Typography
                                          variant="body1"
                                          component="div"
                                        >
                                          Customer :
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          alignSelf="center"
                                          marginLeft={1}
                                        >
                                          {item.name}
                                        </Typography>
                                      </div>
                                      <div style={{ display: "flex" }}>
                                        <Typography
                                          variant="body1"
                                          component="div"
                                        >
                                          Phone :
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          alignSelf="center"
                                          marginLeft={1}
                                        >
                                          +91{item.phone}
                                        </Typography>
                                      </div>
                                    </div>
                                  );
                                })}
                          </div>
                          <div style={{ display: "flex" }}>
                            <Typography variant="body1" component="div">
                              Status
                            </Typography>
                            <Typography mx={1}>:</Typography>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="demo-simple-select-autowidth"
                              name="status"
                              label="STATUS"
                              autoWidth
                              value={order.status}
                              onChange={async (e) => {
                                try {
                                  const res = await fetcher.patch(
                                    `/updateOrder/${order._id}`,
                                    {
                                      status: e.target.value,
                                    }
                                  );
                                  fetchApi();
                                  notify();
                                } catch (error) {
                                  console.error(error);
                                }
                              }}
                              style={{ height: "30px", fontSize: 15 }}
                            >
                              <MenuItem value="PLACED">PLACED</MenuItem>
                              <MenuItem value="PENDING">PENDING</MenuItem>
                              <MenuItem value="PACKED">PACKED</MenuItem>
                              <MenuItem value="SHIPPED">SHIPPED</MenuItem>
                              <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                              <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                            </Select>
                          </div>
                          <div style={{ display: "flex" }}>
                            <Typography variant="body1" component="div">
                              Amount :
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              alignSelf="center"
                              marginLeft={1}
                            >
                              Rs.{order.amount}
                            </Typography>
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Typography
                              variant="body1"
                              component="div"
                              width={100}
                            >
                              Shipping Address
                            </Typography>
                            <Typography variant="body1">:</Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              alignSelf="center"
                              maxWidth={230}
                              marginLeft={2}
                            >
                              {order.address}
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </div>
        <ToastContainer />
      </Main>
    </div>
  );
}

export default Orders;
