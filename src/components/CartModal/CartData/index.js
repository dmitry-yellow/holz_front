import CartDataProducts from "../CartDataProducts";
import CartDataSubtotal from "../CartDataSubtotal";
import './style.css';


const CartData = () => {

    return (
        <div className="CartData">
            <CartDataProducts />
            <CartDataSubtotal />
        </div>
    )
}

export default CartData;