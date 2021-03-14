import './style.css';


const ToggleSwitchButton = (props) => {

  const { setToggleValue, isChecked } = props;

  return (
      <label className="ToggleSwitchButton">
        <input type="checkbox"
               checked={isChecked}
               onChange={setToggleValue ? () => setToggleValue(!isChecked) : () => {}}/>
        <span className="ToggleSwitchButton-slider"></span>
      </label>
  )
}

export default ToggleSwitchButton;