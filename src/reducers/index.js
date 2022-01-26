import { combineReducers } from "redux";
import hotTub from './hotTub/index';
import stepper from './stepper/index';

export const rootReducer = combineReducers({
  hotTub,
  stepper
})