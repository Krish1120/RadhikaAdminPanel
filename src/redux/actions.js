export const SET_DRAWEROPEN = "SET_DRAWEROPEN";
export const SET_PRODUCTDATA = "SET_PRODUCTDATA";
export const SET_USERS = "SET_USERS";
export const SET_COUPONS = "SET_COUPONS";
export const SET_BANNERS = "SET_BANNERS";
export const SET_ISLOGGEDIN = "SET_ISLOGGEDIN";

export const setIsLoggedIn = (isLoggedIn) => (dispatch) => {
  dispatch({
    type: SET_ISLOGGEDIN,
    payload: isLoggedIn,
  });
};
export const setDrawerOpen = (drawerOpen) => (dispatch) => {
  dispatch({
    type: SET_DRAWEROPEN,
    payload: drawerOpen,
  });
};
export const setProductData = (productData) => (dispatch) => {
  dispatch({
    type: SET_PRODUCTDATA,
    payload: productData,
  });
};
export const setUsers = (users) => (dispatch) => {
  dispatch({
    type: SET_USERS,
    payload: users,
  });
};
export const setCoupons = (coupons) => (dispatch) => {
  dispatch({
    type: SET_COUPONS,
    payload: coupons,
  });
};
export const setBanners = (banners) => (dispatch) => {
  dispatch({
    type: SET_BANNERS,
    payload: banners,
  });
};
