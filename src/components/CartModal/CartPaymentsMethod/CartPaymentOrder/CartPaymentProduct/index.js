import React from "react";
import {cutSeparator, toEuroAmount, } from "../../helpers";
import "../style.css";

const CartPaymentProduct = (props) => {

    const { product } = props;

    return (
        <div
            className="CartPaymentOrder-product"
            key={product.object._main.id}
        >
            <div className="CartPaymentOrder-product-option">
                {product.object.base.image && (
                    <div className="CartPaymentOrder-product-icon">
                        <img src={`${process.env.REACT_APP_HOST_API_URL}` + `${product.object.base.image}`} alt="defaultImage" />
                    </div>
                )}
                <div className="CartPaymentOrder-option-text">
                    <p className="CartPaymentOrder-product-option-name">
                        {product.object._main.Name}
                    </p>
                    <p className="CartPaymentOrder-product-option-amount">
                        <span>× </span>
                        {product.count}
                    </p>
                    <p className="CartPaymentOrder-product-option-desc">
                        {product.object.base.description}
                    </p>
                </div>
            </div>
            <p className="CartPaymentOrder-product-price">
                {toEuroAmount(cutSeparator(product.object?.base.price.realValue) * Number(product.count))}
            </p>
        </div>
    );
};

export default CartPaymentProduct;
