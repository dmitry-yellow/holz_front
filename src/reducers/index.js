import { combineReducers } from "redux";
import hotTub from './hotTub/index';
import stepper from './stepper/index';
import cart from './cart/index';

export const rootReducer = combineReducers({
  hotTub,
  stepper,
  cart
})