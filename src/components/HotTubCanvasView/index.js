import { Group, Layer, Stage, Text } from "react-konva";
import { useMemo, useRef, useEffect, useState } from "react";
import { useKunakovHeight } from "../customHooks/useKunakovHeight";
import Image from "../Image/Image";
import plusIcon from '../../assets/images/icon-svg.svg';
import doneIcon from '../../assets/images/icon-done.svg';
import { logDOM } from "@testing-library/react";


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
  const bcgWithoutExt = useRef(null);
  const bcgExtRef = useRef(null);


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
            height: heightExterior,
            id
          }, ...arr]
        } else if (imageLarge) {
          if (+id === 80591) {
            arr = [{ image: `${ apiUrl }${ imageLarge }`, position: position, width: width, height: height, id }, ...arr]
          } else {
            arr = [...arr, { image: `${ apiUrl }${ imageLarge }`, position: position, width: width, height: height, id }]
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
    const bigInsideColorData = customizeData?.bigInsideColor;
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

    let imageLarge = '';
    const indexOfSelectedInsideColorId = insideColorData && Object.keys(insideColorData)?.indexOf(String(selectedInsideColorId));
    let selectedBigInsideColorId = bigInsideColorData && Object.keys(bigInsideColorData)[indexOfSelectedInsideColorId];

    if(+selectedSizeId === 80504){
      imageLarge = insideColorData?.[`${ selectedInsideColorId }`]?.[insideSrc]?.[imageSrc];
    } else {
      imageLarge = bigInsideColorData?.[`${ selectedBigInsideColorId }`]?.[insideSrc]?.[imageSrc];
    }



    if (insideColorData && selectedInsideColorId && imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [customizeData, selectedInsideColorId, apiUrl, isCustomizeOptionsWater, selectedLedId, selectedSizeId]);


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

  const imageSmokeSrc = useMemo(() => {

    const heatingOvenData = customizeData?.heatingOven;
    const imageLarge = heatingOvenData?.[`${ selectedHeatingOvenId }`].base.boxImage;

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

  const bcgShadowImage = useMemo(() => {

    const bcgShadowImageData = customizeData?.sizes;

    let imageLarge = '';

    if (bcgShadowImageData && selectedSizeId) {
      imageLarge = bcgShadowImageData?.[`${ selectedSizeId }`].base.imageLarge1;
    }

    if (imageLarge) {
        return `${ apiUrl }${ imageLarge }`
    }
  }, [apiUrl, selectedSizeId, customizeData])


  const optionName = function (name) {
    return rootData?.descriptions[name]?.germanName;
  }

  const setScaleForLayers = (hotTubStageWidth) => {
    if (+hotTubStageWidth >= 1200) {
      if (+selectedSizeId === 80504) {
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

    }else if (+hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200 && window.innerHeight >= 1100 ) {
      if (+selectedSizeId === 80504) {
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
      if (+selectedSizeId === 80504) {
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
      if (+selectedSizeId === 80504) {
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
      if (+selectedSizeId === 80504) {
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
    } else if ( +hotTubStageWidth <= 330){
      if (+selectedSizeId === 80504) {
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
              { woodText?.length > 1 && <Text x={ -70 }
                                              y={ 80 }
                                              fontFamily='Montserrat_400'
                                              fontSize={ 16 }
                                              text={ woodText }
                                              fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -60 }
                                   y={ 100 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setWoodText(optionName('wood')) }
                                   onMouseOut={ () => setWoodText('') }
                                   onClick={ () => setOpenTab('Wood') }
                                   onTap={ () => setOpenTab('Wood') }
                                   src={ doneIcon }

              />
              }
            </Group>
            <Group>
              { insideColorText?.length > 1 && <Text x={ -400 }
                                                     y={ -200 }
                                                     fontFamily='Montserrat_400'
                                                     fontSize={ 16 }
                                                     text={ insideColorText }
                                                     fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -340 }
                                   y={ -180 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setInsideColorText(optionName('insideColor')) }
                                   onMouseOut={ () => setInsideColorText('') }
                                   onClick={ () => setOpenTab('Inside color') }
                                   onTap={ () => setOpenTab('Inside color') }
                                   src={ doneIcon }

              />
              }
            </Group>
            <Group>
              { coverText?.length > 1 && <Text x={ -135 }
                                               y={ -190 }
                                               fontFamily='Montserrat_400'
                                               fontSize={ 16 }
                                               text={ coverText }
                                               fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -115 }
                                   y={ -170 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setCoverText(optionName('cover')) }
                                   onMouseOut={ () => setCoverText('') }
                                   onTap={() => setOpenTab('Cover') }
                                   onClick={ () => setOpenTab('Cover') }
                                   src={ +selectedCoverId === 80580 ? plusIcon : doneIcon }

              />
              }
            </Group>
            <Group>
              { metalStrapsText?.length > 1 && <Text x={ -175 }
                                                     y={ 40 }
                                                     fontFamily='Montserrat_400'
                                                     fontSize={ 16 }
                                                     text={ metalStrapsText }
                                                     fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -160 }
                                   y={ 60 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setMetalStrapsText(optionName('metalStraps')) }
                                   onMouseOut={ () => setMetalStrapsText('') }
                                   onClick={ () => setOpenTab('Metal Straps') }
                                   onTap={ () => setOpenTab('Metal Straps') }
                                   src={ +selectedMetalStrapsId === 80513 ? plusIcon : doneIcon }

              />
              }
            </Group>

            <Group>
              { tubeExtensionText?.length > 1 && <Text x={ 230 }
                                                       y={ -110 }
                                                       fontFamily='Montserrat_400'
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
                                   onTap={ () => setOpenTab('Tube extension') }
                                   src={ +selectedTubeExtensionId !== 80527 ? plusIcon : doneIcon }

              />
              }
            </Group>
            <Group>
              { additionalAccessoriesText?.length > 1 && <Text x={ -420 }
                                                               y={ 55 }
                                                               fontFamily='Montserrat_400'
                                                               fontSize={ 16 }
                                                               text={ additionalAccessoriesText }
                                                               fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -340 }
                                   y={ 80 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setAdditionalAccessoriesText(optionName('additionalAccessories')) }
                                   onMouseOut={ () => setAdditionalAccessoriesText('') }
                                   onClick={ () => setOpenTab('Additional Accessoires') }
                                   onTap={ () => setOpenTab('Additional Accessoires') }
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

            { imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map(item => {
              return <Image key={ item.id }
                            x={ +item.position.x && +item.position.x }
                            y={ +item.position.y && +item.position.y }
                            width={ +item.width && +item.width }
                            height={ +item.height && +item.height }
                            src={ item.image && item.image }
                            debug
              />
            }) }
            <Group>
              { imageTubeExtensionSrc && <Image x={ -949 }
                                                y={ -470 }
                                                width={ 1350 }
                                                height={ 875 }
                                                src={ imageTubeExtensionSrc }/>
              }
            </Group>

          </Layer>
          <Layer ref={bcgExtRef}
                 scaleX={ 1 }
                 scaleY={ 1 }
          >
            { (bcgExteriorImage1 && isExteriorBcg) && <Image x={ -hotTubStageWidth / 2 }
                                                             y={ -hotTubStageHeight / 2 }
                                                             width={ hotTubStageWidth }
                                                             height={ hotTubStageHeight }
                                                             src={ bcgExteriorImage1 }
            />
            }
          </Layer>

          <Layer scaleX={ calcHeight(scaleX && scaleX) }
                 scaleY={ calcHeight(scaleY && scaleY) }
                 ref={bcgWithoutExt}
          >
            { bcgShadowImage &&  <Image x={ -535 }
                                          y={ -170 }
                                          width={ 770 }
                                          height={ 525 }
                                          src={ bcgShadowImage }
                                          offsetX={ offsetX && offsetX }
                                          offsetY={ offsetY && calcHeight(offsetY) }
            /> }
          </Layer>
          <Layer scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
          >

            { imageHeatingOvenSrc && <Image x={ -995 }
                                            y={ -507 }
                                            width={ 1300 }
                                            height={ 910 }
                                            src={ imageHeatingOvenSrc }
                                            opacity={ isExteriorBcg ? 0 : 1 }
            />
            }

            { imageBasicPositionOne && <Image x={ -995 }
                                              y={ -507 }
                                              width={ 1300 }
                                              height={ 910 }
                                              src={ imageBasicPositionOne }
                                              opacity={ isExteriorBcg ? 1 : 0 }
            />
            }

            { imageWoodSrc && <Image x={ -660 }
                                     y={ -476 }
                                     width={ 915 }
                                     height={ 680 }
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

            { imageInsideColorSrc && <Image x={ -1002 }
                                            y={ -471 }
                                            width={ 1275 }
                                            height={ 875 }
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
            {imageSmokeSrc && <Image x={ 193 }
                                     y={ -572 }
                                     width={ 210 }
                                     height={ 193 }
                                     src={ imageSmokeSrc }
            />}
          </Layer>
        </Stage>

      </div>
  )

}

export default HotTubCanvasView;
