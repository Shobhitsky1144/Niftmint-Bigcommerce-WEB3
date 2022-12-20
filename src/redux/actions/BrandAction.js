export const loginBrand = (data) => (dispatch) => {
  dispatch({ type: "BRAND_LOGIN", payload: data });
};

export const logoutBrand = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: "BRAND_LOGOUT" });
};
