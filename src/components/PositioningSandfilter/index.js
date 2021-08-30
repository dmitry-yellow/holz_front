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
import { getNoLedId, getNoMassageFuncId, getPreparationForSandFilterId, getSandFilterId } from "../helperForIds";


const PositioningSandfilterBox = (props) => {

  const { optionData, priceShow, consoleOptionData } = props;

  const [sandFilterChecked, setSandFilterChecked] = useState(false);
  const [controlPanelChecked, setControlPanelChecked] = useState(false);



  const dispatch = useDispatch();
  const selectedPositioningIds = useSelector(state => state.hotTub.selectedPositioningIds);
  const selectedAdditionalAccessoriesIds = useSelector(state => state.hotTub.selectedAdditionalAccessoriesIds);
  const selectedMassageFunctionId = useSelector(state => state.hotTub.selectedMassageFunctionId);
  const selectedLedId = useSelector(state => state.hotTub.selectedLedId);
  const data = useSelector(state => state.hotTub.data);
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);
  const heatingOvenDataPositioningImage =
    data.heatingOven?.['080521']?.imagesext.objectimage1 ||
    data.heatingOven?.['080661']?.imagesext.objectimage1 ||
    data.heatingOven?.['080749']?.imagesext.objectimage1;
  const noMassageFuncId = getNoMassageFuncId(selectedTypeId);  // 80515
  const noLedId = getNoLedId(selectedTypeId);  // 80517
  const sandFilterId = getSandFilterId(selectedTypeId);  // 80591
  const preparationForSandFilterId = getPreparationForSandFilterId(selectedTypeId);  // 80575

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
  }, [selectedPositioningIds, selectedMassageFunctionId, selectedLedId]);

  const selectOptionsJsx = () => {

    let srcCP = '';

    if (+selectedMassageFunctionId !== noMassageFuncId && +selectedLedId !== noLedId) {
      srcCP = ledAndMassage;
    } else if (+selectedMassageFunctionId === noMassageFuncId && +selectedLedId !== noLedId) {
      srcCP = onlyLed;
    } else if (+selectedMassageFunctionId !== noMassageFuncId && +selectedLedId === noLedId) {
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

          { consoleOptionData?.[0] && consoleOptionData?.length >= 1 ? Object.values(consoleOptionData?.[0]).map((option, index) => {
            const sandFilterData = consoleOptionData?.[0];
            const shalterData = consoleOptionData?.[1];
            const main = option['_main'];
            const price = priceShow(option);
            const isDisabledSandFilter = (selectedAdditionalAccessoriesIds.includes(sandFilterId) || selectedAdditionalAccessoriesIds.includes(preparationForSandFilterId));
            const isDisabledControlPanel = +selectedMassageFunctionId !== noMassageFuncId || +selectedLedId !== noLedId;
            const isCheckedSandFilter = +selectedPositioningIds?.sandFilter === Object.values(sandFilterData)[index]._main.id && sandFilterChecked;
            const isCheckedControlPanel = +selectedPositioningIds?.controlPanel === Object.values(shalterData)[index]._main.id && controlPanelChecked;



            return <div key={ main.id } className={ cn('PositioningSandfilterBox-item', main.Name.replace(' ', '_'), selectedTypeId === 80690 && 'opal') }>
              <div className='PositioningSandfilterBox-item-checkbox'>
                <input type="checkbox"
                       checked={ isCheckedSandFilter }
                       disabled={ !isDisabledSandFilter }
                       onChange={ (e) => {
                         setSandFilterChecked(e.target.checked)
                         if (e.target.checked === true) {
                           dispatch(setSelectedPositioningIds('sandFilter', Object.values(sandFilterData)[index]._main.id));
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
                           dispatch(setSelectedPositioningIds('controlPanel', Object.values(shalterData)[index]._main.id));
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