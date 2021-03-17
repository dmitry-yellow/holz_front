import { Group, Layer, Stage, Text } from "react-konva";
import Image from "../Image/Image";
import { useMemo, useRef, useEffect, useState } from "react";
import bcgImagePositionOne from '../../assets/images/bcg-image-position-one.png';
import plusIcon from '../../assets/images/icon-svg.svg';
import doneIcon from '../../assets/images/icon-done.svg';
import './style.css';
import { useKunakovHeight } from "../customHooks/useKunakovHeight";


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
    coverOptionOpacity, selectedMassageFunctionId
  } = props;

  const apiUrl = process.env.REACT_APP_HOST_API_URL;

  const accessoriesRef = useRef(null);
  const iconsRef = useRef(null);


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

  const [calcHeight] = useKunakovHeight(hotTubStageHeight);

  useEffect(() => {
    if (iconsRef.current) {
      iconsRef.current.zIndex(3);
    }
    if (accessoriesRef.current) {
      accessoriesRef.current.zIndex(2);
    }
    if (hotTubStageWidth && hotTubStageHeight) {
      setScaleForLayers(hotTubStageWidth);
    }


  }, [iconsRef, accessoriesRef, hotTubStageWidth, hotTubStageHeight, selectedSizeId]);

  const imageAdditionalAccessoriesSrc = useMemo(() => {
    const additionalAccessoriesData = customizeData?.additionalAccessories;
    const woodData = customizeData?.wood;
    const spruceColorData = customizeData?.spruceColor;
    if (additionalAccessoriesData && selectedAdditionalAccessoriesIds) {
      let arr = [];
      selectedAdditionalAccessoriesIds.forEach(id => {
        const position = additionalAccessoriesData?.[`${ id }`].position;
        const width = additionalAccessoriesData?.[`${ id }`].base.width;
        const height = additionalAccessoriesData?.[`${ id }`].base.height;

        const positionExterior = {
          x: additionalAccessoriesData?.['80574'].imagesext.x,
          y: additionalAccessoriesData?.['80574'].imagesext.y
        };
        const widthExterior = additionalAccessoriesData?.['80574'].imagesext.width;
        const heightExterior = additionalAccessoriesData?.['80574'].imagesext.height;
        const imageLargeExterior = additionalAccessoriesData?.['80574'].imagesext.objectimage1;

        let imageLarge = '';
        if (+id === 80576) {
          if (woodData?.[`${ selectedWoodId }`]._main.Name === 'Spruce') {
            imageLarge = spruceColorData?.[`${ selectedSpruceColorId }`].base.boxImage;
          } else {
            imageLarge = woodData?.[`${ selectedWoodId }`].base.boxImage;
          }
        } else {

          imageLarge = additionalAccessoriesData?.[`${ id }`].base.imageLarge1;
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
      imageLarge = spruceColorData?.[`${ selectedSpruceColorId }`].base.imageLarge1;
    } else {
      imageLarge = woodData?.[`${ selectedWoodId }`].base.imageLarge1;
    }

    if (woodData && spruceColorData && selectedWoodId && imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [customizeData, selectedWoodId, selectedSpruceColorId, apiUrl]);


  const imageInsideColorSrc = useMemo(() => {
    const insideColorData = customizeData?.insideColor;
    let insideSrc, imageSrc;

    if (!isCustomizeOptionsWater) {
      if (+selectedLedId !== 80517) {
        insideSrc = 'waterledoff';
        imageSrc = 'image1';
      } else {
        insideSrc = 'base';
        imageSrc = 'imageLarge1';
      }

    } else {
      if (+selectedLedId !== 80517) {
        insideSrc = 'waterledon';
        imageSrc = 'image1';
      } else {
        insideSrc = 'waterPictures';
        imageSrc = 'image1';
      }
    }

    const imageLarge = insideColorData?.[`${ selectedInsideColorId }`]?.[insideSrc]?.[imageSrc];

    if (insideColorData && selectedInsideColorId && imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [customizeData, selectedInsideColorId, apiUrl, isCustomizeOptionsWater, selectedLedId]);


  const imageMassageFunctionSrc = useMemo(() => {
    const massageFunctionData = customizeData?.massageFunction;

    let insideSrc, imageSrc, massagePosition;

    if (!isCustomizeOptionsWater) {
      insideSrc = 'base';
      imageSrc = 'imageLarge1';
      massagePosition = 'position';
    } else {
      insideSrc = 'waterPictures';
      imageSrc = 'image1';
      massagePosition = 'waterPosition'
    }

    const imageLarge = massageFunctionData?.[`${ selectedMassageFunctionId }`][insideSrc][imageSrc];
    const width = massageFunctionData?.[`${ selectedMassageFunctionId }`][insideSrc].width;
    const height = massageFunctionData?.[`${ selectedMassageFunctionId }`][insideSrc].height;
    const position = massageFunctionData?.[`${ selectedMassageFunctionId }`]?.[massagePosition];


    if (massageFunctionData && selectedMassageFunctionId && imageLarge && position && height && width) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }];
    }
  }, [customizeData, selectedMassageFunctionId, apiUrl, isCustomizeOptionsWater]);


  const imageMetalStrapsSrc = useMemo(() => {
    const metalStrapsData = customizeData?.metalStraps;
    const width = metalStrapsData?.[`${ selectedMetalStrapsId }`].base.width;
    const height = metalStrapsData?.[`${ selectedMetalStrapsId }`].base.height;
    const widthExterior = metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.width;
    const heightExterior = metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.height;


    const position = metalStrapsData?.[`${ selectedMetalStrapsId }`].position;
    const positionExterior = {
      x: metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.x,
      y: metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.y
    };

    const imageLarge = metalStrapsData?.[`${ selectedMetalStrapsId }`].base.imageLarge1;
    const imageLargeExterior = metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.objectimage1;

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
    const imageLarge = heatingOvenData?.[`${ selectedHeatingOvenId }`].base.imageLarge1;

    if (heatingOvenData && selectedHeatingOvenId && imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [customizeData, selectedHeatingOvenId, apiUrl]);


  const imageCoverSrc = useMemo(() => {
    const coverData = customizeData?.cover;
    const position = coverData?.[`${ selectedCoverId }`].position;
    const width = coverData?.[`${ selectedCoverId }`].base.width;
    const height = coverData?.[`${ selectedCoverId }`].base.height;
    const imageLarge = coverData?.[`${ selectedCoverId }`].base.imageLarge1;
    if (coverData && selectedCoverId && imageLarge && position && width && height) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }];
    }
  }, [customizeData, selectedCoverId, apiUrl]);


  const imageTubeExtensionSrc = useMemo(() => {
    const tubeExtensionData = customizeData?.tubeExtension;

    if (tubeExtensionData && selectedTubeExtensionId) {
      const imageLarge = tubeExtensionData?.[`${ selectedTubeExtensionId }`].base.imageLarge1;
      const imageLargeExterior = tubeExtensionData?.[`${ selectedTubeExtensionId }`].imagesext.objectimage1;

      if (isExteriorBcg && imageLargeExterior) {
        return `${ apiUrl }${ imageLargeExterior }`
      } else if (imageLarge) {
        return `${ apiUrl }${ imageLarge }`
      }

    }
  }, [customizeData, selectedTubeExtensionId, apiUrl, isExteriorBcg]);

  const bcgExteriorImage1 = useMemo(() => {
    const exteriorImages = rootData?.exteriorImages;
    if (exteriorImages) {
      const imageLarge = exteriorImages?.exterior1;
      if (imageLarge && isExteriorBcg) {
        return `${ apiUrl }${ imageLarge }`
      }
    }

  }, [isExteriorBcg, apiUrl, rootData])

  const imageBasicPositionOne = useMemo(() => {
    const exteriorImages = rootData?.reflections;
    if (exteriorImages) {
      const imageLarge = exteriorImages?.image1;
      if (imageLarge && isExteriorBcg) {
        return `${ apiUrl }${ imageLarge }`
      }
    }
  }, [isExteriorBcg, apiUrl, rootData])

  const optionName = function (name) {
    return rootData?.descriptions[name]?.germanName;
  }

  const setScaleForLayers = (hotTubStageWidth) => {
    if (+hotTubStageWidth >= 1200) {
      if (+selectedSizeId === 80504) {
        setScaleX(1);
        setScaleY(1);
        setOffsetX(0);
        setOffsetY(-100);
      } else {
        setScaleX(1.05);
        setScaleY(1.05);
        setOffsetX(0);
        setOffsetY(-100);
      }

    } else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200) {
      if (+selectedSizeId === 80504) {
        setScaleX(0.65);
        setScaleY(0.65);
        setOffsetX(120);
        setOffsetY(-250);
      } else {
        setScaleX(0.7);
        setScaleY(0.7);
        setOffsetX(120);
        setOffsetY(-250);
      }
    } else if (+hotTubStageWidth >= 700 && +hotTubStageWidth < 1000) {
      if (+selectedSizeId === 80504) {
        setScaleX(0.55);
        setScaleY(0.55);
        setOffsetX(280);
        setOffsetY(-450);
      } else {
          setScaleX(0.6);
          setScaleY(0.6);
          setOffsetX(250);
          setOffsetY(-450);
      }
    } else if (+hotTubStageWidth >= 420 && +hotTubStageWidth < 700) {
      setScaleX(0.6);
      setScaleY(0.6);
      setOffsetX(250);
      setOffsetY(-450);
    } else if (+hotTubStageWidth >= 320 && +hotTubStageWidth <= 420) {
      if (+selectedSizeId === 80504) {
        setScaleX(1);
        setScaleY(1);
        setOffsetX(-100);
        setOffsetY(-200);
      } else {
        setScaleX(1.05);
        setScaleY(1.05);
        setOffsetX(-100);
        setOffsetY(-200);
      }
    }
  }

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
            <Group>
              { woodText?.length > 1 && <Text x={ -55 }
                                              y={ 80 }
                                              fontFamily='Lato_400'
                                              fontSize={ 16 }
                                              text={ woodText }
                                              fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -50 }
                                   y={ 100 }
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
              { insideColorText?.length > 1 && <Text x={ -325 }
                                                     y={ -200 }
                                                     fontFamily='Lato_400'
                                                     fontSize={ 16 }
                                                     text={ insideColorText }
                                                     fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -300 }
                                   y={ -180 }
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
              { coverText?.length > 1 && <Text x={ -115 }
                                               y={ -180 }
                                               fontFamily='Lato_400'
                                               fontSize={ 16 }
                                               text={ coverText }
                                               fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -110 }
                                   y={ -160 }
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
              { metalStrapsText?.length > 1 && <Text x={ -190 }
                                                     y={ 25 }
                                                     fontFamily='Lato_400'
                                                     fontSize={ 16 }
                                                     text={ metalStrapsText }
                                                     fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -160 }
                                   y={ 45 }
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
              { tubeExtensionText?.length > 1 && <Text x={ 230 }
                                                       y={ -110 }
                                                       fontFamily='Lato_400'
                                                       fontSize={ 16 }
                                                       text={ tubeExtensionText }
                                                       fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ 270 }
                                   y={ -90 }
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
              { additionalAccessoriesText?.length > 1 && <Text x={ -330 }
                                                               y={ 75 }
                                                               fontFamily='Lato_400'
                                                               fontSize={ 16 }
                                                               text={ additionalAccessoriesText }
                                                               fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -280 }
                                   y={ 95 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setAdditionalAccessoriesText(optionName('additionalAccessories')) }
                                   onMouseOut={ () => setAdditionalAccessoriesText('') }
                                   onClick={ () => setOpenTab('Additional Accessoires') }
                                   src={ +selectedAdditionalAccessoriesIds.includes(80523) ? plusIcon : doneIcon }

              />
              }
            </Group>

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
                                                opacity={ selectedCoverId !== 80580 && coverOptionOpacity ? 0 : 1 }
            />
            }
            { imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map((item, index) => {
              return <Image key={ index }
                            x={ +item.position.x && +item.position.x }
                            y={ +item.position.y && +item.position.y }
                            width={ +item.width && +item.width }
                            height={ +item.height && +item.height }
                            src={ item.image && item.image }
              />
            }) }
            <Group>
              { imageTubeExtensionSrc && <Image x={ -912 }
                                                y={ -483 }
                                                width={ 1300 }
                                                height={ 900 }
                                                src={ imageTubeExtensionSrc }/>
              }
            </Group>

          </Layer>
          <Layer scaleX={ isExteriorBcg ? 1 : calcHeight(scaleX && scaleX) }
                 scaleY={ isExteriorBcg ? 1 : calcHeight(scaleY && scaleY) }>
            { !isExteriorBcg && <Image x={ -905 }
                                       y={ -535 }
                                       width={ 1650 }
                                       height={ 950 }
                                       src={ bcgImagePositionOne }
                                       opacity={ isExteriorBcg ? 0 : 1 }
                                       offsetX={ offsetX && offsetX }
                                       offsetY={ offsetY && calcHeight(offsetY) }
            /> }
            { (bcgExteriorImage1 && isExteriorBcg) && <Image x={ -hotTubStageWidth / 2 }
                                                             y={ -hotTubStageHeight / 2 }
                                                             width={ hotTubStageWidth }
                                                             height={ hotTubStageHeight }
                                                             src={ bcgExteriorImage1 }
            />
            }
          </Layer>
          <Layer scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
          >
            { imageHeatingOvenSrc && <Image x={ -889 }
                                            y={ -495 }
                                            width={ 1175 }
                                            height={ 880 }
                                            src={ imageHeatingOvenSrc }
                                            opacity={ isExteriorBcg ? 0 : 1 }
            />
            }

            { imageBasicPositionOne && <Image x={ -903 }
                                              y={ -575 }
                                              width={ 1650 }
                                              height={ 1000 }
                                              src={ imageBasicPositionOne }
                                              opacity={ isExteriorBcg ? 1 : 0 }
            />
            }

            { imageWoodSrc && <Image x={ -584 }
                                     y={ -460 }
                                     width={ 820 }
                                     height={ 650 }
                                     src={ imageWoodSrc }
            />
            }
            { imageMetalStrapsSrc && <Image x={ +imageMetalStrapsSrc?.[1].x }
                                            y={ +imageMetalStrapsSrc?.[1].y }
                                            width={ +imageMetalStrapsSrc?.[2].width }
                                            height={ +imageMetalStrapsSrc?.[2].height }
                                            src={ imageMetalStrapsSrc[0] }
            />
            }

            { imageInsideColorSrc && <Image x={ -915 }
                                            y={ -458 }
                                            width={ 1180 }
                                            height={ 840 }
                                            src={ imageInsideColorSrc }
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
          </Layer>
        </Stage>

      </div>
  )

}

export default HotTubCanvasView;
