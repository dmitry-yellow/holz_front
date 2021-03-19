import ControlItem from "./ControlItem";
import fullScreenIcon from '../../assets/images/positionIcons/full-screen-icon.svg';
import './style.css';
import injectMedia from "../media";


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
    desktopQueryMatches
  } = props;

  return (
      <>
        { !desktopQueryMatches && <ControlItem controlName="Vollbild"
                                             iconSrc={ fullScreenIcon }
                                               desktopQueryMatches={ desktopQueryMatches }
        /> }
        <div className='HotTubControls'>
        { desktopQueryMatches && <ControlItem controlName="Vollbild"
                                              iconSrc={ fullScreenIcon }
                                              desktopQueryMatches={ desktopQueryMatches }
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


export default injectMedia(HotTubControls);


