import cn from "classnames";
import "./style.css";

export const CloseIcon = ({ onHandleCloseCartModal, classIcon }) => <span className={cn("CloseIcon", classIcon)} onClick={onHandleCloseCartModal}></span>;