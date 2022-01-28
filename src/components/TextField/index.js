import cn from "classnames";
import "./style.css";

const TextField = (props) => {

    const { label, type, placeholder, classes = {}, value, required = false, onChange, error, ...otherProps } = props;
    const { fieldWrapClass, headerClass, fieldClass } = classes;

    return (
        <div className={ cn("TextField", fieldWrapClass) } >
            <p className={ cn("TextField-header", {"obligatory": required}, headerClass) }>{ label }</p>
            <input
                {...otherProps}
                className={ cn("TextField-input", {"TextField-input-error": error}, fieldClass) }
                type={ type } 
                placeholder={placeholder }
                value={ value }
                onChange={ onChange }
            />
        </div>
    );
};

export default TextField;