import cn from "classnames";
import './style.css';
import { useDispatch, useSelector } from "react-redux";


const SizeOption = ( props ) => {

  const dispatch = useDispatch();
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);
  const { sizeData, selectedSizeId, setSelectedSizeId } = props;

  return (
      <div className="SizeOption">
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
            <p>{ selectedTypeId !== 80690 ? countPeople[index] : '2' } Personen</p>
            <p>{ selectedTypeId !== 80690 ? 'Durchmesser' : 'Länge'} - { main.Name.trim().slice(0, 3) } cm</p>

          </div>
        }) : null }
      </div>
  )
}


export default SizeOption;
