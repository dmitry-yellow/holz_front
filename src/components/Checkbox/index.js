import cn from "classnames";
import "./style.css";

const Checkbox = (props) => {

    const { label, checked = false, classes = {}, setChecked, ...otherProps } = props;
    const { labelClass, checkboxClass } = classes;

    const handleCheckboxChange = event => setChecked(event.target.checked);

    return (
        <div className="Checkbox" >
            <label className={ cn("Checkbox-label", labelClass) }>
                <input  
                    { ...otherProps }
                    type="checkbox" 
                    className={ cn("Checkbox-input", checkboxClass) }
                    checked={ checked } 
                    onChange={ handleCheckboxChange }
                />
                { label }
            </label>
        </div>
    );
};

export default Checkbox;