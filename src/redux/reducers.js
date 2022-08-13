import {
  SET_DRAWEROPEN,
  SET_PRODUCTDATA,
  SET_USERS,
  SET_COUPONS,
} from "./actions";

const initialState = {
  drawerOpen: false,
  productData: "",
  users: "",
  coupons: "",
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_DRAWEROPEN":
      return { ...state, drawerOpen: action.payload };
    case "SET_PRODUCTDATA":
      return { ...state, productData: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_COUPONS":
      return { ...state, coupons: action.payload };
    default:
      return state;
  }
}
export default userReducer;
