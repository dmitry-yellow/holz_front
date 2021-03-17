import ControlItem from "./ControlItem";
import fullScreenIcon from '../../assets/images/positionIcons/full-screen-icon.svg';
/*import cn from 'classnames';*/
import './style.css';


const HotTubControls = (props) => {

  const {
    setCustomizeOptionsWater,
    isCustomizeOptionsWater,
    isCustomizeOptionsOpen,
    setCustomizeOptionsOpen,
    isExteriorBcg,
    setExteriorBcg,
    coverOptionOpacity,
    setCoverOptionOpacity,
    mobileQueryMatches
  } = props;

  return (
      <>
        { mobileQueryMatches && <ControlItem controlName="Vollbild"
                                             iconSrc={ fullScreenIcon }
                                             mobileQueryMatches={ mobileQueryMatches }
        /> }
        <div className='HotTubControls'>
        { !mobileQueryMatches && <ControlItem controlName="Vollbild"
                                              iconSrc={ fullScreenIcon }
                                              mobileQueryMatches={ mobileQueryMatches }
        />
        }

        <ControlItem controlName="Deckel"
                     setToggleValue={ setCoverOptionOpacity }
                     isChecked={ coverOptionOpacity }

        />
        <ControlItem controlName="Optionen"
                     setToggleValue={ setCustomizeOptionsOpen }
                     isChecked={ isCustomizeOptionsOpen }
        />
        <ControlItem controlName="Wasser"
                     setToggleValue={ setCustomizeOptionsWater }
                     isChecked={ isCustomizeOptionsWater }
        />
        <ControlItem controlName="Außen"
                     setToggleValue={ setExteriorBcg }
                     isChecked={ isExteriorBcg }
        />
      </div>
      </>

  )
}


export default HotTubControls;


