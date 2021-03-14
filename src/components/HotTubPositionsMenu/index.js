import cn from 'classnames';
import './style.css';


const HotTubPositionsMenu = (props) => {

  const { hotTubPositionView, setHotTubPositionView } = props;

  return (
      <div className="HotTubPositionsMenu">
          <span
              className={ cn("HotTubPositionsMenu-middleTopWater",
                  hotTubPositionView === 'positionOne' && 'selected') }
              onClick={ () => setHotTubPositionView('positionOne') }
          ></span>
        <span className={ cn("HotTubPositionsMenu-middle",
            hotTubPositionView === 'positionTwo' && 'selected') }
              onClick={ () => setHotTubPositionView('positionTwo') }
        ></span>
        <span className={ cn("HotTubPositionsMenu-middleTop",
            hotTubPositionView === 'positionThree' && 'selected') }
              onClick={ () => setHotTubPositionView('positionThree') }
        ></span>
        <span className={ cn("HotTubPositionsMenu-top",
            hotTubPositionView === 'positionFour' && 'selected') }
              onClick={ () => setHotTubPositionView('positionFour') }
        ></span>
      </div>
  )
}

export default HotTubPositionsMenu;