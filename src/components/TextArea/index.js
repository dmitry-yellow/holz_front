import cn from "classnames";
import "./style.css";

const TextArea = (props) => {

    const { label, type, placeholder, classes = {}, required, value, onChange, error, ...otherProps } = props;
    const { headerClass, fieldClass, areaWrapClass } = classes;

    return (
        <div className={ cn("TextArea", areaWrapClass) }>
            <p className={ cn("TextArea-header", {"obligatory-field": required}, headerClass) }>{ label }</p>
            <textarea
                {...otherProps}
                className={ cn("TextArea-area", {"TextArea-area-error": error}, fieldClass) }
                type={ type } 
                placeholder={placeholder }
                value={ value }
                onChange={ onChange }
            />
        </div>
    );
};

export default TextArea;