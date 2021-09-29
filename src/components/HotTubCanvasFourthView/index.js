import { useRef, useEffect, useState } from "react";
import { useKunakovHeight } from "../customHooks/useKunakovHeight";
import { Group, Layer, Stage } from "react-konva";
import Image from "../Image/Image";
import { useImageSmokeProperties } from "../customHooks/useImageSmokeProperties";
import { useImageHeatingOvenProperties } from "../customHooks/useImageHeatingOvenProperties";
import { useImageCoverProperties } from "../customHooks/useImageCoverProperties";
import { useImageWoodProperties } from "../customHooks/useImageWoodProperties";
import { useImageBcgShadowProperties } from "../customHooks/useImageBcgShadowProperties";
import { useImageExteriorHeatingOvenProperties } from "../customHooks/useImageExteriorHeatingOvenProperties";
import { useImageExteriorBcgProperties } from "../customHooks/useImageExteriorBcgProperties";
import { useImageMassageFunctionProperties } from "../customHooks/useImageMassageFunctionProperties";
import { useImageTubeExtensionProperties } from "../customHooks/useImageTubeExtensionProperties";
import { useImageInsideColorProperties } from "../customHooks/useImageInsideColorProperties";
import { useImageAdditionalAccessoriesProperties } from "../customHooks/useImageAdditionalAccessoriesProperties";
import WoodOptionGroup from "../OptionGroups/WoodOptionGroup";
import InsideColorGroup from "../OptionGroups/InsideColorOptionGroup";
import CoverOptionGroup from "../OptionGroups/CoverOptionGroup";
import TubeExtensionOptionGroup from "../OptionGroups/TubeExtensionOptionGroup";
import AdditionalAccessories from "../OptionGroups/AdditionalAccessoriesOptionGroup";
import { optionGroupWoodPropFourthView } from "../OptionGroups/WoodOptionGroup/helper";
import { optionGroupInsideColorPropFourthView } from "../OptionGroups/InsideColorOptionGroup/helper";
import { optionGroupCoverPropFourthView } from "../OptionGroups/CoverOptionGroup/helper";
import { optionGroupTubeExtensionPropFourthView } from "../OptionGroups/TubeExtensionOptionGroup/helper";
import { optionGroupAdditionalAccessoriesPropFourthView } from "../OptionGroups/AdditionalAccessoriesOptionGroup/helper";
import { useSelector } from "react-redux";
import { getNoCoverId, getSmallSizeId } from "../helperForIds";


