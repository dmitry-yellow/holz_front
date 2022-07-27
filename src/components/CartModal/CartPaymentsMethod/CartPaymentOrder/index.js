import React from "react";
import cn from "classnames";
import {productsHeader, toEuroAmount, totalSum} from "../helpers";
import {useSelector} from "react-redux";
import CartPaymentProduct from "./CartPaymentProduct";
import {Loader} from "../../../Loader";
import "./style.css";

const CartPaymentOrder = (props) => {

  const {radioValue, setRadioValue} = props;

  const cartData = useSelector(state => state.hotTub.cart);

  if (!cartData) {
    return (
        <div className="CartPaymentOrderWrapper">
          <Loader />
        </div>
    );;
  }

  return (
    <div className="CartPaymentOrder">
      <div className="CartPaymentOrder-header">
        {productsHeader.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
        {cartData.map((item, i) => {
            return <React.Fragment key={i}>
            {Object.values(item).map((product) => {
              return <CartPaymentProduct key={product.object?._main.id} product={product} />
            })}
            <div className="CartPaymentOrder-totalSum">
              <p>Zwischensumme</p>
              <p>{toEuroAmount(totalSum(item))}</p>
            </div>
            </React.Fragment>
            }
        )}
      <div>
        <div className="CartPaymentOrder-transportation">
          <p>Versand</p>
          <div className="CartPaymentOrder-transportation-method">
            <label className={cn("CartPaymentOrder-transportation-method-radio", {"checked": radioValue === "Abholung"})}>
              <input
                type="radio"
                value="Abholung"
                checked={radioValue === "Abholung"}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                }}
              />Abholung vor Ort
            </label>
            <label className={cn("CartPaymentOrder-transportation-method-radio", {"checked": radioValue === "Versandkosten"})}>
              <input
                type="radio"
                value="Versandkosten"
                checked={radioValue === "Versandkosten"}
                onChange={(e) => {
                  setRadioValue(e.target.value);
                }}
              />Versandkosten: <b>500,00 €</b>
            </label>
          </div>
        </div>
        <div className="CartPaymentOrder-common">
          <p className="CartPaymentOrder-common-name">Gesamtsumme</p>
          <p className="CartPaymentOrder-common-price">2.960,00 €</p>
        </div>
        <div className="CartPaymentOrder-VATIncluded">
          <p className="CartPaymentOrder-VATIncluded-name">inkl. MwSt.</p>
          <p className="CartPaymentOrder-VATIncluded-price">472,61 €</p>
        </div>
      </div>
    </div>
  );
};

export default CartPaymentOrder;
