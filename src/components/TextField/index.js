import { useState } from "react";
import cn from "classnames";
import "./style.css";

const TextField = (props) => {

    const { label, type, placeholder, classes = {}, value, required = false, ...otherProps } = props;
    const { labelClass, fieldClass, errorClass } = classes;

    const [valueField, setValueField] = useState(value);

    const handleTextFieldChange = event => setValueField(event.target.value);

    return (
        <div className="TextField">
            <p className={ cn("TextField-header", labelClass, required && "obligatory-field") }>{ label }</p>
            <input
                {...otherProps}
                className={ cn("TextField-input", fieldClass, errorClass) }
                type={ type } 
                placeholder={placeholder }
                value={ valueField }
                onChange={ handleTextFieldChange }
            />
        </div>
    );
};

export default TextField;