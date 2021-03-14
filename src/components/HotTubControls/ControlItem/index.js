import './style.css';
import ToggleSwitchButton from "../ToggleSwitchButton";



const ControlItem = (props) => {

  const { controlName, iconSrc, setToggleValue, isChecked } = props;

  return (
      <div className='ControlItem'>
        <p>{controlName}</p>
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