const HotTubCanvasFourthView = (props) => {

  const {
    hotTubStageHeight,
    hotTubStageWidth,
    isExteriorBcg,
    setOpenTab,
    customizeData,
    rootData,
    selectedInsideColorId,
    selectedHeatingOvenId,
    selectedAdditionalAccessoriesIds,
    selectedWoodId,
    selectedSpruceColorId,
    selectedTubeExtensionId,
    selectedCoverId,
    isCustomizeOptionsOpen,
    isCustomizeOptionsWater,
    selectedMassageFunctionId,
    selectedLedId,
    selectedSizeId,
    coverOptionOpacity
  } = props;

  const apiUrl = process.env.REACT_APP_HOST_API_URL;
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);
  const [calcHeight] = useKunakovHeight(hotTubStageHeight);
  const noCoverId = getNoCoverId(selectedTypeId);
  const accessoriesRef = useRef(null);
  const iconsRef = useRef(null);
  const bcgRefImageLayer = useRef(null);
  const massageRef = useRef(null);
  const bcgShadowRef = useRef(null);
  const [scaleX, setScaleX] = useState(null);
  const [scaleY, setScaleY] = useState(null);
  const [offsetX, setOffsetX] = useState(null);
  const [offsetY, setOffsetY] = useState(null);
  const imageSmokeSrc = useImageSmokeProperties(customizeData, selectedHeatingOvenId, apiUrl, "3");
  const imageHeatingOvenSrc = useImageHeatingOvenProperties(customizeData, selectedHeatingOvenId, apiUrl, 'imageLarge4', '3');
  const imageCoverSrc = useImageCoverProperties(customizeData, selectedCoverId, apiUrl, 'imageLarge4', '3');
  const imageWoodSrc = useImageWoodProperties(customizeData, selectedWoodId, selectedSpruceColorId, apiUrl, 'imageLarge4', '3');
  const bcgShadowImage = useImageBcgShadowProperties(customizeData, selectedSizeId, apiUrl, 'imageLarge4', '3');
  const imageExteriorHeatingOvenSrc = useImageExteriorHeatingOvenProperties(rootData, isExteriorBcg, apiUrl, 'image4', '3');
  const bcgExteriorImage = useImageExteriorBcgProperties(rootData, isExteriorBcg, apiUrl, 'exterior4');
  const imageMassageFunctionSrc = useImageMassageFunctionProperties(customizeData, selectedMassageFunctionId, isCustomizeOptionsWater, apiUrl, 'imageLarge4', 'image4', '3');
  const imageTubeExtensionSrc = useImageTubeExtensionProperties(customizeData, selectedTubeExtensionId, isExteriorBcg, apiUrl, 'imageLarge4', 'objectimage4', '3');
  const imageInsideColorSrc = useImageInsideColorProperties(customizeData, selectedTypeId, selectedInsideColorId, selectedLedId, selectedSizeId, isCustomizeOptionsWater, apiUrl, 'imageLarge4', 'image4', '3');
  const imageAdditionalAccessoriesSrc = useImageAdditionalAccessoriesProperties(customizeData, selectedTypeId, selectedAdditionalAccessoriesIds, selectedWoodId, selectedSpruceColorId, isExteriorBcg, apiUrl, 'imageLarge4', 'objectimage4', '3');
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
  }, [iconsRef, accessoriesRef, selectedSizeId, hotTubStageWidth, hotTubStageHeight]);

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
        setOffsetY(-290);
      } else {
        setScaleX(1.05);
        setScaleY(1.05);
        setOffsetX(0);
        setOffsetY(-290);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.45);
        setScaleY(0.45);
        setOffsetX(130);
        setOffsetY(-300);
      } else {
        setScaleX(0.48);
        setScaleY(0.48);
        setOffsetX(110);
        setOffsetY(-300);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(110);
        setOffsetY(-520);
      } else {
        setScaleX(0.87);
        setScaleY(0.87);
        setOffsetX(110);
        setOffsetY(-520);
      }

    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(-150);
        setOffsetY(-750);
      } else {
        setScaleX(0.9);
        setScaleY(0.9);
        setOffsetX(-150);
        setOffsetY(-750);
      }

    } else if (+hotTubStageWidth >= 380 && +hotTubStageWidth < 500) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-150);
        setOffsetY(-790);
      } else {
        setScaleX(0.8);
        setScaleY(0.8);
        setOffsetX(-150);
        setOffsetY(-790);
      }

    } else if (+hotTubStageWidth >= 330 && +hotTubStageWidth < 380) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-150);
        setOffsetY(-1050);
      } else {
        setScaleX(0.77);
        setScaleY(0.77);
        setOffsetX(-150);
        setOffsetY(-1050);
      }

    } else if (+hotTubStageWidth >= 300 && +hotTubStageWidth < 330) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.7);
        setScaleY(0.7);
        setOffsetX(-150);
        setOffsetY(-1300);
      } else {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-150);
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
        setOffsetY(-290);
      } else {
        setScaleX(1.05);
        setScaleY(1.05);
        setOffsetX(0);
        setOffsetY(-290);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.45);
        setScaleY(0.45);
        setOffsetX(80);
        setOffsetY(-300);
      } else {
        setScaleX(0.48);
        setScaleY(0.48);
        setOffsetX(80);
        setOffsetY(-300);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(110);
        setOffsetY(-520);
      } else {
        setScaleX(0.87);
        setScaleY(0.87);
        setOffsetX(110);
        setOffsetY(-520);
      }

    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.8);
        setScaleY(0.8);
        setOffsetX(-150);
        setOffsetY(-750);
      } else {
        setScaleX(0.83);
        setScaleY(0.83);
        setOffsetX(-150);
        setOffsetY(-750);
      }

    } else if (+hotTubStageWidth >= 380 && +hotTubStageWidth < 500) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-150);
        setOffsetY(-790);
      } else {
        setScaleX(0.8);
        setScaleY(0.8);
        setOffsetX(-150);
        setOffsetY(-790);
      }

    } else if (+hotTubStageWidth >= 330 && +hotTubStageWidth < 380) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-150);
        setOffsetY(-1000);
      } else {
        setScaleX(0.77);
        setScaleY(0.77);
        setOffsetX(-150);
        setOffsetY(-1000);
      }

    } else if (+hotTubStageWidth >= 300 && +hotTubStageWidth < 330) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.7);
        setScaleY(0.7);
        setOffsetX(-150);
        setOffsetY(-1300);
      } else {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-150);
        setOffsetY(-1300);
      }

    }
  }


  return (
    <div className='HotTubCanvasFourthView'>
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
          { imageMassageFunctionSrc && <Image x={ +imageMassageFunctionSrc?.[1].x3 }
                                              y={ +imageMassageFunctionSrc?.[1].y3 }
                                              width={ +imageMassageFunctionSrc[2].width }
                                              height={ +imageMassageFunctionSrc[2].height }
                                              src={ imageMassageFunctionSrc?.[0] }
                                              opacity={ selectedCoverId !== noCoverId && coverOptionOpacity ? 0 : 1 }
          />
          }
        </Layer> }

        { !isLoadingData && <Layer ref={ iconsRef }
                 opacity={ isCustomizeOptionsOpen ? 1 : 0 }
                 scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
        >

          <WoodOptionGroup setOpenTab={ setOpenTab } optionName={ optionName }
                           optionGroupProp={ optionGroupWoodPropFourthView[selectedTypeId] }
          />
          <InsideColorGroup setOpenTab={ setOpenTab } optionName={ optionName }
                            optionGroupProp={ optionGroupInsideColorPropFourthView[selectedTypeId] }
          />
          <CoverOptionGroup setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                            optionGroupProp={ optionGroupCoverPropFourthView[selectedTypeId] }
                            selectedCoverId={ selectedCoverId }
          />
          <TubeExtensionOptionGroup setOpenTab={ setOpenTab } optionName={ optionName }
                                    selectedTypeId={ selectedTypeId }
                                    optionGroupProp={ optionGroupTubeExtensionPropFourthView[selectedTypeId] }
                                    selectedTubeExtensionId={ selectedTubeExtensionId }
          />
          <AdditionalAccessories setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                                 optionGroupProp={ optionGroupAdditionalAccessoriesPropFourthView[selectedTypeId] }
                                 selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
          />
        </Layer> }

        { !isLoadingData && <Layer scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
        >

          { imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map(item => {
            return <Image key={ item.id }
                          x={ +item.position.x3 && +item.position.x3 }
                          y={ +item.position.y3 && +item.position.y3 }
                          width={ +item.width && +item.width }
                          height={ +item.height && +item.height }
                          src={ item.image && item.image }
            />
          }) }
          <Group>
            { imageTubeExtensionSrc &&
            <Image x={ +imageTubeExtensionSrc[1].x3 }             // tube extension additional 1m
                   y={ +imageTubeExtensionSrc[1].y3 }
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

        { !isLoadingData && <Layer scaleX={ calcHeight(scaleX && scaleX) }
                 scaleY={ calcHeight(scaleY && scaleY) }
                 ref={ bcgShadowRef }
        >
          { bcgShadowImage && <Image x={ +bcgShadowImage[1].x3 }
                                     y={ +bcgShadowImage[1].y3 }
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
          { imageHeatingOvenSrc && <Image x={ +imageHeatingOvenSrc[1].x3 }          // heating oven image
                                          y={ +imageHeatingOvenSrc[1].y3 }
                                          width={ +imageHeatingOvenSrc[2].width }
                                          height={ +imageHeatingOvenSrc[2].height }
                                          src={ imageHeatingOvenSrc[0] }
                                          opacity={ isExteriorBcg ? 0 : 1 }
          />
          }


          { imageExteriorHeatingOvenSrc &&
          <Image x={ +imageExteriorHeatingOvenSrc[1].x3 }    // heating oven exterior image
                 y={ +imageExteriorHeatingOvenSrc[1].y3 }
                 width={ +imageExteriorHeatingOvenSrc[2].width }
                 height={ +imageExteriorHeatingOvenSrc[2].height }
                 src={ imageExteriorHeatingOvenSrc[0] }
                 opacity={ isExteriorBcg ? 1 : 0 }
          />
          }

          { imageWoodSrc && <Image x={ +imageWoodSrc[1].x3 }            // wood and spruce images
                                   y={ +imageWoodSrc[1].y3 }
                                   width={ +imageWoodSrc[2].width }
                                   height={ +imageWoodSrc[2].height }
                                   src={ imageWoodSrc[0] }
          />
          }

          { imageInsideColorSrc &&
          <Image x={ +imageInsideColorSrc[1].x3 }           // inside color without or with water and led or no led
                 y={ +imageInsideColorSrc[1].y3 }
                 width={ +imageInsideColorSrc[2].width }
                 height={ +imageInsideColorSrc[2].height }
                 src={ imageInsideColorSrc[0] }
          />
          }

          { imageCoverSrc && <Image x={ +imageCoverSrc?.[1].x3 }
                                    y={ +imageCoverSrc?.[1].y3 }
                                    width={ +imageCoverSrc?.[2].width }
                                    height={ +imageCoverSrc?.[2].height }
                                    src={ imageCoverSrc[0] }
                                    opacity={ coverOptionOpacity ? 1 : 0 }
          />
          }

          { imageSmokeSrc && <Image x={ +imageSmokeSrc[1].x3 }             // tube smoke top
                                    y={ +imageSmokeSrc[1].y3 }
                                    width={ +imageSmokeSrc[2].width }
                                    height={ +imageSmokeSrc[2].height }
                                    src={ imageSmokeSrc[0] }
          /> }
        </Layer> }
      </Stage>

    </div>
  )

}

export default HotTubCanvasFourthView;