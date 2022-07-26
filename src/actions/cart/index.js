import {createDataForSubmitOrder, createDataForUser} from "./helper";
import {hotTubAPI} from "../../api";

export const ActionTypes = {
  SUBMIT_FORM: "CART/SUBMIT_FORM",
  SUBMIT_FORM_SUCCESS: "CART/SUBMIT_FORM_SUCCESS",
  SUBMIT_FORM_FAILURE: "CART/SUBMIT_FORM_FAILURE",
  SET_KIND_OF_DELIVERY: "CART/SET_KIND_OF_DELIVERY",
  SET_SESSION: "CART/SET_SESSION",
};

export const setUserDataSuccess = (payload) => {
  return {
      type: ActionTypes.SUBMIT_FORM_SUCCESS,
      payload: payload
  };
}

export const setNeedForDelivery = (payload) => {
  return {
      type: ActionTypes.SET_KIND_OF_DELIVERY,
      payload: payload
  };
}

export const setUserSession = (payload) => {
  return {
      type: ActionTypes.SET_SESSION,
      payload: payload
  };
}

export const setUserData = (data, session) => async(dispatch) => {
  // const formData = createDataForUser(data);
  const formData = createDataForSubmitOrder(data);
  formData.sesion = session;
  console.log(formData);
  const response = await hotTubAPI.submitOrder(formData);
    console.log('submitOrder', response)
}
