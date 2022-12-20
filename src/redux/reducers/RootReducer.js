import { combineReducers } from "redux";
import CollectionReducer from "./CollectionReducer";
import BrandReducer from "./BrandReducer";

export const rootReducer = combineReducers({ CollectionReducer, BrandReducer });
