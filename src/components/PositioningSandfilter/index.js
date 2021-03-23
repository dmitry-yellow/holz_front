import sandFilter from '../../assets/images/icon-sandfilter.png';
import controlPanel from '../../assets/images/icon-control-panel.png';
import positioningImage from '../../assets/images/Positioning.png';
import cn from 'classnames';
import './style.css';


const PositioningSandfilterBox = (props) => {

  const { optionData, priceShow } = props;


  const selectOptionsJsx = () => {
    return <div className='PositioningSandfilterBox-select-options'>
      <div className='PositioningSandfilterBox-select-options-sandfilter'>
        <img src={ sandFilter } alt="filter"/>
        <p>Sandfilter (pump)</p>
      </div>
      <div className='PositioningSandfilterBox-select-options-control-panel'>
        <img src={ controlPanel } alt="panel"/>
        <p>Control Panel</p>
      </div>
    </div>
  }


  return (
      <div className='PositioningSandfilterBox'>
        <div className='PositioningSandfilterBox-image'>
          <img src={ positioningImage } alt="positioning"/>

          { optionData ? Object.values(optionData).map(option => {

            const main = option['_main'];
            const price = priceShow(option);

            return <div key={ main.id } className={ cn('PositioningSandfilterBox-item', main.Name.replace(' ', '_'))}>
              <div className='PositioningSandfilterBox-item-checkbox'>
                <input type="checkbox"/>
                <p>1</p>
              </div>
              <div className='PositioningSandfilterBox-item-checkbox'>
                <input type="checkbox"/>
                <p>2</p>
              </div>

              {/*<div >
              <p>{ main.Name }</p>
              { price?.realValue ?
                  <p> +{ price.realValue } { price.currency.currencySymbol } </p> :
                  <p>frei</p>
              }
            </div>*/}
            </div>
          }) : null }
        </div>



        { selectOptionsJsx() }

      </div>
  )
}


export default PositioningSandfilterBox;