import { Group, Layer, Stage } from "react-konva";
import Image from "../Image/Image";
import { useRef, useEffect, useState } from "react";
import { useKunakovHeight } from "../customHooks/useKunakovHeight";
import { useImageSmokeProperties } from "../customHooks/useImageSmokeProperties";
import { useImageHeatingOvenProperties } from "../customHooks/useImageHeatingOvenProperties";
import { useImageCoverProperties } from "../customHooks/useImageCoverProperties";
import { useImageWoodProperties } from "../customHooks/useImageWoodProperties";
import { useImageBcgShadowProperties } from "../customHooks/useImageBcgShadowProperties";
import { useImageExteriorHeatingOvenProperties } from "../customHooks/useImageExteriorHeatingOvenProperties";
import { useImageExteriorBcgProperties } from "../customHooks/useImageExteriorBcgProperties";
import { useImageTubeExtensionProperties } from "../customHooks/useImageTubeExtensionProperties";
import { useImageMetalStrapsProperties } from "../customHooks/useImageMetalStrapsProperties";
import { useImageInsideColorSecondViewProperties } from "../customHooks/useImageInsideColorProperties";
import { useImageAdditionalAccessoriesProperties } from "../customHooks/useImageAdditionalAccessoriesProperties";
import WoodOptionGroup from "../OptionGroups/WoodOptionGroup";
import InsideColorGroup from "../OptionGroups/InsideColorOptionGroup";
import CoverOptionGroup from "../OptionGroups/CoverOptionGroup";
import MetalStrapsOptionGroup from "../OptionGroups/MetalStrapsOptionGroup";
import TubeExtensionOptionGroup from "../OptionGroups/TubeExtensionOptionGroup";
import AdditionalAccessories from "../OptionGroups/AdditionalAccessoriesOptionGroup";
import { optionGroupWoodPropSecondView } from "../OptionGroups/WoodOptionGroup/helper";
import { optionGroupInsideColorPropSecondView } from "../OptionGroups/InsideColorOptionGroup/helper";
import { optionGroupCoverPropSecondView } from "../OptionGroups/CoverOptionGroup/helper";
import { optionGroupMetalStrapsPropSecondView } from "../OptionGroups/MetalStrapsOptionGroup/helper";
import { optionGroupTubeExtensionPropSecondView } from "../OptionGroups/TubeExtensionOptionGroup/helper";
import { optionGroupAdditionalAccessoriesPropSecondView } from "../OptionGroups/AdditionalAccessoriesOptionGroup/helper";
import { useSelector } from "react-redux";
import { getNoLedId, getNoMassageFuncId, getSmallSizeId } from "../helperForIds";
import schalterExt_1 from "../../assets/images/schalter/shaltersExt0002/schalter-0001.png";
import schalterExt_2 from "../../assets/images/schalter/shaltersExt0002/schalter-0002.png";
import schalterExt_3 from "../../assets/images/schalter/shaltersExt0002/schalter-0003.png";
import schalterExt_4 from "../../assets/images/schalter/shaltersExt0002/schalter-0004.png";
import schalter_1 from "../../assets/images/schalter/shalters0002/schalter-0001.png";
import schalter_2 from "../../assets/images/schalter/shalters0002/schalter-0002.png";
import schalter_3 from "../../assets/images/schalter/shalters0002/schalter-0003.png";
import schalter_4 from "../../assets/images/schalter/shalters0002/schalter-0004.png";
import schalter_oval2 from "../../assets/images/schalter/schalter-oval2.png";
import schalter_ovalExt2 from "../../assets/images/schalter/schalter-hottub2umgebung0004.png";


