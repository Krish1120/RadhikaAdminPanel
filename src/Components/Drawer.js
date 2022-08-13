import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CategoryIcon from "@mui/icons-material/Category";
import Divider from "@mui/material/Divider";
import GroupIcon from "@mui/icons-material/Group";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DiscountIcon from "@mui/icons-material/Discount";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDrawerOpen } from "../redux/actions";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DrawerLeft() {
  const navigate = useNavigate();
  const { drawerOpen } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleDrawer = () => {
    if (drawerOpen === true) {
      dispatch(setDrawerOpen(false));
    } else {
      dispatch(setDrawerOpen(true));
    }
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={drawerOpen}
        sx={{ backgroundColor: pink[300], boxShadow: 0 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawer}
            sx={
              ({ ...(drawerOpen && { display: "none" }) },
              {
                backgroundColor: pink[900],
                borderRadius: "12px",
              })
            }
          >
            <MenuIcon
              sx={{
                color: "white",
              }}
            />
          </IconButton>
          <Typography
            sx={{
              color: "black",
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            RADHIKA JEWELLERY
          </Typography>
        </Toolbar>
      </AppBar>
      <Main open={drawerOpen}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader
          style={{ backgroundColor: "#f8bbd0", justifyContent: "center" }}
        >
          <Typography fontSize={24} fontWeight={500}>
            HELLO, ADMIN
          </Typography>
        </DrawerHeader>
        <Divider variant="middle" />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <DashboardIcon style={{ paddingRight: 5 }} />
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "500" }}>Dashboard</Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/addProduct");
              }}
            >
              <CategoryIcon style={{ paddingRight: 5 }} />
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "500" }}>
                    Add Product
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/addCoupon");
              }}
            >
              <DiscountIcon style={{ paddingRight: 5 }} />
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "500" }}>Add Coupon</Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/users");
              }}
            >
              <GroupIcon style={{ paddingRight: 5 }} />
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "500" }}>Users</Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/orders");
              }}
            >
              <ShoppingCartIcon style={{ paddingRight: 5 }} />
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "500" }}>Orders</Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
