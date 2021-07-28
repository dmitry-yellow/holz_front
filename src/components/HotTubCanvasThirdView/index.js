import { useRef, useEffect, useState } from "react";
import { useKunakovHeight } from "../customHooks/useKunakovHeight";
import { Group, Layer, Stage } from "react-konva";
import Image from "../Image/Image";
import schalter_1 from '../../assets/images/schalter/Hottub-Studio_0002s_0004s_0003_Schalter-01.png';
import schalter_2 from '../../assets/images/schalter/Hottub-Studio_0002s_0004s_0002_Schalter-02.png';
import schalter_3 from '../../assets/images/schalter/Hottub-Studio_0002s_0004s_0001_Schalter-03.png';
import schalter_4 from '../../assets/images/schalter/Hottub-Studio_0002s_0004s_0000_Schalter-04.png';
import { useImageSmokeProperties } from "../customHooks/useImageSmokeProperties";
import { useImageHeatingOvenProperties } from "../customHooks/useImageHeatingOvenProperties";
import { useImageCoverProperties } from "../customHooks/useImageCoverProperties";
import { useImageWoodProperties } from "../customHooks/useImageWoodProperties";
import { useImageBcgShadowProperties } from "../customHooks/useImageBcgShadowProperties";
import { useImageExteriorHeatingOvenProperties } from "../customHooks/useImageExteriorHeatingOvenProperties";
import { useImageExteriorBcgProperties } from "../customHooks/useImageExteriorBcgProperties";
import { useImageMassageFunctionProperties } from "../customHooks/useImageMassageFunctionProperties";
import { useImageTubeExtensionProperties } from "../customHooks/useImageTubeExtensionProperties";
import { useImageMetalStrapsProperties } from "../customHooks/useImageMetalStrapsProperties";
import { useImageInsideColorProperties } from "../customHooks/useImageInsideColorProperties";
import { useImageAdditionalAccessoriesProperties } from "../customHooks/useImageAdditionalAccessoriesProperties";
import WoodOptionGroup from "../OptionGroups/WoodOptionGroup";
import InsideColorGroup from "../OptionGroups/InsideColorOptionGroup";
import CoverOptionGroup from "../OptionGroups/CoverOptionGroup";
import MetalStrapsOptionGroup from "../OptionGroups/MetalStrapsOptionGroup";
import TubeExtensionOptionGroup from "../OptionGroups/TubeExtensionOptionGroup";
import AdditionalAccessories from "../OptionGroups/AdditionalAccessoriesOptionGroup";
import { optionGroupWoodPropThirdView } from "../OptionGroups/WoodOptionGroup/helper";
import { optionGroupInsideColorPropThirdView } from "../OptionGroups/InsideColorOptionGroup/helper";
import { optionGroupCoverPropThirdView } from "../OptionGroups/CoverOptionGroup/helper";
import { optionGroupMetalStrapsPropThirdView } from "../OptionGroups/MetalStrapsOptionGroup/helper";
import { optionGroupTubeExtensionPropThirdView } from "../OptionGroups/TubeExtensionOptionGroup/helper";
import { optionGroupAdditionalAccessoriesPropThirdView } from "../OptionGroups/AdditionalAccessoriesOptionGroup/helper";
import { useSelector } from "react-redux";
import { getNoCoverId, getSmallSizeId } from "../helperForIds";


