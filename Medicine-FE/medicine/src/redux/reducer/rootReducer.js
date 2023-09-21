import { combineReducers } from "redux";
import userReducer from "../silce/userSlice";
import { cartReducer } from "../silce/cartSlice";

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default rootReducer;
  