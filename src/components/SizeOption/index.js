import cn from "classnames";
import './style.css';


const SizeOption = ( props ) => {

  const { sizeData, selectedSizeId, setSelectedSizeId, dispatch } = props;

  return (
      <div className="SizeOption">
        <p>Größe</p>
        { sizeData ? Object.values(sizeData).map((size, index) => {

          const price = size.base.price;  // object with prices
          const main = size["_main"];     // name and id info
          const countPeople = ['4-6', '6-8']; //Свойство добавить на сколько персон в админку

          return <div key={ main.id }
                      onClick={ () => dispatch(setSelectedSizeId(main.id)) }
                      className={ cn("SizeOption-item", selectedSizeId === main.id && 'selected') }>
            <div>
              <p className="SizeOption-item-name">{ size['_main'].Name }</p>
              <p className="SizeOption-item-price">{ price.realValue } { price.currency.currencySymbol }</p>
            </div>
            <p>{ countPeople[index] } personen</p>
            <p>Durchmesser - { main.Name.trim().slice(0, 3) } cm</p>
          </div>
        }) : null }
      </div>
  )
}


export default SizeOption;
