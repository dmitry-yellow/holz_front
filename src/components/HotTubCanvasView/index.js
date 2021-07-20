import { Group, Layer, Stage, Text } from "react-konva";
import { useRef, useEffect, useState } from "react";
import { useKunakovHeight } from "../customHooks/useKunakovHeight";
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
import { useImageMetalStrapsProperties } from "../customHooks/useImageMetalStrapsProperties";
import { useImageInsideColorProperties } from "../customHooks/useImageInsideColorProperties";
import { useImageAdditionalAccessoriesProperties } from "../customHooks/useImageAdditionalAccessoriesProperties";
import WoodOptionGroup from "../OptionGroups/WoodOptionGroup";
import InsideColorGroup from "../OptionGroups/InsideColorOptionGroup";
import CoverOptionGroup from "../OptionGroups/CoverOptionGroup";
import MetalStrapsOptionGroup from "../OptionGroups/MetalStrapsOptionGroup";
import TubeExtensionOptionGroup from "../OptionGroups/TubeExtensionOptionGroup";
import AdditionalAccessories from "../OptionGroups/AdditionalAccessoriesOptionGroup";
import { optionGroupWoodPropFirstView } from "../OptionGroups/WoodOptionGroup/helper";
import { optionGroupInsideColorPropFirstView } from "../OptionGroups/InsideColorOptionGroup/helper";
import { optionGroupCoverPropFirstView } from "../OptionGroups/CoverOptionGroup/helper";
import { optionGroupMetalStrapsPropFirstView } from "../OptionGroups/MetalStrapsOptionGroup/helper";
import { optionGroupTubeExtensionPropFirstView } from "../OptionGroups/TubeExtensionOptionGroup/helper";
import { optionGroupAdditionalAccessoriesPropFirstView } from "../OptionGroups/AdditionalAccessoriesOptionGroup/helper";
import { useSelector } from "react-redux";
import { getNoCoverId, getNoLedId, getNoMassageFuncId, getSmallSizeId } from "../helperForIds";
import schalter_1 from "../../assets/images/schalter/Hottub-Studio_0002s_0004s_0003_Schalter-01.png";
import schalter_2 from "../../assets/images/schalter/Hottub-Studio_0002s_0004s_0002_Schalter-02.png";
import schalter_3 from "../../assets/images/schalter/Hottub-Studio_0002s_0004s_0001_Schalter-03.png";
import schalter_4 from "../../assets/images/schalter/Hottub-Studio_0002s_0004s_0000_Schalter-04.png";
import schalterOval_1 from "../../assets/images/schalter/schalter-oval1.png";

