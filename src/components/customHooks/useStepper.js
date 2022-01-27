import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../../actions/stepper"

export const useStepper = () => {
    const { currentStep, steps } = useSelector(state => state.stepper);
    const dispatch = useDispatch();

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
        setSteps,
        setStep,
        currentStep,
        steps
    }
}