const HotTubCanvasSecondView = (props) => {

  const {
    hotTubStageHeight,
    hotTubStageWidth,
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
    selectedSizeId,
    isCustomizeOptionsOpen,
    coverOptionOpacity
  } = props;

  const apiUrl = process.env.REACT_APP_HOST_API_URL;
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);
  const selectedMassageFunctionId = useSelector(state => state.hotTub.selectedMassageFunctionId);
  const selectedLedId = useSelector(state => state.hotTub.selectedLedId);
  const noMassageFuncId = getNoMassageFuncId(selectedTypeId);
  const noLedId = getNoLedId(selectedTypeId);


  const [calcHeight] = useKunakovHeight(hotTubStageHeight);
  const accessoriesRef = useRef(null);
  const iconsRef = useRef(null);
  const bcgShadowRef = useRef(null);
  const [scaleX, setScaleX] = useState(null);
  const [scaleY, setScaleY] = useState(null);
  const [offsetX, setOffsetX] = useState(null);
  const imageSmokeSrc = useImageSmokeProperties(customizeData, selectedHeatingOvenId, apiUrl, '1');
  const imageHeatingOvenSrc = useImageHeatingOvenProperties(customizeData, selectedHeatingOvenId, apiUrl, 'ImageLarge2', '1');
  const imageCoverSrc = useImageCoverProperties(customizeData, selectedCoverId, apiUrl, 'ImageLarge2', '1');
  const imageWoodSrc = useImageWoodProperties(customizeData, selectedWoodId, selectedSpruceColorId, apiUrl, 'ImageLarge2', '1');
  const bcgShadowImage = useImageBcgShadowProperties(customizeData, selectedSizeId, apiUrl, 'ImageLarge2', '1');
  const imageExteriorHeatingOvenSrc = useImageExteriorHeatingOvenProperties(rootData, isExteriorBcg, apiUrl, 'image2', '1');
  const bcgExteriorImage = useImageExteriorBcgProperties(rootData, isExteriorBcg, apiUrl, 'exterior2');
  const imageTubeExtensionSrc = useImageTubeExtensionProperties(customizeData, selectedTubeExtensionId, isExteriorBcg, apiUrl, 'ImageLarge2', 'objectimage2', '1');
  const imageMetalStrapsSrc = useImageMetalStrapsProperties(customizeData, selectedMetalStrapsId, isExteriorBcg, apiUrl, 'ImageLarge2', 'objectimage2', '1');
  const imageInsideColorSrc = useImageInsideColorSecondViewProperties(customizeData, selectedInsideColorId, apiUrl, 'ImageLarge2', '1');
  const imageAdditionalAccessoriesSrc = useImageAdditionalAccessoriesProperties(customizeData, selectedTypeId, selectedAdditionalAccessoriesIds, selectedWoodId, selectedSpruceColorId, isExteriorBcg, apiUrl, 'ImageLarge2', 'objectimage2', '1');
  const isLoadingData = useSelector(state => state.hotTub.isLoadingData);

  useEffect(() => {
    if (iconsRef.current) {
      iconsRef.current.zIndex(4);
    }
    if (accessoriesRef.current) {
      accessoriesRef.current.zIndex(3);
    }
    if (bcgShadowRef.current) {
      bcgShadowRef.current.zIndex(1);
    }

    if (hotTubStageWidth && hotTubStageHeight) {
      if (selectedTypeId === 4224) {
        setScaleForLayers(hotTubStageWidth);
      } else {
        setScaleForExternalLayers(hotTubStageWidth);
      }
    }
  }, [iconsRef, accessoriesRef, selectedSizeId, hotTubStageWidth, hotTubStageHeight]);


  const offsetYToCalcHeight = (stageHeight) => {
    if ((stageHeight < 450) && (+hotTubStageWidth >= 300 && +hotTubStageWidth < 330)) {
      return 1050
    } else if ((stageHeight < 450) && (+hotTubStageWidth >= 330 && +hotTubStageWidth < 380)) {
      return 800
    } else if ((stageHeight < 450) && (+hotTubStageWidth >= 380 && +hotTubStageWidth < 500)) {
      return 565
    } else if ((window.innerHeight >= 600 && window.innerHeight < 1100) && (+hotTubStageWidth >= 800 && +hotTubStageWidth < 1100)) {
      return 400
    } else if ((window.innerHeight >= 880 && window.innerHeight < 1050) && (+hotTubStageWidth >= 440 && +hotTubStageWidth < 800)) {
      return 400
    } else if (stageHeight >= 750 && stageHeight < 900) {
      return 220
    } else if (stageHeight >= 900 && stageHeight < 1000) {
      return 190
    } else if (stageHeight >= 1000 && stageHeight < 1200) {
      return 150
    } else if ((stageHeight >= 1200 && stageHeight < 1400) && +hotTubStageWidth < 1200) {
      return 430
    } else if (stageHeight >= 1200 && stageHeight < 1400) {
      return 120
    } else if (stageHeight >= 1400 && stageHeight < 1600) {
      return 110
    } else {
      return 100
    }
  }

  const setScaleForLayers = (hotTubStageWidth) => {

    const smallSizeId = getSmallSizeId(selectedTypeId);   // old id = 80504

    if (+hotTubStageWidth >= 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(1.15);
        setScaleY(1.15);
        setOffsetX(-50);
      } else {
        setScaleX(1.2);
        setScaleY(1.2);
        setOffsetX(-50);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.55);
        setScaleY(0.55);
        setOffsetX(150);
      } else {
        setScaleX(0.57);
        setScaleY(0.57);
        setOffsetX(145);
      }
    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.8);
        setScaleY(0.8);
        setOffsetX(130);
      } else {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(130);
      }
    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(1.1);
        setScaleY(1.1);
        setOffsetX(-200);
      } else {
        setScaleX(1.15);
        setScaleY(1.15);
        setOffsetX(-200);
      }
    } else if (+hotTubStageWidth >= 340 && +hotTubStageWidth <= 500) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.9);
        setScaleY(0.9);
        setOffsetX(-100);
      } else {
        setScaleX(0.93);
        setScaleY(0.93);
        setOffsetX(-100);
      }
    } else if (+hotTubStageWidth < 340) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-250);
      } else {
        setScaleX(0.77);
        setScaleY(0.77);
        setOffsetX(-250);
      }
    }
  }

  const setScaleForExternalLayers = (hotTubStageWidth) => {

    const smallSizeId = getSmallSizeId(selectedTypeId);   // old id = 80504

    if (+hotTubStageWidth >= 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(1.10);
        setScaleY(1.10);
        setOffsetX(-50);
      } else {
        setScaleX(1.15);
        setScaleY(1.15);
        setOffsetX(-50);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.55);
        setScaleY(0.55);
        setOffsetX(40);
      } else {
        setScaleX(0.57);
        setScaleY(0.57);
        setOffsetX(45);
      }
    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.8);
        setScaleY(0.8);
        setOffsetX(130);
      } else {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(130);
      }
    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(1.1);
        setScaleY(1.1);
        setOffsetX(-200);
      } else {
        setScaleX(1.15);
        setScaleY(1.15);
        setOffsetX(-200);
      }
    } else if (+hotTubStageWidth >= 340 && +hotTubStageWidth <= 500) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.88);
        setScaleY(0.88);
        setOffsetX(-220);
      } else {
        setScaleX(0.9);
        setScaleY(0.9);
        setOffsetX(-210);
      }
    } else if (+hotTubStageWidth < 340) {
      if (+selectedSizeId === smallSizeId) {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-200);
      } else {
        setScaleX(0.77);
        setScaleY(0.77);
        setOffsetX(-200);
      }
    }
  }

  const optionName = function (name) {
    return rootData?.descriptions[name]?.germanName;
  }

  const schalters = [
    { image: schalter_1, width: 1020, height: 780, x: -1104, y: -419 },
    { image: schalter_2, width: 17, height: 17, x: -73, y: -55 },
    { image: schalter_3, width: 17, height: 17, x: -46, y: -55 }
  ];

  const schaltersExterior = [
    { image: schalterExt_1, width: 1550, height: 900, x: -990, y: -555 },
    { image: schalterExt_2, width: 20, height: 25, x: -73, y: -59 },
    { image: schalterExt_3, width: 21, height: 29, x: -49, y: -55 }
  ];

  return (
    <div className='HotTubCanvasSecondView'>
      <Stage width={ hotTubStageWidth }
             height={ hotTubStageHeight }
             offsetX={ -hotTubStageWidth / 2 }
             offsetY={ -hotTubStageHeight / 2 }
      >
        { !isLoadingData && <Layer ref={ iconsRef }
                 opacity={ isCustomizeOptionsOpen ? 1 : 0 }
                 scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ calcHeight(-offsetYToCalcHeight(hotTubStageHeight)) }
        >
          <WoodOptionGroup setOpenTab={ setOpenTab } optionName={ optionName }
                           optionGroupProp={ optionGroupWoodPropSecondView[selectedTypeId] }
          />
          <InsideColorGroup setOpenTab={ setOpenTab } optionName={ optionName }
                            optionGroupProp={ optionGroupInsideColorPropSecondView[selectedTypeId] }
          />
          <CoverOptionGroup setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                            optionGroupProp={ optionGroupCoverPropSecondView[selectedTypeId] }
                            selectedCoverId={ selectedCoverId }
          />
          <MetalStrapsOptionGroup setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                                  optionGroupProp={ optionGroupMetalStrapsPropSecondView[selectedTypeId] }
                                  selectedMetalStrapsId={ selectedMetalStrapsId }
          />

          <TubeExtensionOptionGroup setOpenTab={ setOpenTab } optionName={ optionName }
                                    selectedTypeId={ selectedTypeId }
                                    optionGroupProp={ optionGroupTubeExtensionPropSecondView[selectedTypeId] }
                                    selectedTubeExtensionId={ selectedTubeExtensionId }
          />
          <AdditionalAccessories setOpenTab={ setOpenTab } optionName={ optionName } selectedTypeId={ selectedTypeId }
                                 optionGroupProp={ optionGroupAdditionalAccessoriesPropSecondView[selectedTypeId] }
                                 selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
          />
        </Layer> }

        { !isLoadingData && <Layer ref={ accessoriesRef }
                 scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ calcHeight(-offsetYToCalcHeight(hotTubStageHeight)) }
        >
          { selectedTypeId !== 80690 && imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map(item => {
            return <Image key={ item.id }
                          x={ +item.position.x1 && +item.position.x1 }
                          y={ +item.position.y1 && +item.position.y1 }
                          width={ +item.width && +item.width }
                          height={ +item.height && +item.height }
                          src={ item.image && item.image }
            />
          }) }
          <Group>
            { imageTubeExtensionSrc && <Image x={ +imageTubeExtensionSrc[1].x1 }        // tube extension additional 1m
                                              y={ +imageTubeExtensionSrc[1].y1 }
                                              width={ +imageTubeExtensionSrc[2].width }
                                              height={ +imageTubeExtensionSrc[2].height }
                                              src={ imageTubeExtensionSrc[0] }
            />
            }
          </Group>
          { !isExteriorBcg ?
            <>
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
                { +selectedLedId !== noLedId && <Image x={ -20 }
                                                       y={ -55 }
                                                       width={ 17 }
                                                       height={ 17 }
                                                       src={ schalter_4 }
                />
                }
              </Group> }

            </> :
            <>
              { selectedTypeId === 80602 && <Group>
                { +selectedMassageFunctionId !== noMassageFuncId && schalters?.length > 1 && schaltersExterior.map((schalter, index) => {
                  return <Image x={ schalter.x }
                                y={ schalter.y }
                                width={ schalter.width }
                                height={ schalter.height }
                                src={ schalter.image }
                                key={ index }
                  />
                }) }
                { +selectedLedId !== noLedId && <Image x={ -20 }
                                                       y={ -65 }
                                                       width={ 35 }
                                                       height={ 40 }
                                                       src={ schalterExt_4 }
                />
                }
              </Group> }
            </>
          }
          { !isExteriorBcg ? <>
            { selectedTypeId === 80690 && +selectedMassageFunctionId !== noMassageFuncId && <Image x={ -1125 }
                                                                                                   y={ -432 }
                                                                                                   width={ 1200 }
                                                                                                   height={ 770 }
                                                                                                   src={ schalter_oval2 }
            />
            }
          </> : <>
            { selectedTypeId === 80690 && +selectedMassageFunctionId !== noMassageFuncId && <Image x={ -1135 }
                                                                                                   y={ -599 }
                                                                                                   width={ 1700 }
                                                                                                   height={ 950 }
                                                                                                   src={ schalter_ovalExt2 }
            />
            }
          </>
          }


        </Layer> }

        <Layer scaleX={ 1 }
               scaleY={ 1 }
        >

          { (bcgExteriorImage && isExteriorBcg) && <Image x={ -hotTubStageWidth / 2 }
                                                          y={ -hotTubStageHeight / 2 }
                                                          width={ hotTubStageWidth }
                                                          height={ hotTubStageHeight }
                                                          src={ bcgExteriorImage }/>
          }

        </Layer>

        { !isLoadingData && <Layer scaleX={ calcHeight(scaleX && scaleX) } // bottom shadow
                 scaleY={ calcHeight(scaleY && scaleY) }
                 ref={ bcgShadowRef }
        >
          { bcgShadowImage && <Image x={ +bcgShadowImage[1].x1 }
                                     y={ +bcgShadowImage[1].y1 }
                                     width={ +bcgShadowImage[2].width }
                                     height={ +bcgShadowImage[2].height }
                                     src={ bcgShadowImage[0] }
                                     offsetX={ offsetX && offsetX }
                                     offsetY={ calcHeight(-offsetYToCalcHeight(hotTubStageHeight)) }
          /> }
        </Layer> }

        { !isLoadingData && <Layer scaleX={ calcHeight(scaleX && scaleX) }
                 scaleY={ calcHeight(scaleY && scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ calcHeight(-offsetYToCalcHeight(hotTubStageHeight)) }
        >
          { selectedTypeId === 80690 && imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map(item => {
            return <Image key={ item.id }
                          x={ +item.position.x1 && +item.position.x1 }
                          y={ +item.position.y1 && +item.position.y1 }
                          width={ +item.width && +item.width }
                          height={ +item.height && +item.height }
                          src={ item.image && item.image }
            />
          }) }
          { imageHeatingOvenSrc && <Image x={ +imageHeatingOvenSrc[1].x1 }           // heating oven image
                                          y={ +imageHeatingOvenSrc[1].y1 }
                                          width={ +imageHeatingOvenSrc[2].width }
                                          height={ +imageHeatingOvenSrc[2].height }
                                          src={ imageHeatingOvenSrc[0] }
                                          opacity={ isExteriorBcg ? 0 : 1 }
          />
          }


          { imageExteriorHeatingOvenSrc &&
          <Image x={ +imageExteriorHeatingOvenSrc[1].x1 }       // heating oven exterior image
                 y={ +imageExteriorHeatingOvenSrc[1].y1 }
                 width={ +imageExteriorHeatingOvenSrc[2].width }
                 height={ +imageExteriorHeatingOvenSrc[2].height }
                 src={ imageExteriorHeatingOvenSrc[0] }
                 opacity={ isExteriorBcg ? 1 : 0 }
          />
          }

          { imageWoodSrc && <Image x={ +imageWoodSrc[1].x1 }                        // wood and spruce images
                                   y={ +imageWoodSrc[1].y1 }
                                   width={ +imageWoodSrc[2].width }
                                   height={ +imageWoodSrc[2].height }
                                   src={ imageWoodSrc[0] }
          />
          }

          { imageMetalStrapsSrc && <Image x={ +imageMetalStrapsSrc?.[1].x1 }
                                          y={ +imageMetalStrapsSrc?.[1].y1 }
                                          width={ +imageMetalStrapsSrc?.[2].width }
                                          height={ +imageMetalStrapsSrc?.[2].height }
                                          src={ imageMetalStrapsSrc[0] }
          />
          }


          { imageInsideColorSrc &&
          <Image x={ +imageInsideColorSrc[1].x1 }         // inside color without or with water and led or no led
                 y={ +imageInsideColorSrc[1].y1 }
                 width={ +imageInsideColorSrc[2].width }
                 height={ +imageInsideColorSrc[2].height }
                 src={ imageInsideColorSrc[0] }
          />
          }

          { imageCoverSrc && <Image x={ +imageCoverSrc?.[1].x1 }
                                    y={ +imageCoverSrc?.[1].y1 }
                                    width={ +imageCoverSrc?.[2].width }
                                    height={ +imageCoverSrc?.[2].height }
                                    src={ imageCoverSrc[0] }
                                    opacity={ coverOptionOpacity ? 1 : 0 }
          />
          }

          { imageSmokeSrc && <Image x={ +imageSmokeSrc[1].x1 }               // tube smoke top
                                    y={ +imageSmokeSrc[1].y1 }
                                    width={ +imageSmokeSrc[2].width }
                                    height={ +imageSmokeSrc[2].height }
                                    src={ imageSmokeSrc[0] }
          /> }

        </Layer> }

      </Stage>

    </div>
  )

}

export default HotTubCanvasSecondView;
