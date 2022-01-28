import CartModalContainerTitle from "./CartModalContainerTitle";
import { useSelector } from "react-redux";
import CartOrderOverview from "./CartOrderOverview";
import CartData from "./CartData";
import Stepper from "../Stepper";
import { StepperStep, StepperSteps } from "../Stepper/StepperSteps";
import Popup from "../Popup";
import "./style.css";

const CartModal = (props) => {
  const { onHandleCloseCartModal } = props;
  const isCartModalOpen = useSelector((state) => state.hotTub.isCartModalOpen);

  return (
    <Popup isModalOpen={isCartModalOpen} onHandleCloseModal={onHandleCloseCartModal}>
      <Stepper>
        <StepperSteps>
          <StepperStep id="first" name="Warenkorb">
            <CartModalContainerTitle />
            <CartData />
          </StepperStep>
          <StepperStep id="second" name="Bestellübersicht">
            <CartOrderOverview />
          </StepperStep>
          <StepperStep id="third" name="Bestellung ausgeführt"></StepperStep>
        </StepperSteps>
      </Stepper>
    </Popup>
  );
};

export default CartModal;
