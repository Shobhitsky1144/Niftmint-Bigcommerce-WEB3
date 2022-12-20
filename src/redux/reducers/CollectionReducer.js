const initialState = {
  collection: [],
};

const CollectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COLLECTIONS_LIST_REQUEST":
      return {
        loading: true,
      };
    case "COLLECTIONS_LIST_SUCCESS":
      return {
        loading: false,
        success: true,
        collection: action.payload,
      };
    case "COLLECTIONS_LIST_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default CollectionReducer;
