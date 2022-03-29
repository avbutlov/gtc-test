import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {formReducer} from "./reducer/form";

const store = createStore(formReducer, applyMiddleware(thunk));

export default store;