export const ActionTypes = {
  SUBMIT_FORM: "CART/SUBMIT_FORM",
  SUBMIT_FORM_SUCCESS: "CART/SUBMIT_FORM_SUCCESS",
  SUBMIT_FORM_FAILURE: "CART/SUBMIT_FORM_FAILURE",
  SET_NEED_FOR_DELIVERY: "CART/SET_KIND_OF_DELIVERY",
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
