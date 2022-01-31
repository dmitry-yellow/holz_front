import { ActionTypes } from "../../actions/stepper";

const initialState = {
    steps: [],
    currentStep: 0
};

const stepperReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SET_STEPS:
            return {
                ...state,
                steps: payload.steps
            };
        case ActionTypes.SET_STEP:
            return {
                ...state,
                currentStep: payload.step
            };
        default:
            return state;
    }
};

export default stepperReducer;