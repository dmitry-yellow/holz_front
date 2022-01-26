import CartModalContainerTitle from "./CartModalContainerTitle";
import MadeInGermanyLogo from "./MadeInGermanyLogo";
import { useSelector } from "react-redux";
import { CloseIcon } from "./CloseIcon";
import cn from "classnames";
import CartOrderOverview from "./CartOrderOverview";
import "./style.css";
import CartData from "./CartData";
import Stepper from "../Stepper";
import { StepperStep, StepperSteps } from "../Stepper/StepperSteps";

const CartModal = (props) => {
  const { onHandleCloseCartModal } = props;
  const isCartModalOpen = useSelector((state) => state.hotTub.isCartModalOpen);

  return (
    <div className={cn("CartModal", isCartModalOpen && "visible")}>
      {/*<MadeInGermanyLogo />*/}
      <CloseIcon onHandleCloseCartModal={onHandleCloseCartModal} />
      <div className="CartModal-container">
        <Stepper>
          <StepperSteps>
            <StepperStep id="first" name="Warenkorb">
              <CartModalContainerTitle />
              <CartData />
            </StepperStep>
            <StepperStep id="second" name="Bestellübersicht">
              <CartOrderOverview />
            </StepperStep>
            <StepperStep id="third" name="Bestellung ausgeführt">
            </StepperStep>
          </StepperSteps>
        </Stepper>
      </div>
    </div>
  );
};

export default CartModal;
