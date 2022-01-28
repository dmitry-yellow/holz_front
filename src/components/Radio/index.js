import cn from "classnames";
import "./style.css"

const Radio = (props) => {

  const { checked, setRadioValue, label, value, classes="" } = props;
  const { labelClass, inputClass } = classes;

  return (
    <label className={cn("Radio", { checked: checked }, labelClass)} >
      <input
        type="radio"
        className={cn("Radio-input", inputClass)}
        value={value}
        checked={checked}
        onChange={(e) => {
          setRadioValue(e.target.value);
        }}
      /> {label}
    </label>
  );
};

export default Radio;
