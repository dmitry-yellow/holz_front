import './style.css';
import CartDataProducts from "../CartDataProducts";
import CartDataSubtotal from "../CartDataSubtotal";


const CartData = () => {

    return (
        <div className="CartData">
            <CartDataProducts />
            <CartDataSubtotal />
        </div>
    )
}

export default CartData;