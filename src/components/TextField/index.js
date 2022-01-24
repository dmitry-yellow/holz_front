import cn from "classnames";
import "./style.css";

const TextField = (props) => {

    const { label, type, placeholder, classes = {}, value, required = false, onChange, error, ...otherProps } = props;
    const { labelClass, fieldClass } = classes;

    return (
        <div className="TextField">
            <p className={ cn("TextField-header", labelClass, {"obligatory-field": required}) }>{ label }</p>
            <input
                {...otherProps}
                className={ cn("TextField-input", fieldClass, {"TextField-input-error": error}) }
                type={ type } 
                placeholder={placeholder }
                value={ value }
                onChange={ onChange }
            />
        </div>
    );
};

export default TextField;