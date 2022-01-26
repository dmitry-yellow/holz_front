import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../../actions/stepper"

export const useStepper = () => {
    const { currentStep, steps } = useSelector(state => state.stepper);
    const dispatch = useDispatch();

    const incrementCurrentStep = useCallback(() => {
        dispatch({
            type: ActionTypes.INCREMENT_CURRENT_STEP
        });
    }, [dispatch]);

    const decrementCurrentStep = useCallback(() => {
        dispatch({
            type: ActionTypes.DECREMENT_CURRENT_STEP
        });
    }, [dispatch]);

    const setSteps = useCallback(steps => {
        dispatch({ 
            type: ActionTypes.SET_STEPS, payload: { steps } 
        })
    }, [dispatch]);

    const setStep = useCallback(step => {
        dispatch({ 
            type: ActionTypes.SET_STEP, payload: { step } 
        })
    }, [dispatch]);

    return {
        incrementCurrentStep,
        decrementCurrentStep,
        setSteps,
        setStep,
        currentStep,
        steps
    }
}