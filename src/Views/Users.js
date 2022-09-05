import React, { useEffect, useState } from "react";
import DrawerLeft from "../Components/Drawer";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import fetcher from "../Components/axios";
import { setUsers } from "../redux/actions";

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

const columns = [
  {
    field: "status",
    headerName: "Login Status",
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "phone",
    headerName: "Contact No.",
    width: 100,
  },
  {
    field: "address",
    headerName: "Full Address",
    width: 400,
  },
  {
    field: "state",
    headerName: "State",
    width: 180,
  },
  {
    field: "pincode",
    headerName: "Pincode",
    width: 100,
  },
];

function Users() {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const { drawerOpen, users } = useSelector((state) => state.userReducer);
  const fetchApi = async () => {
    try {
      const res = await fetcher.get("/viewAllUsers");
      dispatch(setUsers(res.data));
      console.log(users);
      if (users) {
        for (let i = 0; i < users.length; i++) {
          let id = users[i]._id;
          let itemIndex = rows.findIndex((u) => u.id === id);
          if (itemIndex <= -1) {
            setRows([
              ...rows,
              {
                id: `${users[i]._id}`,
                name: users[i].name,
                email: users[i].email,
                phone: users[i].phone,
                address: `${
                  users[i].address +
                  "," +
                  users[i].state +
                  "," +
                  users[i].pincode
                }`,
                state: users[i].state,
                pincode: users[i].pincode,
                status: users[i].status ? "ONLINE" : "OFFLINE",
              },
            ]);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, [users]);
  return (
    <div>
      <DrawerLeft />
      <Main open={drawerOpen}>
        <div
          style={{
            margin: "0 3%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box sx={{ height: "80vh", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              loading={rows.length === 0}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
            />
          </Box>
        </div>
      </Main>
    </div>
  );
}

export default Users;
