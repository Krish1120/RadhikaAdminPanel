import Home from "./Views/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Views/Users";
import Orders from "./Views/Orders";
import AddProducts from "./Views/AddProduct";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import AddCoupons from "./Views/AddCoupon";
import EditProducts from "./Views/EditProduct";
import Banners from "./Views/Banners";
import PushNotification from "./Views/PushNotification";
import Login from "./Views/Login";
import PrivateRoute from "./Components/PrivateRoute";
import EditSize from "./Components/EditSize";
import { ToastContainer, toast } from "react-toastify";

const theme = createTheme({
  typography: {
    fontFamily: ["Questrial", "sans - serif"].join(","),
  },
});
function App() {
  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Login></Login>}></Route>
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/addProduct"
                element={
                  <PrivateRoute>
                    <AddProducts />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/editProduct"
                element={
                  <PrivateRoute>
                    <EditProducts />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/editSize"
                element={
                  <PrivateRoute>
                    <EditSize />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/addBanner"
                element={
                  <PrivateRoute>
                    <Banners />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/sendNotification"
                element={
                  <PrivateRoute>
                    <PushNotification />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <Users />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/addCoupon"
                element={
                  <PrivateRoute>
                    <AddCoupons />
                  </PrivateRoute>
                }
              ></Route>
            </Routes>
          </Router>
        </div>
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
