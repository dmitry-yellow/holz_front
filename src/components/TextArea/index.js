import { useState } from "react";
import cn from "classnames";
import "./style.css";

const TextArea = (props) => {

    const { label, type, placeholder, classes = {}, value, ...otherProps } = props;
    const { labelClass, fieldClass, errorClass } = classes;

    const [valueArea, setValueArea] = useState(value);

    const handleTextFieldChange = event => setValueArea(event.target.value);

    return (
        <div className="TextArea">
            <p className={ cn("TextArea-header", labelClass) }>{ label }</p>
            <textarea
                {...otherProps}
                className={ cn("TextArea-area", fieldClass, errorClass) }
                type={ type } 
                placeholder={placeholder }
                value={ valueArea }
                onChange={ handleTextFieldChange }
            />
        </div>
    );
};

export default TextArea;