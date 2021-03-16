import ToggleSwitchButton from "../ToggleSwitchButton";
import './style.css';



const ControlItem = (props) => {

  const { controlName, iconSrc, setToggleValue, isChecked, mobileQueryMatches } = props;

  return (
      <div className='ControlItem'>
        {mobileQueryMatches && iconSrc ? null : <p>{controlName}</p>}
        {iconSrc ?
            <img src={iconSrc}
                 alt="full screen"
            /> :
            <ToggleSwitchButton setToggleValue={setToggleValue}
                                isChecked={isChecked}
            />
        }
      </div>
  )
}

export default ControlItem;