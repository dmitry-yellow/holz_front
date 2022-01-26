import cn from "classnames";
import { useStepper } from "../customHooks/useStepper";
import "./style.css";

const Stepper = ({children}) => {
    const {
        currentStep,
        steps, 
        setStep
    } = useStepper();

    return (
        <div className="Stepper">
            <div className="Stepper-header">
                {!!steps.length &&
                    steps.map((step, index) => (
                        <div className={cn("Stepper-header-item", currentStep === index ? 'completed' : '')}
                            key={step.id} onClick={() => {setStep(index)}}
                        >
                            <p>{step.name}</p>
                        </div>
                    ))}
            </div>
            <div className="Stepper-body">
                {children}
            </div>
        </div>)
};

export default Stepper;
