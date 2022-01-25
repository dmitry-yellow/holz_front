import React from "react";
import { useFormikContext } from "formik";
import { productData, paymentData, productsHeader } from "./helpers";
import injectMedia from "../../media";
import defaultImageSmall from "../../../assets/images/defaultImageSmall.png";
import "./style.css";

const CartPaymentsMethod = (props) => {
  const { mobileCartQuery } = props;

  const { submitForm } = useFormikContext();

  const onHandlerSubmit = () => {
    submitForm();
  };

  console.log(paymentData);

  return (
    <div className="CartPaymentsMethod">
      <div className="CartPaymentsMethod-box">
        <div className="CartPaymentsMethod-order">
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
