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
      <div className={cn("Popup-container", classModalContainer)}>
      <CloseIcon onHandleCloseCartModal={onHandleCloseModal} classIcon={classIconClose} />
          {children}
      </div>
    </div>
  );
};

export default Popup;
