import cn from "classnames";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTypeId } from "../../actions/hotTub";
import jadeIcon from '../../assets/images/jade-icon.png';
import opalIcon from '../../assets/images/opal-icon.png';
import saphirIcon from '../../assets/images/saphir-icon.png';


const TypeOption = (props) => {

  const { setOpenTab, setCoverOptionOpacity } = props;
  const dispatch = useDispatch();
  const typeOptions = useSelector(state => state.hotTub.typeOptions);
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);

  const getCorrectTypeIcon = (currentId) => {
    if(currentId === 4224){
      return saphirIcon;
    }
    if(currentId === 80602){
      return jadeIcon;
    }
    if(currentId === 80690){
      return opalIcon;
    }
  }

  return (
    <div className="TypeOption">
      <p>Whirlpool-Typ</p>
      { typeOptions?.length >= 1 && typeOptions.map(item => {
        return <div key={item.id}
                    className={cn('TypeOption-item', selectedTypeId === item.id && 'selected')}
                    onClick={() => {
                      dispatch(setSelectedTypeId(item.id))
                      setCoverOptionOpacity(true);
                      if(window.location.search){
                        window.history.pushState(null, null, window.location.pathname);
                      }
                      setOpenTab('');
                    }}
        >
          <img src={getCorrectTypeIcon(item.id)} alt="icon"/>
          <p className='TypeOption-item-typeName'>{ item.type }</p>
        </div>
      }) }

    </div>
  )
}


export default TypeOption;