import React from "react";
import injectMedia from "../../../media";
import {cutSeparator, toEuroAmount} from "../../CartPaymentsMethod/helpers";
import '../style.css';

const CartDataProduct = (props) => {

    const { mobileCartQuery, product, index, onClickDelete } = props;

    return (
        <div className="CartDataProducts-product">
            <div className="CartDataProducts-product-delete">
                {index === 0 && <button onClick={() => {
                    onClickDelete(index);
                }}>×</button>}
            </div>
            <div className="CartDataProducts-product-option">
                <p className="CartDataProducts-product-option-name">{product.object?._main.Name}</p>
                <div className="CartDataProducts-product-icons">
                    {product.object?.base.image && <img src={`${process.env.REACT_APP_HOST_API_URL}` + `${product.object?.base.image}`} alt="product"/>}
                </div>
                <p className="CartDataProducts-product-option-desc">{product.object?.base.description}</p>
            </div>
            {!mobileCartQuery && <p className="CartDataProducts-product-price">{toEuroAmount(cutSeparator(product.object?.base.price.realValue))}</p>}
            <p className="CartDataProducts-product-amount">{product.count}</p>
            {!mobileCartQuery && <p className="CartDataProducts-product-price">{toEuroAmount(cutSeparator(product.object?.base.price.realValue) * Number(product.count))}</p>}
        </div>
    )
};

export default injectMedia(CartDataProduct);