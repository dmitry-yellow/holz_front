import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-collapse/lib/Collapse";
import {setPriceAddValue, setSelectedIdsWithAmount} from "../../actions/hotTub";
import {getBigSizeId, getNoColorId, getWoodenBoxId} from "../helperForIds";
import moreInfoIcon from '../../assets/images/icon-more-info-circle.png';
import PositioningSandfilterBox from "../PositioningSandfilter";
import injectMedia from "../media";
import cn from 'classnames';
import './style.css';


const ColorsOption = (props) => {

  const {
    optionData,
    selectedId,
    setSelectedId,
    additionalClass,
    option,
    multi,
    multiSel,
    setSelectedSpruceColorId,
    dataTooltip,
    setCoverOptionOpacity,
    selectedSizeId,
    openToolltip,
    setOpenToolltip,
    consoleOptionData
  } = props;


  const selectedIdsWithAmount = useSelector(state => state.hotTub.selectedIdsWithAmount);
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);
  const priceAddValue = useSelector(state => state.hotTub.priceAddValue);
  const dispatch = useDispatch();


  let priceShow = (size) => {
    let bigSizeId = getBigSizeId(selectedTypeId);

    if (bigSizeId && +selectedSizeId === +bigSizeId) {
      return size.base.priceBig;
    }
    return size.base.price;
  }

  const renderCanBuyFew = (mainId, canBuyFew) => {

    let currentId, currentAmount;

    if (selectedId?.length >= 1) {
      const index = selectedId.includes(mainId) ? selectedId.indexOf(mainId) : null;
      currentId = selectedId[index];
      currentAmount = selectedIdsWithAmount?.[currentId];
    } else {
      currentId = +mainId;
      currentAmount = selectedIdsWithAmount?.[currentId];
    }

    const classForMinSpan = cn(+currentAmount <= 1 && 'disabled');
    const classForMaxSpan = cn(+currentAmount >= +canBuyFew && 'disabled');

    return <>
      { currentId && +currentAmount && +canBuyFew ? <div className='ColorsOption-box-item-canBuyFew'>
        <span className={ classForMinSpan }
              onClick={ (event) => {
                event.stopPropagation();
                if (classForMinSpan === 'disabled') return
                dispatch(setSelectedIdsWithAmount(mainId, +currentAmount - 1))
              } }>-</span>
        <p>{ currentAmount }</p>
        <span className={ classForMaxSpan }
              onClick={ (event) => {
                event.stopPropagation();
                if (classForMaxSpan === 'disabled') return
                dispatch(setSelectedIdsWithAmount(mainId, +currentAmount + 1))
              } }>+</span>
      </div> : null }
    </>
  }


  useEffect(() => {
    const { option } = props;
    if((option === 'Wood' || option === 'Spruce color') && optionData){
      dispatch(setPriceAddValue(optionData?.['0' + selectedId]?.base?.priceAdd?.realValue));
    }
  }, [props.option, selectedId])



  return (
    <div className={ cn("ColorsOption", option === 'Positioning' && 'positioning') }>
      { option !== 'Positioning' ? <div className="ColorsOption-box">
        { optionData ? Object.values(optionData).map((option, index) => {
          const imageUrl = `${ process.env.REACT_APP_HOST_API_URL }${ option.base.image }`;
          const description = option.base.description;
          const canBuyFew = option.base.canBuyFew;
          const price = priceShow(option);
          const main = option['_main'];
          const showName = option['translation']['germanName'];
          const woodenBoxId = getWoodenBoxId(selectedTypeId);

          return (
            <div key={ main.id }
                 onClick={ async () => {

                   if (main.Name !== 'Spruce' && props.option === 'Wood') {
                     const noColorId = getNoColorId(selectedTypeId);
                     dispatch(setSelectedSpruceColorId(noColorId));
                   }
                   if (selectedId !== main.id) {
                     await dispatch(setSelectedId(main.id))
                     if(setCoverOptionOpacity){
                       setCoverOptionOpacity(true);
                     }
                   }
                 } }
                 className={ cn("ColorsOption-box-item",
                   props.option === 'Delivery' && 'delivery',
                   (selectedId === main.id && !multiSel) && 'selected',
                   additionalClass && additionalClass,
                   (multi && selectedId.includes(main.id)) && 'multiSelected',
                   multiSel && selectedId && 'multiSelelected'
                 ) }>
              { option.base.image ? <img src={ imageUrl } alt={ showName }/> : null }
              <p className="ColorsOption-box-item-name">{ showName }</p>
              { price?.realValue ?
                <p className="ColorsOption-box-item-price">
                  + { +main.id === woodenBoxId ? `${Number(priceAddValue) + Number(price?.realValue)}.00` : price?.realValue } { price.currency.currencySymbol } { description?.length > 0 ? `(${ description })` : null }
                </p> :
                <p
                  className="ColorsOption-box-item-price">{ props.option === 'Delivery' ? 'Selbstabholung' : 'frei' }</p>
              }

              { canBuyFew && selectedId === main.id || selectedId?.length >= 1 ? renderCanBuyFew(main.id, canBuyFew) : null }
            </div>
          )
        }) : null }
      </div> : <PositioningSandfilterBox optionData={ optionData }
                                         priceShow={ priceShow }
                                         consoleOptionData={consoleOptionData}
      /> }
        <div className='ColorsOption-moreInfo'
             onClick={ () => setOpenToolltip(option === openToolltip ? '' : option) }>
          <img src={ moreInfoIcon } alt="alt"/>
          <p>Mehr Information</p>
        </div>
        <Collapse
          theme={ {
            collapse: 'ColorsOption-collapse',
            content: 'ColorsOption-content'
          } }
          isOpened={ option === openToolltip }
        >
          { dataTooltip && <div className='ColorsOption-moreInfo-tooltip-box collapse'>
            {/*<p className='ColorsOption-moreInfo-tooltip-box-title'>{ dataTooltip?.germanName }</p>*/ }
            <div className='ColorsOption-moreInfo-tooltip-box-desc collapse-desc'
                 dangerouslySetInnerHTML={ { __html: dataTooltip?.germanDescription } }
            />
          </div> }
        </Collapse>

    </div>
  )
}

export default injectMedia(ColorsOption);
