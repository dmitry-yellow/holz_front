import CartModalContainerTitle from "./CartModalContainerTitle";
import MadeInGermanyLogo from "./MadeInGermanyLogo";
import { useSelector } from "react-redux";
import { CloseIcon } from "./CloseIcon";
import cn from 'classnames';
import './style.css';
import CartData from "./CartData";


const CartModal = (props) => {

    const {onHandleCloseCartModal} = props;
    const isCartModalOpen = useSelector(state => state.hotTub.isCartModalOpen);

    return (
        <div className={cn('CartModal', isCartModalOpen && 'visible')}>
            {/*<MadeInGermanyLogo />*/}
            <CloseIcon onHandleCloseCartModal={onHandleCloseCartModal}/>
            <div className="CartModal-container">
                <CartModalContainerTitle />
                <CartData />
            </div>


        </div>
    )
}

export default CartModal;
