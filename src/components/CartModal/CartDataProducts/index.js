import React from "react";
import injectMedia from "../../media";
import defaultImage from "../../../assets/images/defaultImage.png";
import flipPhoneImg from "../../../assets/images/flip-fone-icon-text.png";
import {useSelector} from "react-redux";
import {productData, toEuroAmount, totalSum} from "../CartPaymentsMethod/helpers";
import CartDataProduct from "./CartDataProduct";
import {Loader} from "../../Loader";
import './style.css';


const CartDataProducts = (props) => {

    const cartData = useSelector(state => state.hotTub.cart);

    const productsHeader = ['PRODUKT', "", "PREIS", "ANZAHL", "ZWISCHENSUMME"];
    const productsMobileHeader = ['PRODUKT', "", "ANZAHL"];

    const { mobileCartQuery } = props;

    if (!cartData) {
        return (
            <div className="CartDataWrapper">
                <Loader />
            </div>
        );
    }

    return (
        <div className="CartDataProducts">
            {mobileCartQuery && <img src={flipPhoneImg} alt='flip phone'/>}
            <div className="CartDataProducts-header">
                {!mobileCartQuery ?
                    productsHeader.map((item) => <span key={item}>{item}</span>) :
                    productsMobileHeader.map((item) => <span key={item}>{item}</span>)}
            </div>
            {/*{Object.values(productData).map((item, index) => {*/}
            {/*        return <React.Fragment key={index}>*/}
                    <React.Fragment>
                        {Object.values(cartData).map((product, index) => {
                            return <CartDataProduct key={product.object?._main.id} product={product} index={index} />
                        }
                    )}
                        <div className="CartDataProducts-totalSum">
                            {!mobileCartQuery && <p></p>}
                            {!mobileCartQuery && <p></p>}
                            <p></p>
                            <p></p>
                            <p>{toEuroAmount(totalSum(cartData))}</p>

                        </div>
                </React.Fragment>
            {/*    }*/}
            {/*)}*/}

        </div>
    )
};

export default injectMedia(CartDataProducts);