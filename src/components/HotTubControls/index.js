import ControlItem from "./ControlItem";
import fullScreenIcon from '../../assets/images/positionIcons/full-screen-icon.svg';
/*import cn from 'classnames';*/
import './style.css';


const HotTubControls = (props) => {

    const {setCustomizeOptionsWater, isCustomizeOptionsWater, isCustomizeOptionsOpen, setCustomizeOptionsOpen, isExteriorBcg, setExteriorBcg, coverOptionOpacity, setCoverOptionOpacity} = props;

    /*const classForControls = cn("HotTubControls", !isCustomizeOptionsOpen && "closed")*/

    return (
        <div className='HotTubControls' /*{ classForControls }*/>
            <ControlItem controlName="Vollbild" iconSrc={fullScreenIcon}/>

            <ControlItem controlName="Deckel"
                         setToggleValue={setCoverOptionOpacity}
                         isChecked={coverOptionOpacity}

            />
            <ControlItem controlName="Optionen"
                         setToggleValue={setCustomizeOptionsOpen}
                         isChecked={isCustomizeOptionsOpen}
            />
            <ControlItem controlName="Wasser"
                         setToggleValue={setCustomizeOptionsWater}
                         isChecked={isCustomizeOptionsWater}
            />
            <ControlItem controlName="Außen"
                         setToggleValue={setExteriorBcg}
                         isChecked={isExteriorBcg}
            />
        </div>
    )
}


export default HotTubControls;


