import { useState, useEffect } from 'react';
import HotTubPositionsMenu from "../HotTubPositionsMenu";
import TotalAmountCard from "../TotalAmountCard";
import HotTubCustomize from "../HotTubCustomize";
import HotTubControls from "../HotTubControls";
import HotTubCanvasView from "../HotTubCanvasView";
import { useDispatch, useSelector } from "react-redux";
import { getCalcData } from "../../actions/hotTub";
import cn from 'classnames';
import './style.css';
import HotTubCanvasSecondView from "../HotTubCanvasSecondView";
import HotTubCanvasThirdView from "../HotTubCanvasThirdView";
import HotTubCanvasFourthView from "../HotTubCanvasFourthView";

const Holz = () => {

  const [isCustomizeOptionsOpen, setCustomizeOptionsOpen] = useState(false);
  const [isCustomizeOptionsWater, setCustomizeOptionsWater] = useState(false);
  const [isExteriorBcg, setExteriorBcg] = useState(true);
  const [coverOptionOpacity, setCoverOptionOpacity] = useState(true);
  const [openTab, setOpenTab] = useState('');
  const [hotTubStageWidth, setHotTubStageWidth] = useState(0);
  const [hotTubStageHeight, setHotTubStageHeight] = useState(0);
  const [hotTubPositionView, setHotTubPositionView] = useState('positionOne');

  const dispatch = useDispatch();

  const customizeData = useSelector(state => state.hotTub.data);
  const rootData = useSelector(state => state.hotTub.rootData);
  const selectedSizeId = useSelector(state => state.hotTub.selectedSizeId);
  const selectedWoodId = useSelector(state => state.hotTub.selectedWoodId);
  const selectedSpruceColorId = useSelector(state => state.hotTub.selectedSpruceColorId);
  const selectedInsideColorId = useSelector(state => state.hotTub.selectedInsideColorId);
  const selectedCoverId = useSelector(state => state.hotTub.selectedCoverId);
  const selectedMetalStrapsId = useSelector(state => state.hotTub.selectedMetalStrapsId);
  const selectedMassageFunctionId = useSelector(state => state.hotTub.selectedMassageFunctionId);
  const selectedLedId = useSelector(state => state.hotTub.selectedLedId);
  const selectedWarmingId = useSelector(state => state.hotTub.selectedWarmingId);
  const selectedHeatingOvenId = useSelector(state => state.hotTub.selectedHeatingOvenId);
  const selectedAdditionalAccessoriesIds = useSelector(state => state.hotTub.selectedAdditionalAccessoriesIds);
  const selectedTubeExtensionId = useSelector(state => state.hotTub.selectedTubeExtensionId);
  const selectedDeliveryId = useSelector(state => state.hotTub.selectedDeliveryId);
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);


  useEffect(() => {
    getHeightAndWidthStage();
    dispatch(getCalcData());
  }, [dispatch, selectedTypeId])   //selectedTypeId  добавить в зависимости чтобы подтянуть второй хот таб

  useEffect(() => {
    window.addEventListener('resize', getHeightAndWidthStage);
    return () => window.removeEventListener('resize', getHeightAndWidthStage)
  }, [])



  const classForHolz = cn("Holz", isExteriorBcg && "exterior");

  const getHeightAndWidthStage = () => {
    const HotTubCanvasViewElem = document.getElementsByClassName('Holz');  //HotTubCanvasView
    if (HotTubCanvasViewElem?.[0].clientWidth && HotTubCanvasViewElem?.[0].clientHeight) {
      setHotTubStageWidth(HotTubCanvasViewElem[0].clientWidth); // 1440
      setHotTubStageHeight(HotTubCanvasViewElem[0].clientHeight);
    }
  }

  return (
      <div className={ classForHolz }>
        { hotTubPositionView === 'positionOne' && <HotTubCanvasView hotTubStageWidth={ hotTubStageWidth }
                                                                    hotTubStageHeight={ hotTubStageHeight }
                                                                    hotTubPositionView={ hotTubPositionView }
                                                                    isExteriorBcg={ isExteriorBcg }
                                                                    setOpenTab={ setOpenTab }
                                                                    customizeData={ customizeData }
                                                                    rootData={ rootData }
                                                                    selectedSizeId={ selectedSizeId }
                                                                    selectedInsideColorId={ selectedInsideColorId }
                                                                    selectedLedId={ selectedLedId }
                                                                    selectedMetalStrapsId={ selectedMetalStrapsId }
                                                                    selectedHeatingOvenId={ selectedHeatingOvenId }
                                                                    selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
                                                                    selectedWoodId={ selectedWoodId }
                                                                    selectedSpruceColorId={ selectedSpruceColorId }
                                                                    selectedTubeExtensionId={ selectedTubeExtensionId }
                                                                    selectedCoverId={ selectedCoverId }
                                                                    selectedMassageFunctionId={selectedMassageFunctionId}
                                                                    isCustomizeOptionsOpen={ isCustomizeOptionsOpen }
                                                                    isCustomizeOptionsWater={ isCustomizeOptionsWater }
                                                                    coverOptionOpacity={ coverOptionOpacity }
        /> }
        { hotTubPositionView === 'positionTwo' && <HotTubCanvasSecondView hotTubStageWidth={ hotTubStageWidth }
                                                                          hotTubStageHeight={ hotTubStageHeight }
                                                                          hotTubPositionView={ hotTubPositionView }
                                                                          isExteriorBcg={ isExteriorBcg }
                                                                          setOpenTab={ setOpenTab }
                                                                          customizeData={ customizeData }
                                                                          rootData={ rootData }
                                                                          selectedSizeId={ selectedSizeId }
                                                                          selectedInsideColorId={ selectedInsideColorId }
                                                                          selectedMetalStrapsId={ selectedMetalStrapsId }
                                                                          selectedHeatingOvenId={ selectedHeatingOvenId }
                                                                          selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
                                                                          selectedWoodId={ selectedWoodId }
                                                                          selectedSpruceColorId={ selectedSpruceColorId }
                                                                          selectedTubeExtensionId={ selectedTubeExtensionId }
                                                                          selectedCoverId={ selectedCoverId }
                                                                          isCustomizeOptionsWater={ isCustomizeOptionsWater }
                                                                          isCustomizeOptionsOpen={ isCustomizeOptionsOpen }
                                                                          coverOptionOpacity={ coverOptionOpacity }
        /> }
        { hotTubPositionView === 'positionThree' && <HotTubCanvasThirdView hotTubStageWidth={ hotTubStageWidth }
                                                                           hotTubStageHeight={ hotTubStageHeight }
                                                                           hotTubPositionView={ hotTubPositionView }
                                                                           isExteriorBcg={ isExteriorBcg }
                                                                           setOpenTab={ setOpenTab }
                                                                           customizeData={ customizeData }
                                                                           rootData={ rootData }
                                                                           selectedSizeId={ selectedSizeId }
                                                                           selectedInsideColorId={ selectedInsideColorId }
                                                                           selectedMetalStrapsId={ selectedMetalStrapsId }
                                                                           selectedHeatingOvenId={ selectedHeatingOvenId }
                                                                           selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
                                                                           selectedWoodId={ selectedWoodId }
                                                                           selectedSpruceColorId={ selectedSpruceColorId }
                                                                           selectedTubeExtensionId={ selectedTubeExtensionId }
                                                                           selectedCoverId={ selectedCoverId }
                                                                           selectedMassageFunctionId={selectedMassageFunctionId}
                                                                           selectedLedId={ selectedLedId }
                                                                           isCustomizeOptionsOpen={ isCustomizeOptionsOpen }
                                                                           isCustomizeOptionsWater={ isCustomizeOptionsWater }
                                                                           coverOptionOpacity={ coverOptionOpacity }
        /> }
        { hotTubPositionView === 'positionFour' && <HotTubCanvasFourthView hotTubStageWidth={ hotTubStageWidth }
                                                                           hotTubStageHeight={ hotTubStageHeight }
                                                                           hotTubPositionView={ hotTubPositionView }
                                                                           isExteriorBcg={ isExteriorBcg }
                                                                           setOpenTab={ setOpenTab }
                                                                           customizeData={ customizeData }
                                                                           rootData={ rootData }
                                                                           selectedSizeId={ selectedSizeId }
                                                                           selectedInsideColorId={ selectedInsideColorId }
                                                                           selectedMetalStrapsId={ selectedMetalStrapsId }
                                                                           selectedHeatingOvenId={ selectedHeatingOvenId }
                                                                           selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
                                                                           selectedWoodId={ selectedWoodId }
                                                                           selectedSpruceColorId={ selectedSpruceColorId }
                                                                           selectedTubeExtensionId={ selectedTubeExtensionId }
                                                                           selectedCoverId={ selectedCoverId }
                                                                           selectedMassageFunctionId={selectedMassageFunctionId}
                                                                           selectedLedId={ selectedLedId }
                                                                           isCustomizeOptionsWater={ isCustomizeOptionsWater }
                                                                           isCustomizeOptionsOpen={ isCustomizeOptionsOpen }
                                                                           coverOptionOpacity={ coverOptionOpacity }
        /> }
        <div className="Controls-totalAmount-customizeHotTub-container">
          <HotTubPositionsMenu setHotTubPositionView={ setHotTubPositionView }
                               hotTubPositionView={ hotTubPositionView }
          />
          <HotTubCustomize
              customizeData={ customizeData }
              openTab={ openTab }
              setOpenTab={ setOpenTab }
              rootData={rootData}
              setHotTubPositionView={setHotTubPositionView}
              setExteriorBcg={setExteriorBcg}
              setCoverOptionOpacity={setCoverOptionOpacity}
          />
          <TotalAmountCard customizeData={ customizeData }
                           selectedSizeId={ selectedSizeId }
                           selectedWoodId={ selectedWoodId }
                           selectedSpruceColorId={ selectedSpruceColorId }
                           selectedInsideColorId={ selectedInsideColorId }
                           selectedCoverId={ selectedCoverId }
                           selectedMetalStrapsId={ selectedMetalStrapsId }
                           selectedMassageFunctionId={ selectedMassageFunctionId }
                           selectedLedId={ selectedLedId }
                           selectedWarmingId={ selectedWarmingId }
                           selectedHeatingOvenId={ selectedHeatingOvenId }
                           selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
                           selectedTubeExtensionId={ selectedTubeExtensionId }
                           selectedDeliveryId={ selectedDeliveryId }
                           setHotTubPositionView={ setHotTubPositionView }
                           setExteriorBcg={setExteriorBcg}
          />
          <HotTubControls
              isCustomizeOptionsOpen={ isCustomizeOptionsOpen }
              setCustomizeOptionsOpen={ setCustomizeOptionsOpen }
              isCustomizeOptionsWater={ isCustomizeOptionsWater }
              setCustomizeOptionsWater={ setCustomizeOptionsWater }
              isExteriorBcg={ isExteriorBcg }
              setExteriorBcg={ setExteriorBcg }
              coverOptionOpacity={ coverOptionOpacity }
              setCoverOptionOpacity={ setCoverOptionOpacity }
          />
        </div>
      </div>
  )
      ;
}

export default Holz;
