import { useMemo, useRef, useEffect, useState } from "react";
import { useKunakovHeight } from "../customHooks/useKunakovHeight";
import { Group, Layer, Stage, Text } from "react-konva";
import Image from "../Image/Image";
import plusIcon from '../../assets/images/icon-svg.svg';
import doneIcon from '../../assets/images/icon-done.svg';
import schalter_1 from '../../assets/images/schalter/Hottub-Studio_0002s_0004s_0003_Schalter-01.png';
import schalter_2 from '../../assets/images/schalter/Hottub-Studio_0002s_0004s_0002_Schalter-02.png';
import schalter_3 from '../../assets/images/schalter/Hottub-Studio_0002s_0004s_0001_Schalter-03.png';
import schalter_4 from '../../assets/images/schalter/Hottub-Studio_0002s_0004s_0000_Schalter-04.png';



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

  const [calcHeight] = useKunakovHeight(hotTubStageHeight);

  const accessoriesRef = useRef(null);
  const iconsRef = useRef(null);
  const bcgRefImageLayer = useRef(null);
  const massageRef = useRef(null);

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
    if (massageRef.current) {
      massageRef.current.zIndex(3);
    }
    if (bcgRefImageLayer.current) {
      bcgRefImageLayer.current.zIndex(0);
    }

    if(hotTubStageWidth && hotTubStageHeight){
      setScaleForLayers(hotTubStageWidth);
    }

  }, [iconsRef, accessoriesRef, massageRef, selectedSizeId, hotTubStageWidth, hotTubStageHeight]);

  const imageAdditionalAccessoriesSrc = useMemo(() => {
    const additionalAccessoriesData = customizeData?.additionalAccessories;
    const woodData = customizeData?.wood;
    const spruceColorData = customizeData?.spruceColor;
    if (additionalAccessoriesData && selectedAdditionalAccessoriesIds) {
      let arr = [];
      selectedAdditionalAccessoriesIds.forEach(id => {
        const position = additionalAccessoriesData?.[`${ id }`].position;
        const width = additionalAccessoriesData?.[`${ id }`].base.width2;
        const height = additionalAccessoriesData?.[`${ id }`].base.height2;

        const positionExterior = {
          x2: additionalAccessoriesData?.['80574'].imagesext.x2,
          y2: additionalAccessoriesData?.['80574'].imagesext.y2
        };
        const widthExterior = additionalAccessoriesData?.['80574'].imagesext.width2;
        const heightExterior = additionalAccessoriesData?.['80574'].imagesext.height2;
        const imageLargeExterior = additionalAccessoriesData?.['80574'].imagesext.objectimage3;


        let imageLarge = '';
        if (+id === 80576) {
          if (woodData?.[`${ selectedWoodId }`]._main.Name === 'Spruce') {
            imageLarge = spruceColorData?.[`${ selectedSpruceColorId }`].base.boxImage2;
          } else {
            imageLarge = woodData?.[`${ selectedWoodId }`].base.boxImage2;
          }
        } else {
          imageLarge = additionalAccessoriesData?.[`${ id }`].base.imageLarge3;
        }

        if (isExteriorBcg && +id === 80574) {
          arr = [...arr, {
            image: `${ apiUrl }${ imageLargeExterior }`,
            position: positionExterior,
            width: widthExterior,
            height: heightExterior
          }]
        } else if (imageLarge) {
          arr = [...arr, { image: `${ apiUrl }${ imageLarge }`, position: position, width: width, height: height }]
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
      imageLarge = spruceColorData?.[`${ selectedSpruceColorId }`].base.imageLarge3;
    } else {
      imageLarge = woodData?.[`${ selectedWoodId }`].base.imageLarge3;
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
        imageSrc = 'image3';
      } else {
        insideSrc = 'base';
        imageSrc = 'imageLarge3';
      }

    } else {
      if (+selectedLedId !== 80517) {
        insideSrc = 'waterledon';
        imageSrc = 'image3';
      } else {
        insideSrc = 'waterPictures';
        imageSrc = 'image3';
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
      imageSrc = 'imageLarge3';
      massagePosition = 'position';
    } else {
      insideSrc = 'waterPictures';
      imageSrc = 'image3';
      massagePosition = 'waterPosition'
    }

    const imageLarge = massageFunctionData?.[`${ selectedMassageFunctionId }`][insideSrc][imageSrc];
    const width = massageFunctionData?.[`${ selectedMassageFunctionId }`][insideSrc].width2;
    const height = massageFunctionData?.[`${ selectedMassageFunctionId }`][insideSrc].height2;
    const position = massageFunctionData?.[`${ selectedMassageFunctionId }`]?.[massagePosition];


    if (massageFunctionData && selectedMassageFunctionId && imageLarge && position && height && width) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }];
    }
  }, [customizeData, selectedMassageFunctionId, apiUrl, isCustomizeOptionsWater]);


  const imageMetalStrapsSrc = useMemo(() => {
    const metalStrapsData = customizeData?.metalStraps;
    const position = metalStrapsData?.[`${ selectedMetalStrapsId }`].position;
    const positionExterior = {
      x2: metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.x2,
      y2: metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.y2
    };

    const width = metalStrapsData?.[`${ selectedMetalStrapsId }`].base.width2;
    const height = metalStrapsData?.[`${ selectedMetalStrapsId }`].base.height2;
    const widthExterior = metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.width2;
    const heightExterior = metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.height2;

    const imageLarge = metalStrapsData?.[`${ selectedMetalStrapsId }`].base.imageLarge3;

    const imageLargeExterior = metalStrapsData?.[`${ selectedMetalStrapsId }`].imagesext.objectimage3;

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
    const imageLarge = heatingOvenData?.[`${ selectedHeatingOvenId }`].base.imageLarge3;

    if (heatingOvenData && selectedHeatingOvenId && imageLarge) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [customizeData, selectedHeatingOvenId, apiUrl]);


  const imageCoverSrc = useMemo(() => {
    const coverData = customizeData?.cover;
    const position = coverData?.[`${ selectedCoverId }`].position;
    const width = coverData?.[`${ selectedCoverId }`].base.width2;
    const height = coverData?.[`${ selectedCoverId }`].base.height2;
    const imageLarge = coverData?.[`${ selectedCoverId }`].base.imageLarge3;
    if (coverData && selectedCoverId && imageLarge && position && width && height) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }];
    }
  }, [customizeData, selectedCoverId, apiUrl]);


  const imageTubeExtensionSrc = useMemo(() => {
    const tubeExtensionData = customizeData?.tubeExtension;

    if (tubeExtensionData && selectedTubeExtensionId) {
      const imageLarge = tubeExtensionData?.[`${ selectedTubeExtensionId }`].base.imageLarge3;
      const imageLargeExterior = tubeExtensionData?.[`${ selectedTubeExtensionId }`].imagesext.objectimage3;

      if (isExteriorBcg && imageLargeExterior) {
        return `${ apiUrl }${ imageLargeExterior }`
      } else if (imageLarge) {
        return `${ apiUrl }${ imageLarge }`
      }

    }
  }, [customizeData, selectedTubeExtensionId, apiUrl, isExteriorBcg]);

  const bcgExteriorImage3 = useMemo(() => {
    const exteriorImages = rootData?.exteriorImages;

    if (exteriorImages) {
      const imageLarge = exteriorImages?.exterior3;
      if (imageLarge && isExteriorBcg) {
        return `${ apiUrl }${ imageLarge }`
      }
    }

  }, [isExteriorBcg, apiUrl, rootData])

  const imageBasicPositionThree = useMemo(() => {
    const exteriorImages = rootData?.reflections;

    if (exteriorImages) {
      const imageLarge = exteriorImages?.image3;
      if (imageLarge && isExteriorBcg) {
        return `${ apiUrl }${ imageLarge }`
      }
    }

  }, [isExteriorBcg, apiUrl, rootData])

  const bcgShadowImage = useMemo(() => {

    const bcgShadowImageData = customizeData?.sizes;

    let imageLarge = '';

    if (bcgShadowImageData && selectedSizeId) {
      imageLarge = bcgShadowImageData?.[`${ selectedSizeId }`].base.imageLarge3;
    }

    if (imageLarge && !isExteriorBcg) {
      return `${ apiUrl }${ imageLarge }`
    }
  }, [isExteriorBcg, apiUrl, selectedSizeId, customizeData])

  const schalters = [
    { image: schalter_1, width: 20, height: 20, x: -60, y: -31 },
    { image: schalter_2, width: 20, height: 20, x: -36, y: -36 },
    { image: schalter_3, width: 20, height: 20, x: -12, y: -42 }
  ];

	const setScaleForLayers = ( hotTubStageWidth ) => {
		if(+hotTubStageWidth >= 1200){
			if(+selectedSizeId === 80504){
				setScaleX(1);
				setScaleY(1);
				setOffsetX(-100);
				setOffsetY(-250);
			} else {
				setScaleX(1.05);
				setScaleY(1.05);
				setOffsetX(-100);
				setOffsetY(-250);
			}
		} else if( +hotTubStageWidth >= 1000 && +hotTubStageWidth < 1200){
      if(+selectedSizeId === 80504){
        setScaleX(0.6);
        setScaleY(0.6);
        setOffsetX(100);
        setOffsetY(-400);
      } else {
        setScaleX(0.65);
        setScaleY(0.65);
        setOffsetX(100);
        setOffsetY(-400);
      }
    } else if( +hotTubStageWidth >= 700 && +hotTubStageWidth < 1000){
      if(+selectedSizeId === 80504) {
        setScaleX(0.5);
        setScaleY(0.5);
        setOffsetX(250);
        setOffsetY(-600);
      } else {
        setScaleX(0.53);
        setScaleY(0.53);
        setOffsetX(230);
        setOffsetY(-600);
      }
    } else if( +hotTubStageWidth >= 340 && +hotTubStageWidth < 500){
      if(+selectedSizeId === 80504) {
        setScaleX(0.7);
        setScaleY(0.7);
        setOffsetX(-160);
        setOffsetY(-950);
      } else {
        setScaleX(0.75);
        setScaleY(0.75);
        setOffsetX(-180);
        setOffsetY(-900);
      }
    } else if(+hotTubStageWidth <= 340){
      if(+selectedSizeId === 80504) {
        setScaleX(0.55);
        setScaleY(0.55);
        setOffsetX(-170);
        setOffsetY(-1800);
      } else {
        setScaleX(0.57);
        setScaleY(0.57);
        setOffsetX(-170);
        setOffsetY(-1800);
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
          <Layer ref={ massageRef }
                 scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
          >
            { imageMassageFunctionSrc && <Image x={ +imageMassageFunctionSrc?.[1].x2 }
                                                y={ +imageMassageFunctionSrc?.[1].y2 }
                                                width={ +imageMassageFunctionSrc[2].width }
                                                height={ +imageMassageFunctionSrc[2].height }
                                                src={ imageMassageFunctionSrc?.[0] }
                                                opacity={ selectedCoverId !== 80580 && coverOptionOpacity ? 0 : 1 }
            />
            }
            <Group>
              { +selectedMassageFunctionId !== 80515 && schalters?.length > 1 && schalters.map((schalter, index) => {
                return <Image x={ schalter.x }
                              y={ schalter.y }
                              width={ schalter.width }
                              height={ schalter.height }
                              src={ schalter.image }
                              key={ index }
                />
              }) }
              { +selectedLedId !== 80517 && <Image x={ 9 }
                                                   y={ -50 }
                                                   width={ 20 }
                                                   height={ 20 }
                                                   src={ schalter_4 }
              />
              }
            </Group>
          </Layer>
          <Layer ref={ iconsRef }
                 opacity={ isCustomizeOptionsOpen ? 1 : 0 }
                 scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
          >
            <Group>
              { woodText?.length > 1 && <Text x={ -237 }
                                              y={ -10 }
                                              fontFamily='Lato_400'
                                              fontSize={ 16 }
                                              text={ woodText }
                                              fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -230 }
                                   y={ 10 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setWoodText('Wood') }
                                   onMouseOut={ () => setWoodText('') }
                                   onClick={ () => setOpenTab('Wood') }
                                   src={ doneIcon }

              />
              }
            </Group>
            <Group>
              { insideColorText?.length > 1 && <Text x={ 70 }
                                                     y={ -360 }
                                                     fontFamily='Lato_400'
                                                     fontSize={ 16 }
                                                     text={ insideColorText }
                                                     fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ 95 }
                                   y={ -340 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setInsideColorText('Inside color') }
                                   onMouseOut={ () => setInsideColorText('') }
                                   onClick={ () => setOpenTab('Inside color') }
                                   src={ doneIcon }

              />
              }
            </Group>
            <Group>
              { coverText?.length > 1 && <Text x={ -120 }
                                               y={ -290 }
                                               fontFamily='Lato_400'
                                               fontSize={ 16 }
                                               text={ coverText }
                                               fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -115 }
                                   y={ -270 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setCoverText('Cover') }
                                   onMouseOut={ () => setCoverText('') }
                                   onClick={ () => setOpenTab('Cover') }
                                   src={ +selectedCoverId === 80580 ? plusIcon : doneIcon }

              />
              }
            </Group>
            <Group>
              { metalStrapsText?.length > 1 && <Text x={ -25 }
                                                     y={ -20 }
                                                     fontFamily='Lato_400'
                                                     fontSize={ 16 }
                                                     text={ metalStrapsText }
                                                     fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ 0 }
                                   y={ 0 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setMetalStrapsText('Metal straps') }
                                   onMouseOut={ () => setMetalStrapsText('') }
                                   onClick={ () => setOpenTab('Metal Straps') }
                                   src={ +selectedMetalStrapsId === 80513 ? plusIcon : doneIcon }

              />
              }
            </Group>

            <Group>
              { tubeExtensionText?.length > 1 && <Text x={ -535 }
                                                       y={ 80 }
                                                       fontFamily='Lato_400'
                                                       fontSize={ 16 }
                                                       text={ tubeExtensionText }
                                                       fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ -510 }
                                   y={ 100 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setTubeExtensionText('Tube extension ') }
                                   onMouseOut={ () => setTubeExtensionText('') }
                                   onClick={ () => setOpenTab('Tube extension') }
                                   src={ +selectedTubeExtensionId !== 80527 ? plusIcon : doneIcon }

              />
              }
            </Group>
            <Group>
              { additionalAccessoriesText?.length > 1 && <Text x={ 20 }
                                                               y={ -440 }
                                                               fontFamily='Lato_400'
                                                               fontSize={ 16 }
                                                               text={ additionalAccessoriesText }
                                                               fill={ 'black' }
              />
              }

              { plusIcon && <Image x={ 70 }
                                   y={ -420 }
                                   width={ 30 }
                                   height={ 30 }
                                   onMouseOver={ () => setAdditionalAccessoriesText('Additional accessories ') }
                                   onMouseOut={ () => setAdditionalAccessoriesText('') }
                                   onClick={ () => setOpenTab('Additional Accessoires') }
                                   src={ +selectedAdditionalAccessoriesIds.includes(80523) ? plusIcon : doneIcon }

              />
              }
            </Group>

          </Layer>


          <Layer scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
          >
            { imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map((item, index) => {
              return <Image key={ index }
                            x={ +item.position.x2 && +item.position.x2 }
                            y={ +item.position.y2 && +item.position.y2 }
                            width={ +item.width && +item.width }
                            height={ +item.height && +item.height }
                            src={ item.image && item.image }
              />
            }) }
            <Group>
              { imageTubeExtensionSrc && <Image x={ -890 }
                                                y={ -520 }
                                                width={ 1150 }
                                                height={ 750 }
                                                src={ imageTubeExtensionSrc }
              />
              }
            </Group>

          </Layer>


          <Layer scaleX={ isExteriorBcg ? 1 : calcHeight(scaleX && scaleX) }
                 scaleY={ isExteriorBcg ? 1 : calcHeight(scaleY && scaleY) }
                 ref={ bcgRefImageLayer }
          >
            { !isExteriorBcg && bcgShadowImage && <Image x={ -445 }
                                       y={ -400 }
                                       width={ 685 }
                                       height={ 600 }
                                       src={ bcgShadowImage }
                                       opacity={ isExteriorBcg ? 0 : 1 }
                                       offsetX={ offsetX && offsetX }
                                       offsetY={ offsetY && calcHeight(offsetY) }
            /> }

            { (bcgExteriorImage3 && isExteriorBcg) && <Image x={ -hotTubStageWidth / 2 }
                                                             y={ -hotTubStageHeight / 2 }
                                                             width={ hotTubStageWidth }
                                                             height={ hotTubStageHeight }
                                                             src={ bcgExteriorImage3 }/>
            }
          </Layer>

          <Layer scaleX={ scaleX && calcHeight(scaleX) }
                 scaleY={ scaleY && calcHeight(scaleY) }
                 offsetX={ offsetX && offsetX }
                 offsetY={ offsetY && calcHeight(offsetY) }
          >

            { imageHeatingOvenSrc && <Image x={ -857 }
                                            y={ -540 }
                                            width={ 1030 }
                                            height={ 750 }
                                            src={ imageHeatingOvenSrc }
                                            opacity={ isExteriorBcg ? 0 : 1 }
            />
            }


            { imageBasicPositionThree && <Image x={ -870 }
                                                y={ -615 }
                                                width={ 1485 }
                                                height={ 850 }
                                                src={ imageBasicPositionThree }
                                                opacity={ isExteriorBcg ? 1 : 0 }
            />
            }

            { imageWoodSrc && <Image x={ -578 }
                                     y={ -490 }
                                     width={ 750 }
                                     height={ 670 }
                                     src={ imageWoodSrc }
            />
            }

            { imageMetalStrapsSrc && <Image x={ +imageMetalStrapsSrc?.[1].x2 }
                                            y={ +imageMetalStrapsSrc?.[1].y2 }
                                            width={ +imageMetalStrapsSrc?.[2].width }
                                            height={ +imageMetalStrapsSrc?.[2].height }
                                            src={ imageMetalStrapsSrc[0] }
            />
            }

            { imageInsideColorSrc && <Image x={ -860 }
                                            y={ -501 }
                                            width={ 1010 }
                                            height={ 700 }
                                            src={ imageInsideColorSrc }
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
          </Layer>
        </Stage>

      </div>
  )

}

export default HotTubCanvasThirdView;