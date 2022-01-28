import cn from "classnames";
import { productData, productsHeader } from "../helpers";
import defaultImageSmall from "../../../../assets/images/defaultImageSmall.png";
import "./style.css";

const CartPaymentsMethod = (props) => {

  const {radioValue, setRadioValue} = props;

  return (
    <div className="CartPaymentOrder">
      <div className="CartPaymentOrder-header">
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
                  className="CartPaymentOrder-product"
                  key={product.optionDesc}
                >
                  <div className="CartPaymentOrder-product-option">
                    {product.image && (
                      <div className="CartPaymentOrder-product-icon">
                        <img src={defaultImageSmall} alt="defaultImage" />
                      </div>
                    )}
                    <div className="CartPaymentOrder-option-text">
                      <p className="CartPaymentOrder-product-option-name">
                        {product.optionName}
                      </p>
                      <p className="CartPaymentOrder-product-option-amount">
                        <span>× </span>
                        {product.amount}
                      </p>
                      <p className="CartPaymentOrder-product-option-desc">
                        {product.optionDesc}
                      </p>
                    </div>
                  </div>
                  <p className="CartPaymentOrder-product-price">
                    {product.subtotal}
                  </p>
                </div>
              );
            })}
            <div className="CartPaymentOrder-totalSum">
              <p>Zwischensumme</p>
              <p>{item.totalSum}</p>
            </div>
          </div>
        );
      })}
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

export default CartPaymentsMethod;
