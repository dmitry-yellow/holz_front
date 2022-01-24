import cn from "classnames";
import "./style.css";

const TextField = (props) => {

    const { label, type, placeholder, classes = {}, value, required = false, onChange, ...otherProps } = props;
    const { labelClass, fieldClass, errorClass } = classes;

    return (
        <div className="TextField">
            <p className={ cn("TextField-header", labelClass, {"obligatory-field": required}) }>{ label }</p>
            <input
                {...otherProps}
                className={ cn("TextField-input", fieldClass, errorClass) }
                type={ type } 
                placeholder={placeholder }
                value={ value }
                onChange={ onChange }
            />
        </div>
    );
};

export default TextField;