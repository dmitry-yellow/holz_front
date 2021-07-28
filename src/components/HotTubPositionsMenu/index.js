import cn from 'classnames';
import './style.css';
import { useSelector } from "react-redux";


const HotTubPositionsMenu = (props) => {

  const { hotTubPositionView, setHotTubPositionView } = props;
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);
  const selectedPosOne = hotTubPositionView === 'positionOne';
  const selectedPosTwo = hotTubPositionView === 'positionTwo';
  const selectedPosThree = hotTubPositionView === 'positionThree';
  const selectedPosFour = hotTubPositionView === 'positionFour';

  return (
    <div className="HotTubPositionsMenu">
      <span
        className={
          cn("HotTubPositionsMenu-middleTopWater",
            selectedPosOne && 'selected',
            selectedTypeId === 80602 && 'jadeMiddleTopWater',
            selectedTypeId === 80690 && 'opalMiddleTopWater'
          ) }
        onClick={ () => setHotTubPositionView('positionOne') }
      > </span>
      <span
        className={
          cn("HotTubPositionsMenu-middle",
            selectedPosTwo && 'selected',
            selectedTypeId === 80602 && 'jadeMiddle',
            selectedTypeId === 80690 && 'opalMiddle'
          ) }
        onClick={ () => setHotTubPositionView('positionTwo') }
      > </span>
      <span className={
        cn("HotTubPositionsMenu-middleTop",
          selectedPosThree && 'selected',
          selectedTypeId === 80602 && 'jadeMiddleTop',
          selectedTypeId === 80690 && 'opalMiddleTop'
        )}
            onClick={ () => setHotTubPositionView('positionThree') }
      > </span>
      <span className={
        cn("HotTubPositionsMenu-top",
          selectedPosFour && 'selected',
          selectedTypeId === 80602 && 'jadeTop',
          selectedTypeId === 80690 && 'opalTop'
        )}
            onClick={ () => setHotTubPositionView('positionFour') }
      > </span>
    </div>
  )
}

export default HotTubPositionsMenu;