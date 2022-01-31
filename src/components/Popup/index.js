// import MadeInGermanyLogo from "./MadeInGermanyLogo";
import { CloseIcon } from "../CartModal/CloseIcon";
import cn from "classnames";
import "./style.css";

const Popup = (props) => {
  const { isModalOpen, onHandleCloseModal, children, classes={} } = props;
  const { classModal, classIconClose, classModalContainer } = classes;
  
  return (
    <div className={cn("Popup", {"visible": isModalOpen}, classModal)}>
      {/*<MadeInGermanyLogo />*/}
      <CloseIcon onHandleCloseCartModal={onHandleCloseModal} classIcon={classIconClose} />
      <div className={cn("Popup-container", classModalContainer)}>
          {children}
      </div>
    </div>
  );
};

export default Popup;
