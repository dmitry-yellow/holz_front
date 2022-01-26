import { ActionTypes } from "../../actions/stepper";

export const defaultStepperState = {
    steps: [],
    currentStep: 0
};

const stepperReducer = (state = defaultStepperState, action) => {
    const { currentStep, steps } = state;
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
        case ActionTypes.INCREMENT_CURRENT_STEP:
            return {
                ...state,
                currentStep:
                    currentStep < steps.length - 1
                        ? currentStep + 1
                        : currentStep
            };
        case ActionTypes.DECREMENT_CURRENT_STEP:
            return {
                ...state,
                currentStep:
                    currentStep > 0
                        ? currentStep - 1
                        : currentStep
            };

        default:
            return state;
    }
};

export default stepperReducer;