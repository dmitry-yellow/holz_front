import cn from "classnames";
import "./style.css";

const Checkbox = (props) => {
  const {
    label,
    checked = false,
    classes = {},
    setChecked,
    required = false,
    ...otherProps
  } = props;
  const { labelClass, checkboxClass, checkboxWrapClass } = classes;

  const handleCheckboxChange = (event) => setChecked(event.target.checked);

  return (
    <div className={cn("Checkbox", checkboxWrapClass)}>
      <label className={cn("Checkbox-label", { obligatory: required }, labelClass)} >
        <input
          {...otherProps}
          type="checkbox"
          className={cn("Checkbox-input", checkboxClass)}
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
