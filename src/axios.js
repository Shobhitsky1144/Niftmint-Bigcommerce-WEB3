import Axios from "axios";
import { API_BASE_URL } from "./constants/ApiBaseUrl";

const API = Axios.create({ baseURL: API_BASE_URL });

export default API;
