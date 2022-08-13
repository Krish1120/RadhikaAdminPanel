import Home from "./Views/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./Views/Users";
import Orders from "./Views/Orders";
import AddProducts from "./Views/AddProduct";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import AddCoupons from "./Views/AddCoupon";

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
              <Route path="/" element={<Home></Home>}></Route>
              <Route
                path="/addProduct"
                element={<AddProducts></AddProducts>}
              ></Route>
              <Route path="/users" element={<Users></Users>}></Route>
              <Route path="/orders" element={<Orders></Orders>}></Route>
              <Route
                path="/addCoupon"
                element={<AddCoupons></AddCoupons>}
              ></Route>
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
