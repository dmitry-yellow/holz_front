import { ActionTypes } from "../../actions/cart";

const initialState = {
  userData: {},
  session: {},
  isFormSubmitting: false,
  isDelivery: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SUBMIT_FORM:
      return {
        ...state,
        isFormSubmitting: true,
      };
    case ActionTypes.SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isFormSubmitting: false,
      };
    case ActionTypes.SUBMIT_FORM_FAILURE:
      return {
        ...state,
        isFormSubmitting: false,
      };
      case ActionTypes.SET_KIND_OF_DELIVERY:
        return {
          ...state,
          isDelivery: action.payload,
        };
      case ActionTypes.SET_SESSION:
        return {
          ...state,
          session: action.payload,
        };
    default:
      return state;
  }
};

export default cartReducer;
