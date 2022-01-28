import { useState } from "react";
import { useFormikContext } from "formik";
import Checkbox from "../../Checkbox";
import CartPaymentOptions from "./CartPaymentOptions";
import CartPaymentOrder from "./CartPaymentOrder";
import "./style.css";

const CartPaymentsMethod = (props) => {
  const [radioDeliveryValue, setRadioDeliveryValue] = useState("Abholung");

  const labelAgreement = (
    <span className="CartPaymentsMethod-order-agreement-label">
      Mit deiner Bestellung erklärst du dich mit unseren <a href={process.env.REACT_APP_TERMS_CONDITIONS} target="_blank" rel="noreferrer">
      Allgemeinen Geschäftsbedingungen </a>, <a href={process.env.REACT_APP_CANCELLATION_POLICY} target="_blank" rel="noreferrer">
      Widerrufsbestimmungen</a> und <a href={process.env.REACT_APP_PRIVACY_POLICY} target="_blank" rel="noreferrer">Datenschutzbestimmungen
      </a> einverstanden.
    </span>
  );

  const { submitForm } = useFormikContext();

  const [isAgreement, setIsAgreement] = useState(false);

  const onHandlerSubmit = () => {
    submitForm();
  };

  return (
    <div className="CartPaymentsMethod">
      <div className="CartPaymentsMethod-box">
        <CartPaymentOptions />
        <div className="CartPaymentsMethod-order">
          <div className="CartPaymentsMethod-order-agreement">
            <p>DEINE BESTELLUNG</p>
            <Checkbox
              checked={isAgreement}
              label={labelAgreement}
              setChecked={setIsAgreement}
              required={true}
            />
          </div>
          <CartPaymentOrder radioValue={radioDeliveryValue} setRadioValue={setRadioDeliveryValue} />
        </div>
        <button
          className="CartPaymentsMethod-box-button"
          onClick={onHandlerSubmit}
        >Jetzt kaufen
        </button>
      </div>
    </div>
  );
};

export default CartPaymentsMethod;
