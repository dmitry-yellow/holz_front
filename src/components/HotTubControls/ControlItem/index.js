import ToggleSwitchButton from "../ToggleSwitchButton";
import './style.css';



const ControlItem = (props) => {

  const { controlName, iconSrc, setToggleValue, isChecked, desktopQueryMatches } = props;

  return (
      <div className='ControlItem'>
        {!desktopQueryMatches && iconSrc ? null : <p>{controlName}</p>}
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