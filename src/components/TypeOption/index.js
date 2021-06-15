import cn from "classnames";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTypeId } from "../../actions/hotTub";


const TypeOption = () => {

  const dispatch = useDispatch();
  const typeOptions = useSelector(state => state.hotTub.typeOptions);
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);

  return (
    <div className="TypeOption">
      <p>Whirlpool-Typ</p>
      { typeOptions?.length >= 1 && typeOptions.map(item => {
        return <div key={item.id}
                    className={cn('TypeOption-item', selectedTypeId === item.id && 'selected')}
                    onClick={() => {
                      dispatch(setSelectedTypeId(item.id))
                    }}
        >
            <p className='TypeOption-item-typeName'>{ item.type }</p>
            <p>Ab {item.ab} €</p>
        </div>
      }) }

    </div>
  )
}


export default TypeOption;