import { API_BASE_URL, API_ROUTES } from "../../constants/ApiBaseUrl";
import Axios from "axios";

export const allCollectionData = (id) => async (dispatch) => {
  try {
    dispatch({ type: "COLLECTIONS_LIST_REQUEST" });
    const { data } = await Axios.get(
      `${API_BASE_URL}${API_ROUTES.COLLECTION.GET_ALL_COLLECTION}${id}`
    );

    dispatch({ type: "COLLECTIONS_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "COLLECTIONS_LIST_FAIL", payload: error });
  }
};
export const searchCollection = (searchkey, id) => async (dispatch) => {
  var filteredCollection;
  dispatch({ type: "COLLECTIONS_LIST_REQUEST" });
  try {
    const { data } = await Axios.get(
      `${API_BASE_URL}${API_ROUTES.COLLECTION.GET_ALL_COLLECTION}${id}`
    );

    filteredCollection = data.filter((collection) =>
      collection.name.toLowerCase().includes(searchkey)
    );

    dispatch({ type: "COLLECTIONS_LIST_SUCCESS", payload: filteredCollection });
  } catch (error) {
    dispatch({ type: "COLLECTIONS_LIST_FAIL", payload: error });
  }
};
