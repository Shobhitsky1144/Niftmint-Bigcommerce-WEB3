const initialState = {
  loading: true,
  currentUser: null,
};

const BrandReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BRAND_LOGIN":
      return {
        loading: false,
        currentUser: action.payload,
      };
    case "BRAND_LOGOUT":
      return {
        currentUser: null,
      };
    default:
      return state;
  }
};
export default BrandReducer;