const HotTubCanvasView = (props) => {

  const {
    hotTubStageHeight,
    hotTubStageWidth,
    isCustomizeOptionsWater,
    isExteriorBcg,
    setOpenTab,
    customizeData,
    rootData,
    selectedInsideColorId,
    selectedMetalStrapsId,
    selectedHeatingOvenId,
    selectedAdditionalAccessoriesIds,
    selectedWoodId,
    selectedSpruceColorId,
    selectedTubeExtensionId,
    selectedCoverId,
    selectedLedId,
    selectedSizeId,
    isCustomizeOptionsOpen,
    coverOptionOpacity,
    selectedMassageFunctionId
  } = props;

  const apiUrl = process.env.REACT_APP_HOST_API_URL;
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);
  const noCoverId = getNoCoverId(selectedTypeId);
  const noMassageFuncId = getNoMassageFuncId(selectedTypeId);
  const noLedId = getNoLedId(selectedTypeId);


  const accessoriesRef = useRef(null);
  const iconsRef = useRef(null);
  const bcgWithoutExt = useRef(null);
  const bcgExtRef = useRef(null);
  const [scaleX, setScaleX] = useState(null);
  const [scaleY, setScaleY] = useState(null);
  const [offsetX, setOffsetX] = useState(null);
  const [offsetY, setOffsetY] = useState(null);
  const [calcHeight] = useKunakovHeight(hotTubStageHeight);
  const imageSmokeSrc = useImageSmokeProperties(customizeData, selectedHeatingOvenId, apiUrl);
  const imageHeatingOvenSrc = useImageHeatingOvenProperties(customizeData, selectedHeatingOvenId, apiUrl, 'imageLarge1');
  const imageCoverSrc = useImageCoverProperties(customizeData, selectedCoverId, apiUrl, 'imageLarge1');
  const imageWoodSrc = useImageWoodProperties(customizeData, selectedWoodId, selectedSpruceColorId, apiUrl, 'imageLarge1');
  const bcgShadowImage = useImageBcgShadowProperties(customizeData, selectedSizeId, apiUrl, 'imageLarge1');
  const imageExteriorHeatingOvenSrc = useImageExteriorHeatingOvenProperties(rootData, isExteriorBcg, apiUrl, 'image1');
  const bcgExteriorImage = useImageExteriorBcgProperties(rootData, isExteriorBcg, apiUrl, 'exterior1');
  const imageMassageFunctionSrc = useImageMassageFunctionProperties(customizeData, selectedMassageFunctionId, isCustomizeOptionsWater, apiUrl, 'imageLarge1', 'image1');
  const imageTubeExtensionSrc = useImageTubeExtensionProperties(customizeData, selectedTubeExtensionId, isExteriorBcg, apiUrl, 'imageLarge1', 'objectimage1');
  const imageMetalStrapsSrc = useImageMetalStrapsProperties(customizeData, selectedMetalStrapsId, isExteriorBcg, apiUrl, 'imageLarge1', 'objectimage1');
  const imageInsideColorSrc = useImageInsideColorProperties(customizeData, selectedTypeId, selectedInsideColorId, selectedLedId, selectedSizeId, isCustomizeOptionsWater, apiUrl, 'imageLarge1', 'image1');
  const imageAdditionalAccessoriesSrc = useImageAdditionalAccessoriesProperties(customizeData, selectedTypeId, selectedAdditionalAccessoriesIds, selectedWoodId, selectedSpruceColorId, isExteriorBcg, apiUrl, 'imageLarge1', 'objectimage1');

  useEffect(() => {
    if (iconsRef.current) {
      iconsRef.current.zIndex(4);
    }
    if (accessoriesRef.current) {
      accessoriesRef.current.zIndex(3);
    }
    if (bcgWithoutExt.current) {
      bcgWithoutExt.current.zIndex(1);
    }
    if (bcgExtRef.current) {
      bcgExtRef.current.zIndex(0);
    }
    if (hotTubStageWidth && hotTubStageHeight) {
      if (selectedTypeId === 4224) {
        setScaleForLayers(hotTubStageWidth);
      } else {
        setScaleForExternalLayers(hotTubStageWidth);
      }
    }

  }, [iconsRef, accessoriesRef, hotTubStageWidth, hotTubStageHeight, selectedSizeId]);


  const optionName = function (name) {
    return rootData?.descriptions[name]?.germanName;
  }

  const setScaleForLayers = (hotTubStageWidth) => {

    const smallSizeId = getSmallSizeId(selectedTypeId);  // oldId = 80504

    if (+hotTubStageWidth >= 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.95);
        setScaleY(0.95);
        setOffsetX(0);
        setOffsetY(-200);
      } else {
        setScaleX(1);
        setScaleY(1);
        setOffsetX(0);
        setOffsetY(-200);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.55);
        setScaleY(0.55);
        setOffsetX(105);
        setOffsetY(-350);
      } else {
        setScaleX(0.57);
        setScaleY(0.57);
        setOffsetX(100);
        setOffsetY(-350);
      }
    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.8);
        setScaleY(0.8);
        setOffsetX(105);
        setOffsetY(-300);
      } else {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(100);
        setOffsetY(-300);
      }
    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(1);
        setScaleY(1);
        setOffsetX(-100);
        setOffsetY(-400);
      } else {
        setScaleX(1.05);
        setScaleY(1.05);
        setOffsetX(-100);
        setOffsetY(-400);
      }
    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 700) {
      setScaleX(0.6);
      setScaleY(0.6);
      setOffsetX(250);
      setOffsetY(-450);
    } else if (+hotTubStageWidth >= 340 && +hotTubStageWidth <= 440) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-50);
        setOffsetY(-600);
      } else {
        setScaleX(0.8);
        setScaleY(0.8);
        setOffsetX(-50);
        setOffsetY(-600);
      }
    } else if (+hotTubStageWidth <= 330) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.7);
        setScaleY(0.7);
        setOffsetX(-100);
        setOffsetY(-1000);
      } else {
        setScaleX(0.72);
        setScaleY(0.72);
        setOffsetX(-100);
        setOffsetY(-1050);
      }
    }
  }

  const setScaleForExternalLayers = (hotTubStageWidth) => {

    const smallSizeId = getSmallSizeId(selectedTypeId);  // oldId = 80504

    if (+hotTubStageWidth >= 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.95);
        setScaleY(0.95);
        setOffsetX(0);
        setOffsetY(-200);
      } else {
        setScaleX(1);
        setScaleY(1);
        setOffsetX(0);
        setOffsetY(-200);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.55);
        setScaleY(0.55);
        setOffsetX(105);
        setOffsetY(-350);
      } else {
        setScaleX(0.57);
        setScaleY(0.57);
        setOffsetX(100);
        setOffsetY(-350);
      }
    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.7);
        setScaleY(0.7);
        setOffsetX(40);
        setOffsetY(-300);
      } else {
        setScaleX(0.72);
        setScaleY(0.72);
        setOffsetX(40);
        setOffsetY(-300);
      }
    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.90);
        setScaleY(0.90);
        setOffsetX(-100);
        setOffsetY(-300);
      } else {
        setScaleX(0.92);
        setScaleY(0.92);
        setOffsetX(-100);
        setOffsetY(-300);
      }
    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 700) {
      setScaleX(0.6);
      setScaleY(0.6);
      setOffsetX(250);
      setOffsetY(-450);
    } else if (+hotTubStageWidth >= 340 && +hotTubStageWidth <= 440) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.72);
        setScaleY(0.72);
        setOffsetX(-150);
        setOffsetY(-400);
      } else {
        setScaleX(0.74);
        setScaleY(0.74);
        setOffsetX(-150);
        setOffsetY(-400);
      }
    } else if (+hotTubStageWidth <= 330) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.69);
        setScaleY(0.69);
        setOffsetX(-130);
        setOffsetY(-700);
      } else {
        setScaleX(0.71);
        setScaleY(0.71);
        setOffsetX(-130);
        setOffsetY(-700);
      }
    }
  }

  const schalters = [
    { image: schalter_1, width: 13, height: 13, x: 58, y: -24 },
    { image: schalter_2, width: 13, height: 13, x: 75, y: -35 },
    { image: schalter_3, width: 12, height: 12, x: 91, y: -45 }
  ];

  return (
    <div className='HotTubCanvasView'>
      <Stage width={ hotTubStageWidth }
             height={ hotTubStageHeight }
             offsetX={ -hotTubStageWidth / 2 }
             offsetY={ -hotTubStageHeight / 2 }
      >
        <Layer scaleX={ scaleX && calcHeight(scaleX) }
               scaleY={ scaleY && calcHeight(scaleY) }
               ref={ iconsRef }
               opacity={ isCustomizeOptionsOpen ? 1 : 0 }
               offsetX={ offsetX && offsetX }
               offsetY={ offsetY && calcHeight(offsetY) }

        >

          <WoodOptionGroup setOpenTab={ setOpenTab } optionName={ optionName }
                           optionGroupProp={ optionGroupWoodPropFirstView[selectedTypeId] }
          />
          <InsideColorGroup setOpenTab={ setOpenTab } optionName={ optionName }
                            optionGroupProp={ optionGroupInsideColorPropFirstView[selectedTypeId] }
          />
          <CoverOptionGroup setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                            optionGroupProp={ optionGroupCoverPropFirstView[selectedTypeId] }
                            selectedCoverId={ selectedCoverId }
          />
          <MetalStrapsOptionGroup setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                                  optionGroupProp={ optionGroupMetalStrapsPropFirstView[selectedTypeId] }
                                  selectedMetalStrapsId={ selectedMetalStrapsId }
          />

          <TubeExtensionOptionGroup setOpenTab={ setOpenTab } optionName={ optionName }
                                    selectedTypeId={ selectedTypeId }
                                    optionGroupProp={ optionGroupTubeExtensionPropFirstView[selectedTypeId] }
                                    selectedTubeExtensionId={ selectedTubeExtensionId }
          />
          <AdditionalAccessories setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                                 optionGroupProp={ optionGroupAdditionalAccessoriesPropFirstView[selectedTypeId] }
                                 selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
          />

        </Layer>

        <Layer scaleX={ scaleX && calcHeight(scaleX) }
               scaleY={ scaleY && calcHeight(scaleY) }
               ref={ accessoriesRef }
               offsetX={ offsetX && offsetX }
               offsetY={ offsetY && calcHeight(offsetY) }
        >

          { imageMassageFunctionSrc && <Image x={ +imageMassageFunctionSrc?.[1].x }
                                              y={ +imageMassageFunctionSrc?.[1].y }
                                              width={ +imageMassageFunctionSrc[2].width }
                                              height={ +imageMassageFunctionSrc[2].height }
                                              src={ imageMassageFunctionSrc?.[0] }
                                              opacity={ selectedCoverId !== noCoverId && coverOptionOpacity ? 0 : 1 }
          />
          }

          { selectedTypeId === 4224 && imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map(item => {
            return <Image key={ item.id }
                          x={ +item.position.x && +item.position.x }
                          y={ +item.position.y && +item.position.y }
                          width={ +item.width && +item.width }
                          height={ +item.height && +item.height }
                          src={ item.image && item.image }
                          debug
            />
          })
          }


          { selectedTypeId === 80690 && imageHeatingOvenSrc &&
          <Image x={ +imageHeatingOvenSrc[1].x }            // heating oven image
                 y={ +imageHeatingOvenSrc[1].y }
                 width={ +imageHeatingOvenSrc[2].width }
                 height={ +imageHeatingOvenSrc[2].height }
                 src={ imageHeatingOvenSrc[0] }
                 opacity={ isExteriorBcg ? 0 : 1 }
          />
          }

          { selectedTypeId === 80690 && imageExteriorHeatingOvenSrc &&
          <Image x={ +imageExteriorHeatingOvenSrc[1].x }                              // heating oven exterior image
                 y={ +imageExteriorHeatingOvenSrc[1].y }
                 width={ +imageExteriorHeatingOvenSrc[2].width }
                 height={ +imageExteriorHeatingOvenSrc[2].height }
                 src={ imageExteriorHeatingOvenSrc[0] }
                 opacity={ isExteriorBcg ? 1 : 0 }
          />
          }


          { selectedTypeId === 80602 && <Group>
            { +selectedMassageFunctionId !== noMassageFuncId && schalters?.length > 1 && schalters.map((schalter, index) => {
              return <Image x={ schalter.x }
                            y={ schalter.y }
                            width={ schalter.width }
                            height={ schalter.height }
                            src={ schalter.image }
                            key={ index }
              />
            }) }
            { +selectedLedId !== noLedId && <Image x={ 105 }
                                                   y={ -57 }
                                                   width={ 10 }
                                                   height={ 12 }
                                                   src={ schalter_4 }
            />
            }
          </Group> }

          { selectedTypeId === 80690 && +selectedMassageFunctionId !== noMassageFuncId && <Image x={ -1092 }
                                                                                                 y={ -480 }
                                                                                                 width={ 1170 }
                                                                                                 height={ 1000 }
                                                                                                 src={ schalterOval_1 }
          /> }

          <Group>
            { imageTubeExtensionSrc && <Image x={ +imageTubeExtensionSrc[1].x }     // tube extension additional 1m
                                              y={ +imageTubeExtensionSrc[1].y }
                                              width={ +imageTubeExtensionSrc[2].width }
                                              height={ +imageTubeExtensionSrc[2].height }
                                              src={ imageTubeExtensionSrc[0] }/>
            }
          </Group>

        </Layer>
        <Layer ref={ bcgExtRef }
               scaleX={ 1 }
               scaleY={ 1 }
        >
          { (bcgExteriorImage && isExteriorBcg) && <Image x={ -hotTubStageWidth / 2 }
                                                          y={ -hotTubStageHeight / 2 }
                                                          width={ hotTubStageWidth }
                                                          height={ hotTubStageHeight }
                                                          src={ bcgExteriorImage }
          />
          }
        </Layer>

        <Layer scaleX={ calcHeight(scaleX && scaleX) }         // bottom shadow
               scaleY={ calcHeight(scaleY && scaleY) }
               ref={ bcgWithoutExt }
        >
          { bcgShadowImage && <Image x={ +bcgShadowImage[1].x }
                                     y={ +bcgShadowImage[1].y }
                                     width={ +bcgShadowImage[2].width }
                                     height={ +bcgShadowImage[2].height }
                                     src={ bcgShadowImage[0] }
                                     offsetX={ offsetX && offsetX }
                                     offsetY={ offsetY && calcHeight(offsetY) }
          /> }
        </Layer>
        <Layer scaleX={ scaleX && calcHeight(scaleX) }
               scaleY={ scaleY && calcHeight(scaleY) }
               offsetX={ offsetX && offsetX }
               offsetY={ offsetY && calcHeight(offsetY) }
        >
          { selectedTypeId === 80602 && imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map(item => {
            return <Image key={ item.id }
                          x={ +item.position.x && +item.position.x }
                          y={ +item.position.y && +item.position.y }
                          width={ +item.width && +item.width }
                          height={ +item.height && +item.height }
                          src={ item.image && item.image }
                          debug
            />
          })
          }

          { selectedTypeId !== 80690 && imageHeatingOvenSrc &&
          <Image x={ +imageHeatingOvenSrc[1].x }            // heating oven image
                 y={ +imageHeatingOvenSrc[1].y }
                 width={ +imageHeatingOvenSrc[2].width }
                 height={ +imageHeatingOvenSrc[2].height }
                 src={ imageHeatingOvenSrc[0] }
                 opacity={ isExteriorBcg ? 0 : 1 }
          />
          }

          { selectedTypeId !== 80690 && imageExteriorHeatingOvenSrc &&
          <Image x={ +imageExteriorHeatingOvenSrc[1].x }                              // heating oven exterior image
                 y={ +imageExteriorHeatingOvenSrc[1].y }
                 width={ +imageExteriorHeatingOvenSrc[2].width }
                 height={ +imageExteriorHeatingOvenSrc[2].height }
                 src={ imageExteriorHeatingOvenSrc[0] }
                 opacity={ isExteriorBcg ? 1 : 0 }
          />
          }

          { imageWoodSrc && <Image x={ +imageWoodSrc[1].x }                       // wood and spruce images
                                   y={ +imageWoodSrc[1].y }
                                   width={ +imageWoodSrc[2].width }
                                   height={ +imageWoodSrc[2].height }
                                   src={ imageWoodSrc[0] }
          />
          }
          { imageMetalStrapsSrc && <Image x={ +imageMetalStrapsSrc?.[1].x }
                                          y={ +imageMetalStrapsSrc?.[1].y }
                                          width={ +imageMetalStrapsSrc?.[2].width }
                                          height={ +imageMetalStrapsSrc?.[2].height }
                                          src={ imageMetalStrapsSrc[0] }
          />
          }


          { imageInsideColorSrc &&
          <Image x={ +imageInsideColorSrc[1].x }           // inside color without or with water and led or no led
                 y={ +imageInsideColorSrc[1].y }
                 width={ +imageInsideColorSrc[2].width }
                 height={ +imageInsideColorSrc[2].height }
                 src={ imageInsideColorSrc[0] }
          />
          }

          { imageCoverSrc && <Image x={ +imageCoverSrc?.[1].x }
                                    y={ +imageCoverSrc?.[1].y }
                                    width={ +imageCoverSrc?.[2].width }
                                    height={ +imageCoverSrc?.[2].height }
                                    src={ imageCoverSrc[0] }
                                    opacity={ coverOptionOpacity ? 1 : 0 }
          />
          }

          { imageSmokeSrc && <Image x={ +imageSmokeSrc[1].x }                // smoke top
                                    y={ +imageSmokeSrc[1].y }
                                    width={ +imageSmokeSrc[2].width }
                                    height={ +imageSmokeSrc[2].height }
                                    src={ imageSmokeSrc[0] }
          /> }

          { selectedTypeId === 80690 && imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map(item => {
            return <Image key={ item.id }
                          x={ +item.position.x && +item.position.x }
                          y={ +item.position.y && +item.position.y }
                          width={ +item.width && +item.width }
                          height={ +item.height && +item.height }

                          src={ item.image && item.image }
                          debug
            />
          })
          }
        </Layer>
      </Stage>

    </div>
  )

}

export default HotTubCanvasView;
