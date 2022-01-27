// import MadeInGermanyLogo from "./MadeInGermanyLogo";
import { CloseIcon } from "../CartModal/CloseIcon";
import cn from "classnames";
import "./style.css";

const Popup = (props) => {
  const { isCartModalOpen, onHandleCloseCartModal, children, classes={} } = props;
  const { classModal, classIconClose, classModalContainer } = classes;

  return (
    <div className={cn("Popup", {"visible": isCartModalOpen}, classModal)}>
      {/*<MadeInGermanyLogo />*/}
      <CloseIcon onHandleCloseCartModal={onHandleCloseCartModal} classIcon={classIconClose} />
      <div className={cn("Popup-container", classModalContainer)}>
          {children}
      </div>
    </div>
  );
};

export default Popup;
