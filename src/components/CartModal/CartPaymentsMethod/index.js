import { useState } from "react";
import { useFormikContext } from "formik";
import cn from "classnames";
import { productData, paymentData, productsHeader } from "./helpers";
import injectMedia from "../../media";
import Checkbox from "../../Checkbox";
import CartPaymentOptions from "./CartPaymentOptions";
import defaultImageSmall from "../../../assets/images/defaultImageSmall.png";
import "./style.css";

const CartPaymentsMethod = (props) => {
  const { mobileCartQuery } = props;

  const [radioValue, setRadioValue] = useState("Abholung");

  const labelAgreement = (
    <span className="CartPaymentsMethod-order-agreement-label">
      Mit deiner Bestellung erklärst du dich mit unseren{" "}
      <a
        onClick={(e) => e.stopPropagation()}
        href={process.env.REACT_APP_TERMS_CONDITIONS}
        target="_blank"
        rel="noreferrer"
      >
        Allgemeinen Geschäftsbedingungen
      </a>
      ,{" "}
      <a
        href={process.env.REACT_APP_CANCELLATION_POLICY}
        target="_blank"
        rel="noreferrer"
      >
        Widerrufsbestimmungen
      </a>{" "}
      und{" "}
      <a
        href={process.env.REACT_APP_PRIVACY_POLICY}
        target="_blank"
        rel="noreferrer"
      >
        Datenschutzbestimmungen
      </a>{" "}
      einverstanden.
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
        <CartPaymentOptions/>
        <div className="CartPaymentsMethod-order">
          <div className="CartPaymentsMethod-order-agreement">
            <p>DEINE BESTELLUNG</p>
            <Checkbox
              checked={isAgreement}
              label={labelAgreement}
              setChecked={setIsAgreement}
            />
          </div>
          <div className="CartPaymentsMethod-order-content">
            <div className="CartPaymentsMethod-order-content-header">
              {productsHeader.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
            {Object.values(productData).map((item, index) => {
              return (
                <div key={index}>
                  {item.productOptions.map((product) => {
                    return (
                      <div
                        className="CartPaymentsMethod-order-content-product"
                        key={product.optionDesc}
                      >
                        <div className="CartPaymentsMethod-order-content-product-option">
                          {product.image && (
                            <div className="CartPaymentsMethod-order-content-product-icon">
                              <img src={defaultImageSmall} alt="defaultImage" />
                            </div>
                          )}
                          <div className="CartPaymentsMethod-order-content-product-option-text">
                            <p className="CartPaymentsMethod-order-content-product-option-name">
                              {product.optionName}
                            </p>
                            <p className="CartPaymentsMethod-order-content-product-option-amount">
                              <span>× </span>
                              {product.amount}
                            </p>
                            <p className="CartPaymentsMethod-order-content-product-option-desc">
                              {product.optionDesc}
                            </p>
                          </div>
                        </div>
                        <p className="CartPaymentsMethod-order-content-product-price">
                          {product.subtotal}
                        </p>
                      </div>
                    );
                  })}
                  <div className="CartPaymentsMethod-order-content-totalSum">
                    <p>Zwischensumme</p>
                    <p>{item.totalSum}</p>
                  </div>
                </div>
              );
            })}
            <div>
          <div className="CartPaymentsMethod-order-transportation">
                <p>Versand</p>
                <div className="CartPaymentsMethod-order-transportation-method">  {/*radio buttons*/}
                    <label className={cn("CartPaymentsMethod-order-transportation-method-radio", radioValue === "Abholung" && "checked")}>
                        <input type="radio"
                               value="Abholung"
                               checked={radioValue === "Abholung"}
                               onChange={(e) => {setRadioValue(e.target.value)}}
                        /> Abholung vor Ort
                    </label>
                    <label className={cn("CartPaymentsMethod-order-transportation-method-radio", radioValue === "Versandkosten" && "checked")}>
                        <input type="radio"
                               value="Versandkosten"
                               checked={radioValue === "Versandkosten"}
                               onChange={(e) => {setRadioValue(e.target.value)}}
                        /> Versandkosten: <b>500,00 €</b>
                    </label>
                </div>
            </div>

            <div className="CartPaymentsMethod-order-common">
                <p className="CartPaymentsMethod-order-common-name">Gesamtsumme</p>
                <p className="CartPaymentsMethod-order-common-price">2.960,00 €</p>
            </div>
            <div className="CartPaymentsMethod-order-VATIncluded">
                <p className="CartPaymentsMethod-order-VATIncluded-name">inkl. MwSt.</p>
                <p className="CartPaymentsMethod-order-VATIncluded-price">472,61 €</p>
            </div>
          </div>
        </div>
          </div>
        <button
          className="CartPaymentsMethod-box-button"
          onClick={onHandlerSubmit}
        >
          Jetzt kaufen
        </button>
      </div>
    </div>
  );
};

export default injectMedia(CartPaymentsMethod);
