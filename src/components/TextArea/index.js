import cn from "classnames";
import "./style.css";

const TextArea = (props) => {

    const { label, type, placeholder, classes = {}, required, value, onChange, ...otherProps } = props;
    const { labelClass, fieldClass, errorClass } = classes;

    return (
        <div className="TextArea">
            <p className={ cn("TextArea-header", labelClass, {"obligatory-field": required}) }>{ label }</p>
            <textarea
                {...otherProps}
                className={ cn("TextArea-area", fieldClass, errorClass) }
                type={ type } 
                placeholder={placeholder }
                value={ value }
                onChange={ onChange }
            />
        </div>
    );
};

export default TextArea;