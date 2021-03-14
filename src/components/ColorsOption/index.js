import cn from 'classnames';
import './style.css';
import Input from "../Input";
import moreInfoIcon from '../../assets/images/icon-more-info-circle.png';
import ReactTooltip from "react-tooltip";


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
    openTab
  } = props;

  return (
      <div className="ColorsOption">



        <div className="ColorsOption-box">
          { optionData ? Object.values(optionData).map((option, index) => {

            const imageUrl = `${ process.env.REACT_APP_HOST_API_URL }${ option.base.image }`;
            const description = option.base.description;

            const price = option.base.price;
            const main = option['_main'];

            return (
                <div key={ main.id }
                     onClick={ () => {
                       if (main.Name !== 'Spruce' && props.option === 'Wood') {
                         dispatch(setSelectedSpruceColorId(80533))
                       }
                       dispatch(setSelectedId(main.id))
                     } }
                     className={ cn("ColorsOption-box-item",
                         (selectedId === main.id && !multiSel) && 'selected',
                         additionalClass && additionalClass,
                         (multi && selectedId.includes(main.id)) && 'multiSelelected',
                         multiSel && selectedId && 'multiSelelected'
                     ) }>
                  { option.base.image ? <img src={ imageUrl } alt={ main.Name }/> : null }
                  <p className="ColorsOption-box-item-name">{ main.Name }</p>
                  { price.realValue ?
                      <p className="ColorsOption-box-item-price">
                        + { price.realValue } { price.currency.currencySymbol } { description?.length > 0 ? `(${ description })` : null }
                      </p> :
                      <p className="ColorsOption-box-item-price">free</p>
                  }
                </div>
            )
          }) : null }
        </div>

        { (option && option === 'Delivery') && <Input/> }

        <div className='ColorsOption-moreInfo'
             key={option?.replace(' ', '_')}
             data-tip={ option?.replace(' ', '_') }
             data-for={option?.replace(' ', '_')}
        >
          <img src={ moreInfoIcon } alt="alt"/>
          <p>Mehr Info</p>

        </div>
        <ReactTooltip className='ColorsOption-moreInfo-tooltip' id={option?.replace(' ', '_')} getContent={ (dataTip) => {

          return <div className='ColorsOption-moreInfo-tooltip-box'>
            <p className='ColorsOption-moreInfo-tooltip-box-title'>{ dataTooltip?.germanName }</p>
            <p className='ColorsOption-moreInfo-tooltip-box-desc'>
                <div dangerouslySetInnerHTML={{ __html: dataTooltip?.germanDescription  }} />
            </p>
          </div>
        }

        }
                      delayHide={300}
                      place="left"
                      type='light'
                      effect='solid'
                      border={false}

        />
      </div>
  )
}

export default ColorsOption;