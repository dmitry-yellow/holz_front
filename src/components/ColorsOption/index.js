import { useEffect, useState } from 'react';
import moreInfoIcon from '../../assets/images/icon-more-info-circle.png';
import ReactTooltip from "react-tooltip";
import injectMedia from "../media";
import cn from 'classnames';
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-collapse/lib/Collapse";
/*import { setSelectedIdsWithAmount } from "../../actions/hotTub";*/


const ColorsOption = (props) => {

  const {
    optionData,
    dispatch,
    selectedId,
    setSelectedId,
    additionalClass,
    option,
    multi,
    multiSel,
    setSelectedSpruceColorId,
    dataTooltip,
    desktopQueryTooltip,
    selectedSizeId,
    openTab,
    openToolltip,
    setOpenToolltip
  } = props;

  /*const [openToolltip, setOpenToolltip] = useState('');*/

  /*const selectedIdsWithAmount = useSelector(state => state.hotTub.selectedIdsWithAmount);

  useEffect(() => {

  }, [selectedIdsWithAmount])*/

  let priceShow = (size) => {

    if (selectedSizeId == 80530) {

      return size.base.priceBig;
    }
    return size.base.price;
  }

  /*  const renderCanBuyFew = (mainId, canBuyFew) => {

      debugger
      const currentObjArr = selectedIdsWithAmount?.filter(item => item.selectedIdWithAmount === mainId);
      const classForMinSpan = cn( currentObjArr?.length >= 1 && currentObjArr?.[0].amount <= 1 && 'disabled');
      const classForMaxSpan = cn( currentObjArr?.length >= 1 && currentObjArr?.[0].amount >= canBuyFew && 'disabled');

      console.log(currentObjArr)

      return <div className='ColorsOption-box-item-canBuyFew'>
        <span className={ classForMinSpan }
              onClick={ () => dispatch(setSelectedIdsWithAmount(mainId, +currentObjArr[0].amount - 1)) }
        >-</span>
        <p>{ currentObjArr?.length >= 1 && currentObjArr?.[0].amount }</p>
        <span className={ classForMaxSpan }
              onClick={ () => {
                debugger
                dispatch(setSelectedIdsWithAmount(mainId, +currentObjArr[0].amount + 1))
              } }
        >+</span>
      </div>
    }*/

  return (
      <div className="ColorsOption">
        <div className="ColorsOption-box">

          { optionData ? Object.values(optionData).map((option, index) => {

            const imageUrl = `${ process.env.REACT_APP_HOST_API_URL }${ option.base.image }`;
            const description = option.base.description;
            const canBuyFew = option.base.canBuyFew;
            const price = priceShow(option);
            const main = option['_main'];
            const showName = option['translation']['germanName'];

            return (
                <div key={ main.id }
                     onClick={ () => {
                       /*let isIncludesItem = selectedIdsWithAmount.filter(item => item.selectedIdWithAmount === main.id).length >= 1;*/
                       if (main.Name !== 'Spruce' && props.option === 'Wood') {
                         dispatch(setSelectedSpruceColorId(80533))
                       }
                       /*if (canBuyFew && !isIncludesItem) {
                         dispatch(setSelectedIdsWithAmount(main.id, 1));
                       }*/
                       dispatch(setSelectedId(main.id))
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
                        + { price?.realValue } { price.currency.currencySymbol } { description?.length > 0 ? `(${ description })` : null }
                      </p> :
                      <p className="ColorsOption-box-item-price">{ props.option === 'Delivery' ? 'Selbstabholung' : 'frei' }</p>
                  }
                  {/*{ canBuyFew && selectedId === main.id ? renderCanBuyFew(main.id, canBuyFew) : null}*/ }
                </div>
            )
          }) : null }
        </div>

        { desktopQueryTooltip ? <>
          <div className='ColorsOption-moreInfo'
               key={ option?.replace(' ', '_') }
               data-tip={ option?.replace(' ', '_') }
               data-for={ option?.replace(' ', '_') }
          >
            <img src={ moreInfoIcon } alt="alt"/>
            <p>Mehr Information</p>

          </div>
          <ReactTooltip className='ColorsOption-moreInfo-tooltip' id={ option?.replace(' ', '_') }
                        getContent={ (dataTip) => {

                          return <div className='ColorsOption-moreInfo-tooltip-box'>
                            <p className='ColorsOption-moreInfo-tooltip-box-title'>{ dataTooltip?.germanName }</p>
                            <div className='ColorsOption-moreInfo-tooltip-box-desc'
                                 dangerouslySetInnerHTML={ { __html: dataTooltip?.germanDescription } }
                            />
                          </div>
                        }

                        }
                        delayHide={ 300 }
                        place="left"
                        type='light'
                        effect='solid'
                        border={ false }

          />
        </> : <>
          <div className='ColorsOption-moreInfo' onClick={() => setOpenToolltip(option === openToolltip ? '' : option)}>
            <img src={ moreInfoIcon } alt="alt"/>
            <p>Mehr Information</p>
          </div>
          <Collapse
              theme={{
                collapse: 'ColorsOption-collapse',
                content: 'ColorsOption-content'
              }}
              isOpened={option === openToolltip}
          >
            {dataTooltip && <div className='ColorsOption-moreInfo-tooltip-box collapse'>
              {/*<p className='ColorsOption-moreInfo-tooltip-box-title'>{ dataTooltip?.germanName }</p>*/}
              <div className='ColorsOption-moreInfo-tooltip-box-desc collapse-desc'
                   dangerouslySetInnerHTML={ { __html: dataTooltip?.germanDescription } }
              />
            </div> }
          </Collapse>
        </>

        }
      </div>
  )
}

export default injectMedia(ColorsOption);
