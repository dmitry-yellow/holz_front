import { Group, Layer, Stage, Text } from "react-konva";
import Image from "../Image/Image";
import { useMemo, useRef, useEffect, useState } from "react";
import plusIcon from '../../assets/images/icon-svg.svg';
import doneIcon from '../../assets/images/icon-done.svg';
import { useKunakovHeight } from "../customHooks/useKunakovHeight";


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
  const [calcHeight] = useKunakovHeight(hotTubStageHeight);
  const accessoriesRef = useRef(null);
  const iconsRef = useRef(null);
  const bcgShadowRef = useRef(null);
  const [woodText, setWoodText] = useState('');
  const [metalStrapsText, setMetalStrapsText] = useState('');
  const [insideColorText, setInsideColorText] = useState('');
  const [coverText, setCoverText] = useState('');
  const [tubeExtensionText, setTubeExtensionText] = useState('');
  const [additionalAccessoriesText, setAdditionalAccessoriesText] = useState('');
  const [scaleX, setScaleX] = useState(null);
  const [scaleY, setScaleY] = useState(null);
  const [offsetX, setOffsetX] = useState(null);
  const [offsetY, setOffsetY] = useState(null);

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
      setScaleForLayers(hotTubStageWidth);
    }
  }, [iconsRef, accessoriesRef, selectedSizeId, hotTubStageWidth, hotTubStageHeight]);

  const imageAdditionalAccessoriesSrc = useMemo(() => {
    const additionalAccessoriesData = customizeData?.additionalAccessories;
    const woodData = customizeData?.wood;
    const spruceColorData = customizeData?.spruceColor;
    if (additionalAccessoriesData && selectedAdditionalAccessoriesIds) {
      let arr = [];
      selectedAdditionalAccessoriesIds.forEach(id => {
        const position = additionalAccessoriesData?.[`${ id }`].position;
        const width = additionalAccessoriesData?.[`${ id }`].base.width1;
        const height = additionalAccessoriesData?.[`${ id }`].base.height1;

        const positionExterior = {
          x1: additionalAccessoriesData?.['80574'].imagesext.x1,
          y1: additionalAccessoriesData?.['80574'].imagesext.y1
        };
        const widthExterior = additionalAccessoriesData?.['80574'].imagesext.width1;
        const heightExterior = additionalAccessoriesData?.['80574'].imagesext.height1;
        const imageLargeExterior = additionalAccessoriesData?.['80574'].imagesext.objectimage2;

        let imageLarge = '';
        if (+id === 80576) {
          if (woodData?.[`${ selectedWoodId }`]._main.Name === 'Spruce') {
            imageLarge = spruceColorData?.[`${ selectedSpruceColorId }`].base.boxImage1;
          } else {
            imageLarge = woodData?.[`${ selectedWoodId }`].base.boxImage1;
          }
        } else {
          imageLarge = additionalAccessoriesData?.[`${ id }`].base.ImageLarge2;
        }

        if (isExteriorBcg && +id === 80574) {
          arr = [{
            image: `${ apiUrl }${ imageLargeExterior }`,
            position: positionExterior,
            width: widthExterior,
            height: heightExterior
          }, ...arr]
        } else if (imageLarge) {
          if (+id === 80591) {
            arr = [{ image: `${ apiUrl }${ imageLarge }`, position: position, width: width, height: height }, ...arr]
          } else {
            arr = [...arr, { image: `${ apiUrl }${ imageLarge }`, position: position, width: width, height: height }]
          }
        }
      })
      return arr;
    }

  }, [customizeData, selectedAdditionalAccessoriesIds, selectedWoodId, selectedSpruceColorId, apiUrl, isExteriorBcg]);

  const imageWoodSrc = useMemo(() => {
    const woodData = customizeData?.wood;
    const spruceColorData = customizeData?.spruceColor;
    let imageLarge = '';

    if (woodData?.[`${ selectedWoodId }`]._main.Name === 'Spruce') {
      imageLarge = spruceColorData?.[`${ selectedSpruceColorId }`].base.ImageLarge2;
    } else {
      imageLarge = woodData?.[`${ selectedWoodId }`].base.ImageLarge2;
    }

    if (woodData && spruceColorData && selectedWoodId && imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [customizeData, selectedWoodId, selectedSpruceColorId, apiUrl]);


  const imageInsideColorSrc = useMemo(() => {
    const insideColorData = customizeData?.insideColor;
    const imageLarge = insideColorData?.[`${ selectedInsideColorId }`].base.ImageLarge2;

    if (insideColorData && selectedInsideColorId && imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [customizeData, selectedInsideColorId, apiUrl]);

  const imageMetalStrapsSrc = useMemo(() => {
    const metalStrapsData = customizeData?.metalStraps;

    const position = metalStrapsData?.[`${ selectedMetalStrapsId }`].position;
    const positionExterior = {
      x1: metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.x1,
      y1: metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.y1
    };

    const width = metalStrapsData?.[`${ selectedMetalStrapsId }`].base.width1;
    const height = metalStrapsData?.[`${ selectedMetalStrapsId }`].base.height1;
    const widthExterior = metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.width1;
    const heightExterior = metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.height1;

    const imageLarge = metalStrapsData?.[`${ selectedMetalStrapsId }`].base.ImageLarge2;
    const imageLargeExterior = metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.objectimage2;

    if (metalStrapsData && selectedMetalStrapsId && imageLarge && imageLargeExterior && position && positionExterior) {
      if (isExteriorBcg) {
        return [`${ apiUrl }${ imageLargeExterior }`, positionExterior, {
          width: widthExterior,
          height: heightExterior
        }]
      } else {
        return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }]
      }
    }
  }, [customizeData, selectedMetalStrapsId, apiUrl, isExteriorBcg]);

  const imageHeatingOvenSrc = useMemo(() => {
    const heatingOvenData = customizeData?.heatingOven;
    const imageLarge = heatingOvenData?.[`${ selectedHeatingOvenId }`].base.ImageLarge2;

    if (heatingOvenData && selectedHeatingOvenId && imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [customizeData, selectedHeatingOvenId, apiUrl]);

  const imageSmokeSrc = useMemo(() => {

    const heatingOvenData = customizeData?.heatingOven;
    const imageLarge = heatingOvenData?.[`${ selectedHeatingOvenId }`].base.boxImage1;

    if (heatingOvenData && selectedHeatingOvenId && imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [customizeData, selectedHeatingOvenId, apiUrl]);


  const imageCoverSrc = useMemo(() => {
    const coverData = customizeData?.cover;
    const position = coverData?.[`${ selectedCoverId }`].position;
    const width = coverData?.[`${ selectedCoverId }`].base.width1;
    const height = coverData?.[`${ selectedCoverId }`].base.height1;
    const imageLarge = coverData?.[`${ selectedCoverId }`].base.ImageLarge2;
    if (coverData && selectedCoverId && imageLarge && position && width && height) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }];
    }
  }, [customizeData, selectedCoverId, apiUrl]);


  const imageTubeExtensionSrc = useMemo(() => {
    const tubeExtensionData = customizeData?.tubeExtension;

    if (tubeExtensionData && selectedTubeExtensionId) {
      const imageLarge = tubeExtensionData?.[`${ selectedTubeExtensionId }`].base.ImageLarge2;
      const imageLargeExterior = tubeExtensionData?.[`${ selectedTubeExtensionId }`].imagesext.objectimage2;

      if (isExteriorBcg && imageLargeExterior) {
        return `${ apiUrl }${ imageLargeExterior }`
      } else if (imageLarge) {
        return `${ apiUrl }${ imageLarge }`
      }

    }
  }, [customizeData, selectedTubeExtensionId, apiUrl, isExteriorBcg]);

  const bcgExteriorImage2 = useMemo(() => {
    const exteriorImages = rootData?.exteriorImages;
    if (exteriorImages) {
      const imageLarge = exteriorImages?.exterior2;
      if (imageLarge && isExteriorBcg) {
        return `${ apiUrl }${ imageLarge }`
      }
    }

  }, [isExteriorBcg, apiUrl, rootData])

  const imageBasicPositionTwo = useMemo(() => {
    const exteriorImages = rootData?.reflections;
    if (exteriorImages) {
      const imageLarge = exteriorImages?.image2;
      if (imageLarge && isExteriorBcg) {
        return `${ apiUrl }${ imageLarge }`
      }
    }

  }, [isExteriorBcg, apiUrl, rootData])

  const bcgShadowImage = useMemo(() => {

    const bcgShadowImageData = customizeData?.sizes;

    let imageLarge = '';

    if (bcgShadowImageData && selectedSizeId) {
      imageLarge = bcgShadowImageData?.[`${ selectedSizeId }`].base.ImageLarge2;
    }

    if (imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [apiUrl, selectedSizeId, customizeData])


  const offsetYToCalcHeight = (stageHeight) => {
    if ((stageHeight < 450) && (+hotTubStageWidth >= 300 && +hotTubStageWidth < 330)) {
      return 1050
    } else if ((stageHeight < 450) && (+hotTubStageWidth >= 330 && +hotTubStageWidth < 500)) {
      return 565
    } else if ((window.innerHeight >= 600 && window.innerHeight < 1100) && (+hotTubStageWidth >= 800 && +hotTubStageWidth < 1100)) {
      return 400
    } else if ((window.innerHeight >= 880 && window.innerHeight < 1050) && (+hotTubStageWidth >= 440 && +hotTubStageWidth < 800)) {
      return 400
    } else if (stageHeight >= 750 && stageHeight < 900) {
      return 220
    } else if (stageHeight >= 900 && stageHeight < 1000) {
      return 200
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
    if (+hotTubStageWidth >= 1200) {
      if (+selectedSizeId === 80504) {
        setScaleX(1.15);
        setScaleY(1.15);
        setOffsetX(-50);
      } else {
        setScaleX(1.2);
        setScaleY(1.2);
        setOffsetX(-50);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100) {
      if (+selectedSizeId === 80504) {
        setScaleX(0.55);
        setScaleY(0.55);
        setOffsetX(150);
      } else {
        setScaleX(0.57);
        setScaleY(0.57);
        setOffsetX(145);
      }
    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === 80504) {
        setScaleX(0.8);
        setScaleY(0.8);
        setOffsetX(130);
      } else {
        setScaleX(0.85);
        setScaleY(0.85);
        setOffsetX(130);
      }
    } else if (+hotTubStageWidth >= 440 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === 80504) {
        setScaleX(1.1);
        setScaleY(1.1);
        setOffsetX(-200);
      } else {
        setScaleX(1.15);
        setScaleY(1.15);
        setOffsetX(-200);
      }
    } else if (+hotTubStageWidth >= 340 && +hotTubStageWidth <= 500) {
      if (+selectedSizeId === 80504) {
        setScaleX(0.9);
        setScaleY(0.9);
        setOffsetX(-100);
      } else {
        setScaleX(0.95);
        setScaleY(0.95);
        setOffsetX(-100);
      }
    } else if (+hotTubStageWidth < 340) {
      if (+selectedSizeId === 80504) {
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

  const optionName = function (name) {
    return rootData?.descriptions[name]?.germanName;
  }

  return (
      <div className='HotTubCanvasSecondView'>
        <Stage width={ hotTubStageWidth }
               height={ hotTubStageHeight }
               offsetX={ -hotTubStageWidth / 2 }
               offsetY={ -hotTubStageHeight / 2 }
        >
          <Layer ref={ iconsRef }
                 opacity={ isCustomizeOptionsOpen ? 1 : 0 }
                 scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ calcHeight(-offsetYToCalcHeight(hotTubStageHeight)) }
          >
            <Group>
              { woodText?.length > 1 && <Text x={ -225 }
                                              y={ 60 }
                                              fontFamily='Lato_400'
                                              fontSize={ 16 }
                                              text={ woodText }
                                              fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -220 }
                                   y={ 80 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setWoodText(optionName('wood')) }
                                   onMouseOut={ () => setWoodText('') }
                                   onClick={ () => setOpenTab('Wood') }
                                   src={ doneIcon }

              />
              }
            </Group>
            <Group>
              { insideColorText?.length > 1 && <Text x={ -350 }
                                                     y={ -125 }
                                                     fontFamily='Lato_400'
                                                     fontSize={ 16 }
                                                     text={ insideColorText }
                                                     fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -330 }
                                   y={ -105 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setInsideColorText(optionName('insideColor')) }
                                   onMouseOut={ () => setInsideColorText('') }
                                   onClick={ () => setOpenTab('Inside color') }
                                   src={ doneIcon }

              />
              }
            </Group>
            <Group>
              { coverText?.length > 1 && <Text x={ -135 }
                                               y={ -135 }
                                               fontFamily='Lato_400'
                                               fontSize={ 16 }
                                               text={ coverText }
                                               fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -130 }
                                   y={ -115 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setCoverText(optionName('cover')) }
                                   onMouseOut={ () => setCoverText('') }
                                   onClick={ () => setOpenTab('Cover') }
                                   src={ +selectedCoverId === 80580 ? plusIcon : doneIcon }

              />
              }
            </Group>
            <Group>
              { metalStrapsText?.length > 1 && <Text x={ -325 }
                                                     y={ -40 }
                                                     fontFamily='Lato_400'
                                                     fontSize={ 16 }
                                                     text={ metalStrapsText }
                                                     fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -300 }
                                   y={ -23 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setMetalStrapsText(optionName('metalStraps')) }
                                   onMouseOut={ () => setMetalStrapsText('') }
                                   onClick={ () => setOpenTab('Metal Straps') }
                                   src={ +selectedMetalStrapsId === 80513 ? plusIcon : doneIcon }

              />
              }
            </Group>

            <Group>
              { tubeExtensionText?.length > 1 && <Text x={ 240 }
                                                       y={ 150 }
                                                       fontFamily='Lato_400'
                                                       fontSize={ 16 }
                                                       text={ tubeExtensionText }
                                                       fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ 275 }
                                   y={ 170 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setTubeExtensionText(optionName('tubeExtension')) }
                                   onMouseOut={ () => setTubeExtensionText('') }
                                   onClick={ () => setOpenTab('Tube extension') }
                                   src={ +selectedTubeExtensionId !== 80527 ? plusIcon : doneIcon }

              />
              }
            </Group>
            <Group>
              { additionalAccessoriesText?.length > 1 && <Text x={ -450 }
                                                               y={ 0 }
                                                               fontFamily='Lato_400'
                                                               fontSize={ 16 }
                                                               text={ additionalAccessoriesText }
                                                               fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -390 }
                                   y={ 20 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setAdditionalAccessoriesText(optionName('additionalAccessoires')) }
                                   onMouseOut={ () => setAdditionalAccessoriesText('') }
                                   onClick={ () => setOpenTab('Additional Accessoires') }
                                   src={ +selectedAdditionalAccessoriesIds.includes(80523) ? plusIcon : doneIcon }

              />
              }
            </Group>

          </Layer>

          <Layer ref={ accessoriesRef }
                 scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ calcHeight(-offsetYToCalcHeight(hotTubStageHeight)) }
          >
            { imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map((item, index) => {
              return <Image key={ index }
                            x={ +item.position.x1 && +item.position.x1 }
                            y={ +item.position.y1 && +item.position.y1 }
                            width={ +item.width && +item.width }
                            height={ +item.height && +item.height }
                            src={ item.image && item.image }
              />
            }) }
            <Group>
              { imageTubeExtensionSrc && <Image x={ -863 }
                                                y={ -465 }
                                                width={ 1250 }
                                                height={ 750 }
                                                src={ imageTubeExtensionSrc }
              />
              }
            </Group>

          </Layer>

          <Layer scaleX={ 1 }
                 scaleY={ 1 }
          >

            { (bcgExteriorImage2 && isExteriorBcg) && <Image x={ -hotTubStageWidth / 2 }
                                                             y={ -hotTubStageHeight / 2 }
                                                             width={ hotTubStageWidth }
                                                             height={ hotTubStageHeight }
                                                             src={ bcgExteriorImage2 }/>
            }

          </Layer>

          <Layer scaleX={ calcHeight(scaleX && scaleX) }
                 scaleY={ calcHeight(scaleY && scaleY) }
                 ref={bcgShadowRef}
          >
            { bcgShadowImage && <Image x={ -450 }
                                       y={ 118 }
                                       width={ 780 }
                                       height={ 100 }
                                       src={ bcgShadowImage }
                                       offsetX={ offsetX && offsetX }
                                       offsetY={ calcHeight(-offsetYToCalcHeight(hotTubStageHeight)) }
            /> }
          </Layer>

          <Layer scaleX={ calcHeight(scaleX && scaleX) }
                 scaleY={ calcHeight(scaleY && scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ calcHeight(-offsetYToCalcHeight(hotTubStageHeight)) }
          >

            { imageHeatingOvenSrc && <Image x={ -839 }
                                            y={ -462 }
                                            width={ 960 }
                                            height={ 740 }
                                            src={ imageHeatingOvenSrc }
                                            opacity={ isExteriorBcg ? 0 : 1 }
            />
            }


            { imageBasicPositionTwo && <Image x={ -839 }
                                              y={ -462 }
                                              width={ 960 }
                                              height={ 740 }
                                              src={ imageBasicPositionTwo }
                                              opacity={ isExteriorBcg ? 1 : 0 }
            />
            }

            { imageWoodSrc && <Image x={ -586 }
                                     y={ -449 }
                                     width={ 825 }
                                     height={ 640 }
                                     src={ imageWoodSrc }
            />
            }

            { imageMetalStrapsSrc && <Image x={ +imageMetalStrapsSrc?.[1].x1 }
                                            y={ +imageMetalStrapsSrc?.[1].y1 }
                                            width={ +imageMetalStrapsSrc?.[2].width }
                                            height={ +imageMetalStrapsSrc?.[2].height }
                                            src={ imageMetalStrapsSrc[0] }
            />
            }
            { imageInsideColorSrc && <Image x={ -585 }
                                            y={ -310 }
                                            width={ 717 }
                                            height={ 450 }
                                            src={ imageInsideColorSrc }
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

            {imageSmokeSrc && <Image x={ -57 }
                                     y={ -473 }
                                     width={ 335 }
                                     height={ 120 }
                                     src={ imageSmokeSrc }
            />}
          </Layer>

        </Stage>

      </div>
  )

}

export default HotTubCanvasSecondView;
