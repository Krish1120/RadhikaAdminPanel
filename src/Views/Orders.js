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
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
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

function Orders() {
  const [orders, setOrders] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState([]);
  const fetchApi = async () => {
    try {
      const res = await axios.get(
        "https://radhika-admin-backend.herokuapp.com/showOrders"
      );
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  console.log(updatedStatus);
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
            <Grid container spacing={3} marginTop={1}>
              {orders &&
                orders.map((order) => {
                  return (
                    <Grid item xs={12}>
                      <Card sx={{ margin: 1, width: "20rem" }}>
                        <Typography
                          variant="h5"
                          component="div"
                          margin={1}
                          textAlign="center"
                        >
                          {order._id}
                        </Typography>
                        {/* <CardMedia
                            component="img"
                            style={{ height: "20rem" }}
                            alt={product.productName}
                            image={product.images[0].imgUrl}
                          /> */}
                        <CardContent>
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
                              {order.status}
                            </Typography>
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
                              {order.amount}
                            </Typography>
                          </div>
                          {/* <Grid item xs>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                              <InputLabel id="demo-simple-select-autowidth-label">
                                STATUS
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                name="status"
                                label="STATUS"
                                value={updatedStatus}
                                onChange={(e) => {
                                  setUpdatedStatus(e.target.value);
                                }}
                                fullWidth
                              >
                                <MenuItem value="PLACED">PLACED</MenuItem>
                                <MenuItem value="PENDING">PENDING</MenuItem>
                                <MenuItem value="PACKED">PACKED</MenuItem>
                                <MenuItem value="SHIPPED">SHIPPED</MenuItem>
                                <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                                <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid> */}
                        </CardContent>
                        <CardActions>
                          <Button
                            color="primary"
                            variant="contained"
                            // onClick={async () => {
                            //   try {
                            //     const res = await axios.delete(
                            //       `http://localhost:50020/deleteProduct/${product._id}`
                            //     );
                            //     console.log(res);
                            //   } catch (error) {
                            //     console.error(error);
                            //   }
                            // }}
                          >
                            UPDATE
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </div>
      </Main>
    </div>
  );
}

export default Orders;
