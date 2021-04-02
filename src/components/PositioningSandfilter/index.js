import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import sandFilter from '../../assets/images/icon-sandfilter.png';
import controlPanel from '../../assets/images/icon-control-panel.png';
import ledAndMassage from '../../assets/images/icon-cp-led-massage.png';
import onlyLed from '../../assets/images/icon-cp-only-led.png';
import onlyMassage from '../../assets/images/icon-cp-only-massage.png';
import cn from 'classnames';
import './style.css';
import { setSelectedPositioningIds } from "../../actions/hotTub";


const PositioningSandfilterBox = (props) => {

  const { optionData, priceShow } = props;

  const [sandFilterChecked, setSandFilterChecked] = useState(false);
  const [controlPanelChecked, setControlPanelChecked] = useState(false);

  const dispatch = useDispatch();
  const selectedPositioningIds = useSelector(state => state.hotTub.selectedPositioningIds);
  const selectedAdditionalAccessoriesIds = useSelector(state => state.hotTub.selectedAdditionalAccessoriesIds);
  const selectedMassageFunctionId = useSelector(state => state.hotTub.selectedMassageFunctionId);
  const selectedLedId = useSelector(state => state.hotTub.selectedLedId);
  const data = useSelector(state => state.hotTub.data);
  const heatingOvenDataPositioningImage = data.heatingOven?.['80521']?.imagesext.objectimage1;

  useEffect(() => {
    if(selectedPositioningIds?.sandFilter && selectedPositioningIds?.controlPanel){
      setSandFilterChecked(true);
      setControlPanelChecked(true);
    }
    if(selectedPositioningIds?.sandFilter && !selectedPositioningIds?.controlPanel){
      setSandFilterChecked(true);
    }
    if(!selectedPositioningIds?.sandFilter && selectedPositioningIds?.controlPanel){
      setControlPanelChecked(true);
    }
  }, [selectedPositioningIds]);

  const selectOptionsJsx = () => {

    let srcCP = '';

    if (+selectedMassageFunctionId !== 80515 && +selectedLedId !== 80517) {
      srcCP = ledAndMassage;
    } else if (+selectedMassageFunctionId === 80515 && +selectedLedId !== 80517) {
      srcCP = onlyLed;
    } else if (+selectedMassageFunctionId !== 80515 && +selectedLedId === 80517) {
      srcCP = onlyMassage;
    } else {
      srcCP = controlPanel;
    }

    return <div className='PositioningSandfilterBox-select-options'>

      <div className='PositioningSandfilterBox-select-options-sandfilter'>
        <img src={ sandFilter } alt="filter"/>
        <p>Sandfilter (Pumpe)</p>
      </div>
      <div className='PositioningSandfilterBox-select-options-control-panel'>
        <img src={ srcCP && srcCP } alt="panel"/>
        <p>Schalter Position</p>
      </div>
    </div>
  }


  return (
      <div className='PositioningSandfilterBox'>
        <div className='PositioningSandfilterBox-image'>
          <img src={ `${ process.env.REACT_APP_HOST_API_URL }${ heatingOvenDataPositioningImage }` } alt="positioning"/>

          { optionData ? Object.values(optionData).map(option => {

            const main = option['_main'];
            const price = priceShow(option);
            const isDisabledSandFilter = (selectedAdditionalAccessoriesIds.includes(80591) || selectedAdditionalAccessoriesIds.includes(80575));
            const isDisabledControlPanel = +selectedMassageFunctionId !== 80515 || +selectedLedId !== 80517;
            const isCheckedSandFilter = +selectedPositioningIds?.sandFilter === main.id && sandFilterChecked;
            const isCheckedControlPanel = +selectedPositioningIds?.controlPanel === main.id && controlPanelChecked;

            return <div key={ main.id } className={ cn('PositioningSandfilterBox-item', main.Name.replace(' ', '_')) }>
              <div className='PositioningSandfilterBox-item-checkbox'>
                <input type="checkbox"
                       checked={ isCheckedSandFilter }
                       disabled={ !isDisabledSandFilter }
                       onChange={ (e) => {
                         setSandFilterChecked(e.target.checked)
                         if (e.target.checked === true) {
                           dispatch(setSelectedPositioningIds('sandFilter', main.id));
                         } else {
                           dispatch(setSelectedPositioningIds('sandFilter', null));
                         }
                       } }
                />
                <p>1</p>
              </div>
              <div className='PositioningSandfilterBox-item-checkbox'>
                <input type="checkbox"
                       checked={ isCheckedControlPanel }
                       disabled={ !isDisabledControlPanel }
                       onChange={ (e) => {
                         setControlPanelChecked(e.target.checked)
                         if (e.target.checked === true) {
                           dispatch(setSelectedPositioningIds('controlPanel', main.id));
                         } else {
                           dispatch(setSelectedPositioningIds('controlPanel', null));
                         }
                       } }
                />
                <p>2</p>
              </div>

              <div className={ cn('PositioningSandfilterBox-item-desc', main.Name.replace(' ', '_')) }>
                <p className={ cn(isCheckedControlPanel || isCheckedSandFilter ? 'checkedPositionDone' : '') }>{ main.Name }</p>
                { price?.realValue && <p> +{ price.realValue } { price.currency.currencySymbol } </p> }
              </div>
            </div>
          }) : null }
        </div>

        { selectOptionsJsx() }

      </div>
  )
}


export default PositioningSandfilterBox;