const HotTubCanvasThirdView = (props) => {

  const {
    hotTubStageHeight,
    hotTubStageWidth,
    isExteriorBcg,
    setOpenTab,
    customizeData,
    rootData, isCustomizeOptionsWater,
    selectedInsideColorId,
    selectedMetalStrapsId,
    selectedHeatingOvenId,
    selectedAdditionalAccessoriesIds,
    selectedWoodId,
    selectedSpruceColorId,
    selectedTubeExtensionId,
    selectedCoverId,
    selectedMassageFunctionId,
    selectedLedId,
    selectedSizeId,
    isCustomizeOptionsOpen,
    coverOptionOpacity
  } = props;

  const apiUrl = process.env.REACT_APP_HOST_API_URL;
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);
  const noCoverId = getNoCoverId(selectedTypeId);
  const [calcHeight] = useKunakovHeight(hotTubStageHeight);

  const accessoriesRef = useRef(null);
  const iconsRef = useRef(null);
  const bcgRefImageLayer = useRef(null);
  const massageRef = useRef(null);
  const bcgShadowRef = useRef(null);
  const [scaleX, setScaleX] = useState(null);
  const [scaleY, setScaleY] = useState(null);
  const [offsetX, setOffsetX] = useState(null);
  const [offsetY, setOffsetY] = useState(null);
  const imageSmokeSrc = useImageSmokeProperties(customizeData, selectedHeatingOvenId, apiUrl, '2');
  const imageHeatingOvenSrc = useImageHeatingOvenProperties(customizeData, selectedHeatingOvenId, apiUrl, 'imageLarge3', '2');
  const imageCoverSrc = useImageCoverProperties(customizeData, selectedCoverId, apiUrl, 'imageLarge3', '2');
  const imageWoodSrc = useImageWoodProperties(customizeData, selectedWoodId, selectedSpruceColorId, apiUrl, 'imageLarge3', '2');
  const bcgShadowImage = useImageBcgShadowProperties(customizeData, selectedSizeId, apiUrl, 'imageLarge3', '2');
  const imageExteriorHeatingOvenSrc = useImageExteriorHeatingOvenProperties(rootData, isExteriorBcg, apiUrl, 'image3', '2');
  const bcgExteriorImage = useImageExteriorBcgProperties(rootData, isExteriorBcg, apiUrl, 'exterior3');
  const imageMassageFunctionSrc = useImageMassageFunctionProperties(customizeData, selectedMassageFunctionId, isCustomizeOptionsWater, apiUrl, 'imageLarge3', 'image3', '2');
  const imageTubeExtensionSrc = useImageTubeExtensionProperties(customizeData, selectedTubeExtensionId, isExteriorBcg, apiUrl, 'imageLarge3', 'objectimage3', '2');
  const imageMetalStrapsSrc = useImageMetalStrapsProperties(customizeData, selectedMetalStrapsId, isExteriorBcg, apiUrl, 'imageLarge3', 'objectimage3', '2');
  const imageInsideColorSrc = useImageInsideColorProperties(customizeData, selectedTypeId, selectedInsideColorId, selectedLedId, selectedSizeId, isCustomizeOptionsWater, apiUrl, 'imageLarge3', 'image3', '2');
  const imageAdditionalAccessoriesSrc = useImageAdditionalAccessoriesProperties(customizeData, selectedTypeId, selectedAdditionalAccessoriesIds, selectedWoodId, selectedSpruceColorId, isExteriorBcg, apiUrl, 'imageLarge3', 'objectimage3', '2');
  const isLoadingData = useSelector(state => state.hotTub.isLoadingData);

  useEffect(() => {
    if (iconsRef.current) {
      iconsRef.current.zIndex(5);
    }
    if (massageRef.current) {
      massageRef.current.zIndex(4);
    }

    if (bcgShadowRef.current) {
      bcgShadowRef.current.zIndex(1);
    }

    if (bcgRefImageLayer.current) {
      bcgRefImageLayer.current.zIndex(0);
    }

    if (hotTubStageWidth && hotTubStageHeight) {
      if(selectedTypeId === 4224){
        setScaleForLayers(hotTubStageWidth);
      } else {
        setScaleForExternalLayers(hotTubStageWidth);
      }
    }

  }, [iconsRef, accessoriesRef, massageRef, selectedSizeId, hotTubStageWidth, hotTubStageHeight]);


  const schalters = [
    { image: schalter_1, width: 20, height: 20, x: -18, y: -10 },
    { image: schalter_2, width: 20, height: 20, x: 10, y: -16 },
    { image: schalter_3, width: 20, height: 20, x: 38, y: -24 }
  ];

  const optionName = function (name) {
    return rootData?.descriptions[name]?.germanName;
  }

  const setScaleForLayers = (hotTubStageWidth) => {

    const smallSizeId = getSmallSizeId(selectedTypeId);   // old id = 80504

    if (+hotTubStageWidth >= 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(1);
        setScaleY(1);
        setOffsetX(0);
        setOffsetY(-250);
      } else {
        setScaleX(1.05);
        setScaleY(1.05);
        setOffsetX(0);
        setOffsetY(-250);
      }
    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.57);
        setScaleY(0.57);
        setOffsetX(150);
        setOffsetY(-400);
      } else {
        setScaleX(0.6);
        setScaleY(0.6);
        setOffsetX(130);
        setOffsetY(-400);
      }
    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(120);
        setOffsetY(-400);
      } else {
        setScaleX(0.9);
        setScaleY(0.9);
        setOffsetX(120);
        setOffsetY(-400);
      }
    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(-50);
        setOffsetY(-650);
      } else {
        setScaleX(0.9);
        setScaleY(0.9);
        setOffsetX(-50);
        setOffsetY(-600);
      }
    } else if (+hotTubStageWidth >= 340 && +hotTubStageWidth < 500) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.7);
        setScaleY(0.7);
        setOffsetX(-140);
        setOffsetY(-800);
      } else {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-140);
        setOffsetY(-800);
      }
    } else if (+hotTubStageWidth <= 340) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.6);
        setScaleY(0.6);
        setOffsetX(-170);
        setOffsetY(-1400);
      } else {
        setScaleX(0.65);
        setScaleY(0.65);
        setOffsetX(-170);
        setOffsetY(-1300);
      }
    }
  }

  const setScaleForExternalLayers = (hotTubStageWidth) => {

    const smallSizeId = getSmallSizeId(selectedTypeId);   // old id = 80504

    if (+hotTubStageWidth >= 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(1);
        setScaleY(1);
        setOffsetX(0);
        setOffsetY(-250);
      } else {
        setScaleX(1.05);
        setScaleY(1.05);
        setOffsetX(0);
        setOffsetY(-250);
      }
    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.57);
        setScaleY(0.57);
        setOffsetX(200);
        setOffsetY(-400);
      } else {
        setScaleX(0.59);
        setScaleY(0.59);
        setOffsetX(200);
        setOffsetY(-400);
      }
    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(120);
        setOffsetY(-400);
      } else {
        setScaleX(0.9);
        setScaleY(0.9);
        setOffsetX(120);
        setOffsetY(-400);
      }
    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.9);
        setScaleY(0.9);
        setOffsetX(-50);
        setOffsetY(-600);
      } else {
        setScaleX(0.93);
        setScaleY(0.93);
        setOffsetX(-50);
        setOffsetY(-550);
      }
    } else if (+hotTubStageWidth >= 340 && +hotTubStageWidth < 500) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.8);
        setScaleY(0.8);
        setOffsetX(-80);
        setOffsetY(-600);
      } else {
        setScaleX(0.83);
        setScaleY(0.83);
        setOffsetX(-80);
        setOffsetY(-600);
      }
    } else if (+hotTubStageWidth <= 340) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.7);
        setScaleY(0.7);
        setOffsetX(-50);
        setOffsetY(-1200);
      } else {
        setScaleX(0.73);
        setScaleY(0.73);
        setOffsetX(-50);
        setOffsetY(-1200);
      }
    }
  }


  return (
    <div className='HotTubCanvasSecondView'>
      <Stage width={ hotTubStageWidth }
             height={ hotTubStageHeight }
             offsetX={ -hotTubStageWidth / 2 }
             offsetY={ -hotTubStageHeight / 2 }
      >
        { !isLoadingData && <Layer ref={ massageRef }
                 scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
        >
          { selectedTypeId === 80602 && imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map((item, index) => {
            return <Image key={ index }
                          x={ +item.position.x2 && +item.position.x2 }
                          y={ +item.position.y2 && +item.position.y2 }
                          width={ +item.width && +item.width }
                          height={ +item.height && +item.height }
                          src={ item.image && item.image }
            />
          }) }
          { imageMassageFunctionSrc && <Image x={ +imageMassageFunctionSrc?.[1].x2 }
                                              y={ +imageMassageFunctionSrc?.[1].y2 }
                                              width={ +imageMassageFunctionSrc[2].width }
                                              height={ +imageMassageFunctionSrc[2].height }
                                              src={ imageMassageFunctionSrc?.[0] }
                                              opacity={ selectedCoverId !== noCoverId && coverOptionOpacity ? 0 : 1 }
          />
          }
          { selectedTypeId === 4224 && <Group>
            { +selectedMassageFunctionId !== 80515 && schalters?.length > 1 && schalters.map((schalter, index) => {
              return <Image x={ schalter.x }
                            y={ schalter.y }
                            width={ schalter.width }
                            height={ schalter.height }
                            src={ schalter.image }
                            key={ index }
              />
            }) }
            { +selectedLedId !== 80517 && <Image x={ 63 }
                                                 y={ -35 }
                                                 width={ 20 }
                                                 height={ 20 }
                                                 src={ schalter_4 }
            />
            }
          </Group> }
        </Layer> }

        { !isLoadingData && <Layer ref={ iconsRef }
                 opacity={ isCustomizeOptionsOpen ? 1 : 0 }
                 scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
        >
          <WoodOptionGroup setOpenTab={ setOpenTab } optionName={ optionName }
                           optionGroupProp={ optionGroupWoodPropThirdView[selectedTypeId] }
          />
          <InsideColorGroup setOpenTab={ setOpenTab } optionName={ optionName }
                            optionGroupProp={ optionGroupInsideColorPropThirdView[selectedTypeId] }
          />
          <CoverOptionGroup setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                            optionGroupProp={ optionGroupCoverPropThirdView[selectedTypeId] }
                            selectedCoverId={ selectedCoverId }
          />
          <MetalStrapsOptionGroup setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                                  optionGroupProp={ optionGroupMetalStrapsPropThirdView[selectedTypeId] }
                                  selectedMetalStrapsId={ selectedMetalStrapsId }
          />
          <TubeExtensionOptionGroup setOpenTab={ setOpenTab } optionName={ optionName }
                                    selectedTypeId={ selectedTypeId }
                                    optionGroupProp={ optionGroupTubeExtensionPropThirdView[selectedTypeId] }
                                    selectedTubeExtensionId={ selectedTubeExtensionId }
          />
          <AdditionalAccessories setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                                 optionGroupProp={ optionGroupAdditionalAccessoriesPropThirdView[selectedTypeId] }
                                 selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
          />
        </Layer> }


        { !isLoadingData && <Layer scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
        >
          { selectedTypeId === 4224 || selectedTypeId === 80690 && imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map((item, index) => {
            return <Image key={ index }
                          x={ +item.position.x2 && +item.position.x2 }
                          y={ +item.position.y2 && +item.position.y2 }
                          width={ +item.width && +item.width }
                          height={ +item.height && +item.height }
                          src={ item.image && item.image }
            />
          }) }
          <Group>
            { imageTubeExtensionSrc && <Image x={ +imageTubeExtensionSrc[1].x2 }      // tube extension additional 1m
                                              y={ +imageTubeExtensionSrc[1].y2 }
                                              width={ +imageTubeExtensionSrc[2].width }
                                              height={ +imageTubeExtensionSrc[2].height }
                                              src={ imageTubeExtensionSrc[0] }
            />
            }
          </Group>

        </Layer> }


        <Layer scaleX={ 1 }
               scaleY={ 1 }
               ref={ bcgRefImageLayer }
        >
          { (bcgExteriorImage && isExteriorBcg) && <Image x={ -hotTubStageWidth / 2 }
                                                          y={ -hotTubStageHeight / 2 }
                                                          width={ hotTubStageWidth }
                                                          height={ hotTubStageHeight }
                                                          src={ bcgExteriorImage }/>
          }
        </Layer>

        { !isLoadingData && <Layer scaleX={ calcHeight(scaleX && scaleX) }    // bottom shadow
                 scaleY={ calcHeight(scaleY && scaleY) }
                 ref={ bcgShadowRef }
        >
          { bcgShadowImage && <Image x={ +bcgShadowImage[1].x2 }
                                     y={ +bcgShadowImage[1].y2 }
                                     width={ +bcgShadowImage[2].width }
                                     height={ +bcgShadowImage[2].height }
                                     src={ bcgShadowImage[0] }
                                     offsetX={ offsetX && offsetX }
                                     offsetY={ offsetY && calcHeight(offsetY) }
          /> }
        </Layer> }

        { !isLoadingData && <Layer scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
        >

          { imageHeatingOvenSrc && <Image x={ +imageHeatingOvenSrc[1].x2 }           // heating oven image
                                          y={ +imageHeatingOvenSrc[1].y2 }
                                          width={ +imageHeatingOvenSrc[2].width }
                                          height={ +imageHeatingOvenSrc[2].height }
                                          src={ imageHeatingOvenSrc[0] }
                                          opacity={ isExteriorBcg ? 0 : 1 }
          />
          }


          { imageExteriorHeatingOvenSrc &&
          <Image x={ +imageExteriorHeatingOvenSrc[1].x2 }     // heating oven exterior image
                 y={ +imageExteriorHeatingOvenSrc[1].y2 }
                 width={ +imageExteriorHeatingOvenSrc[2].width }
                 height={ +imageExteriorHeatingOvenSrc[2].height }
                 src={ imageExteriorHeatingOvenSrc[0] }
                 opacity={ isExteriorBcg ? 1 : 0 }
          />
          }

          { imageWoodSrc && <Image x={ +imageWoodSrc[1].x2 }              // wood and spruce images
                                   y={ +imageWoodSrc[1].y2 }
                                   width={ +imageWoodSrc[2].width }
                                   height={ +imageWoodSrc[2].height }
                                   src={ imageWoodSrc[0] }
          />
          }

          { imageMetalStrapsSrc && <Image x={ +imageMetalStrapsSrc?.[1].x2 }
                                          y={ +imageMetalStrapsSrc?.[1].y2 }
                                          width={ +imageMetalStrapsSrc?.[2].width }
                                          height={ +imageMetalStrapsSrc?.[2].height }
                                          src={ imageMetalStrapsSrc[0] }
          />
          }

          { imageInsideColorSrc && <Image
            x={ +imageInsideColorSrc[1].x2 }                  // inside color without or with water and led or no led
            y={ +imageInsideColorSrc[1].y2 }
            width={ +imageInsideColorSrc[2].width }
            height={ +imageInsideColorSrc[2].height }
            src={ imageInsideColorSrc[0] }
          />
          }

          { imageCoverSrc && <Image x={ +imageCoverSrc?.[1].x2 }
                                    y={ +imageCoverSrc?.[1].y2 }
                                    width={ +imageCoverSrc?.[2].width }
                                    height={ +imageCoverSrc?.[2].height }
                                    src={ imageCoverSrc[0] }
                                    opacity={ coverOptionOpacity ? 1 : 0 }
          />
          }

          { imageSmokeSrc && <Image x={ +imageSmokeSrc[1].x2 }        // tube smoke top
                                    y={ +imageSmokeSrc[1].y2 }
                                    width={ +imageSmokeSrc[2].width }
                                    height={ +imageSmokeSrc[2].height }
                                    src={ imageSmokeSrc[0] }
          /> }
        </Layer> }
      </Stage>

    </div>
  )

}

export default HotTubCanvasThirdView;