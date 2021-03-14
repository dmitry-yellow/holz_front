import {Group, Layer, Stage, Text} from "react-konva";
import Image from "../Image/Image";
import {useMemo, useRef, useEffect, useState} from "react";
import bcgImagePositionTwo from '../../assets/images/bcg-image-position-two.png';
import plusIcon from '../../assets/images/icon-svg.svg';
import doneIcon from '../../assets/images/icon-done.svg';
import imageBasicPositionTwo
    from '../../assets/images/hintergrund-180-metall-und-schatten-04_0000_180er-metal-und-schatten-04.png';
import {useKunakovHeight} from "../customHooks/useKunakovHeight";


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
        isCustomizeOptionsOpen,
        coverOptionOpacity
    } = props;

    const apiUrl = process.env.REACT_APP_HOST_API_URL;
    const [calcHeight] = useKunakovHeight(hotTubStageHeight);
    const accessoriesRef = useRef(null);
    const iconsRef = useRef(null);
    const [woodText, setWoodText] = useState('');
    const [metalStrapsText, setMetalStrapsText] = useState('');
    const [insideColorText, setInsideColorText] = useState('');
    const [coverText, setCoverText] = useState('');
    const [tubeExtensionText, setTubeExtensionText] = useState('');
    const [additionalAccessoriesText, setAdditionalAccessoriesText] = useState('');


    useEffect(() => {
        if (iconsRef.current) {
            iconsRef.current.zIndex(3);
        }
        if (accessoriesRef.current) {
            accessoriesRef.current.zIndex(2);
        }
    }, [iconsRef, accessoriesRef]);

    const imageAdditionalAccessoriesSrc = useMemo(() => {
        const additionalAccessoriesData = customizeData?.additionalAccessories;
        const woodData = customizeData?.wood;
        const spruceColorData = customizeData?.spruceColor;
        if (additionalAccessoriesData && selectedAdditionalAccessoriesIds) {
            let arr = [];
            selectedAdditionalAccessoriesIds.forEach(id => {
                const position = additionalAccessoriesData?.[`${id}`].position;
                const width = additionalAccessoriesData?.[`${id}`].base.width1;
                const height = additionalAccessoriesData?.[`${id}`].base.height1;

                const positionExterior = {
                    x1: additionalAccessoriesData?.['80574'].imagesext.x1,
                    y1: additionalAccessoriesData?.['80574'].imagesext.y1
                };
                const widthExterior = additionalAccessoriesData?.['80574'].imagesext.width1;
                const heightExterior = additionalAccessoriesData?.['80574'].imagesext.height1;
                const imageLargeExterior = additionalAccessoriesData?.['80574'].imagesext.objectimage2;

                let imageLarge = '';
                if (+id === 80576) {
                    if (woodData?.[`${selectedWoodId}`]._main.Name === 'Spruce') {
                        imageLarge = spruceColorData?.[`${selectedSpruceColorId}`].base.boxImage1;
                    } else {
                        imageLarge = woodData?.[`${selectedWoodId}`].base.boxImage1;
                    }
                } else {
                    imageLarge = additionalAccessoriesData?.[`${id}`].base.ImageLarge2;
                }

                if (isExteriorBcg && +id === 80574) {
                    arr = [...arr, {
                        image: `${apiUrl}${imageLargeExterior}`,
                        position: positionExterior,
                        width: widthExterior,
                        height: heightExterior
                    }]
                } else if (imageLarge) {
                    arr = [...arr, {image: `${apiUrl}${imageLarge}`, position: position, width: width, height: height}]
                }
            })
            return arr;
        }

    }, [customizeData, selectedAdditionalAccessoriesIds, selectedWoodId, selectedSpruceColorId, apiUrl, isExteriorBcg]);

    const imageWoodSrc = useMemo(() => {
        const woodData = customizeData?.wood;
        const spruceColorData = customizeData?.spruceColor;
        let imageLarge = '';

        if (woodData?.[`${selectedWoodId}`]._main.Name === 'Spruce') {
            imageLarge = spruceColorData?.[`${selectedSpruceColorId}`].base.ImageLarge2;
        } else {
            imageLarge = woodData?.[`${selectedWoodId}`].base.ImageLarge2;
        }

        if (woodData && spruceColorData && selectedWoodId && imageLarge) {
            return `${apiUrl}${imageLarge}`
        }
    }, [customizeData, selectedWoodId, selectedSpruceColorId, apiUrl]);


    const imageInsideColorSrc = useMemo(() => {
        const insideColorData = customizeData?.insideColor;
        const imageLarge = insideColorData?.[`${selectedInsideColorId}`].base.ImageLarge2;

        if (insideColorData && selectedInsideColorId && imageLarge) {
            return `${apiUrl}${imageLarge}`
        }
    }, [customizeData, selectedInsideColorId, apiUrl]);

    const imageMetalStrapsSrc = useMemo(() => {
        const metalStrapsData = customizeData?.metalStraps;

        const position = metalStrapsData?.[`${selectedMetalStrapsId}`].position;
        const positionExterior = {
            x1: metalStrapsData?.[`${selectedMetalStrapsId}`].imagesext.x1,
            y1: metalStrapsData?.[`${selectedMetalStrapsId}`].imagesext.y1
        };

        const width = metalStrapsData?.[`${selectedMetalStrapsId}`].base.width1;
        const height = metalStrapsData?.[`${selectedMetalStrapsId}`].base.height1;
        const widthExterior = metalStrapsData?.[`${selectedMetalStrapsId}`].imagesext.width1;
        const heightExterior = metalStrapsData?.[`${selectedMetalStrapsId}`].imagesext.height1;

        const imageLarge = metalStrapsData?.[`${selectedMetalStrapsId}`].base.ImageLarge2;
        const imageLargeExterior = metalStrapsData?.[`${selectedMetalStrapsId}`].imagesext.objectimage2;

        if (metalStrapsData && selectedMetalStrapsId && imageLarge && imageLargeExterior && position && positionExterior) {
            if (isExteriorBcg) {
                return [`${apiUrl}${imageLargeExterior}`, positionExterior, {
                    width: widthExterior,
                    height: heightExterior
                }]
            } else {
                return [`${apiUrl}${imageLarge}`, position, {width: width, height: height}]
            }
        }
    }, [customizeData, selectedMetalStrapsId, apiUrl, isExteriorBcg]);

    const imageHeatingOvenSrc = useMemo(() => {
        const heatingOvenData = customizeData?.heatingOven;
        const imageLarge = heatingOvenData?.[`${selectedHeatingOvenId}`].base.ImageLarge2;

        if (heatingOvenData && selectedHeatingOvenId && imageLarge) {
            return `${apiUrl}${imageLarge}`
        }
    }, [customizeData, selectedHeatingOvenId, apiUrl]);


    const imageCoverSrc = useMemo(() => {
        const coverData = customizeData?.cover;
        const position = coverData?.[`${selectedCoverId}`].position;
        const width = coverData?.[`${selectedCoverId}`].base.width1;
        const height = coverData?.[`${selectedCoverId}`].base.height1;
        const imageLarge = coverData?.[`${selectedCoverId}`].base.ImageLarge2;
        if (coverData && selectedCoverId && imageLarge && position && width && height) {
            return [`${apiUrl}${imageLarge}`, position, {width: width, height: height}];
        }
    }, [customizeData, selectedCoverId, apiUrl]);


    const imageTubeExtensionSrc = useMemo(() => {
        const tubeExtensionData = customizeData?.tubeExtension;

        if (tubeExtensionData && selectedTubeExtensionId) {
            const imageLarge = tubeExtensionData?.[`${selectedTubeExtensionId}`].base.imageLarge2;
            const imageLargeExterior = tubeExtensionData?.[`${selectedTubeExtensionId}`].imagesext.objectimage2;

            if (isExteriorBcg && imageLargeExterior) {
                return `${apiUrl}${imageLargeExterior}`
            } else if (imageLarge) {
                return `${apiUrl}${imageLarge}`
            }

        }
    }, [customizeData, selectedTubeExtensionId, apiUrl, isExteriorBcg]);

    const bcgExteriorImage2 = useMemo(() => {
        const exteriorImages = rootData?.exteriorImages;
        if (exteriorImages) {
            const imageLarge = exteriorImages?.exterior2;
            if (imageLarge && isExteriorBcg) {
                return `${apiUrl}${imageLarge}`
            }
        }

    }, [isExteriorBcg, apiUrl, rootData])


    const offsetYToCalcHeight = (stageHeight) => {
        if (stageHeight >= 750 && stageHeight < 900) {
            return 220
        } else if (stageHeight >= 900 && stageHeight < 1000) {
            return 200
        } else if (stageHeight >= 1000 && stageHeight < 1200) {
            return 180
        } else if (stageHeight >= 1200 && stageHeight < 1400) {
            return 160
        } else if (stageHeight >= 1400 && stageHeight < 1600) {
            return 140
        }
    }

    const offsetMoveToWindow = -hotTubStageWidth / 6;
    const optionName = function (name) {
        return rootData?.descriptions[name]?.germanName;
    }

    return (
        <div className='HotTubCanvasSecondView'>
            <Stage width={hotTubStageWidth}
                   height={hotTubStageHeight}
                   offsetX={-hotTubStageWidth / 2}
                   offsetY={-hotTubStageHeight / 2}
            >
                <Layer ref={iconsRef}
                       opacity={isCustomizeOptionsOpen ? 1 : 0}
                       scaleX={calcHeight(1)}
                       scaleY={calcHeight(1)}
                       offsetX={offsetMoveToWindow}
                       offsetY={calcHeight(-offsetYToCalcHeight(hotTubStageHeight))}
                >
                    <Group>
                        {woodText?.length > 1 && <Text x={-225}
                                                       y={60}
                                                       fontFamily='Lato_400'
                                                       fontSize={16}
                                                       text={woodText}
                                                       fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={-220}
                                            y={80}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setWoodText(optionName('wood'))}
                                            onMouseOut={() => setWoodText('')}
                                            onClick={() => setOpenTab('Wood')}
                                            src={doneIcon}

                        />
                        }
                    </Group>
                    <Group>
                        {insideColorText?.length > 1 && <Text x={-350}
                                                              y={-125}
                                                              fontFamily='Lato_400'
                                                              fontSize={16}
                                                              text={insideColorText}
                                                              fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={-330}
                                            y={-105}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setInsideColorText(optionName('insideColor'))}
                                            onMouseOut={() => setInsideColorText('')}
                                            onClick={() => setOpenTab('Inside color')}
                                            src={doneIcon}

                        />
                        }
                    </Group>
                    <Group>
                        {coverText?.length > 1 && <Text x={-135}
                                                        y={-135}
                                                        fontFamily='Lato_400'
                                                        fontSize={16}
                                                        text={coverText}
                                                        fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={-130}
                                            y={-115}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setCoverText(optionName('cover'))}
                                            onMouseOut={() => setCoverText('')}
                                            onClick={() => setOpenTab('Cover')}
                                            src={+selectedCoverId === 80580 ? plusIcon : doneIcon}

                        />
                        }
                    </Group>
                    <Group>
                        {metalStrapsText?.length > 1 && <Text x={-325}
                                                              y={-40}
                                                              fontFamily='Lato_400'
                                                              fontSize={16}
                                                              text={metalStrapsText}
                                                              fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={-300}
                                            y={-23}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setMetalStrapsText(optionName('metalStraps'))}
                                            onMouseOut={() => setMetalStrapsText('')}
                                            onClick={() => setOpenTab('Metal Straps')}
                                            src={+selectedMetalStrapsId === 80513 ? plusIcon : doneIcon}

                        />
                        }
                    </Group>

                    <Group>
                        {tubeExtensionText?.length > 1 && <Text x={240}
                                                                y={150}
                                                                fontFamily='Lato_400'
                                                                fontSize={16}
                                                                text={tubeExtensionText}
                                                                fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={275}
                                            y={170}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setTubeExtensionText(optionName('tubeExtension'))}
                                            onMouseOut={() => setTubeExtensionText('')}
                                            onClick={() => setOpenTab('Tube extension')}
                                            src={+selectedTubeExtensionId !== 80527 ? plusIcon : doneIcon}

                        />
                        }
                    </Group>
                    <Group>
                        {additionalAccessoriesText?.length > 1 && <Text x={-450}
                                                                        y={0}
                                                                        fontFamily='Lato_400'
                                                                        fontSize={16}
                                                                        text={additionalAccessoriesText}
                                                                        fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={-390}
                                            y={20}
                                            width={30}
                                            height={30}
                                            onMouseOver={() =>setAdditionalAccessoriesText(optionName('additionalAccessoires'))}
                                            onMouseOut={() => setAdditionalAccessoriesText('')}
                                            onClick={() => setOpenTab('Additional Accessoires')}
                                            src={+selectedAdditionalAccessoriesIds.includes(80523) ? plusIcon : doneIcon}

                        />
                        }
                    </Group>

                </Layer>
                <Layer ref={accessoriesRef}
                       scaleX={calcHeight(1)}
                       scaleY={calcHeight(1)}
                       offsetX={offsetMoveToWindow}
                       offsetY={calcHeight(-offsetYToCalcHeight(hotTubStageHeight))}
                >
                    {imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map((item, index) => {
                        return <Image key={index}
                                      x={+item.position.x1 && +item.position.x1}
                                      y={+item.position.y1 && +item.position.y1}
                                      width={+item.width && +item.width}
                                      height={+item.height && +item.height}
                                      src={item.image && item.image}
                        />
                    })}
                    <Group>
                        {imageTubeExtensionSrc && <Image x={-900}
                                                         y={-520}
                                                         width={1250}
                                                         height={850}
                                                         src={imageTubeExtensionSrc}
                        />
                        }
                    </Group>

                </Layer>
                <Layer scaleX={isExteriorBcg ? 1 : calcHeight(1)}
                       scaleY={isExteriorBcg ? 1 : calcHeight(1)}
                >
                    {!isExteriorBcg && <Image x={-830}
                                              y={-753}
                                              width={1350}
                                              height={1100}
                                              src={bcgImagePositionTwo}
                                              opacity={isExteriorBcg ? 0 : 1}
                                              offsetX={offsetMoveToWindow}
                                              offsetY={calcHeight(-offsetYToCalcHeight(hotTubStageHeight))}
                    />}
                    {(bcgExteriorImage2 && isExteriorBcg) && <Image x={-hotTubStageWidth / 2}
                                                                    y={-hotTubStageHeight / 2}
                                                                    width={hotTubStageWidth}
                                                                    height={hotTubStageHeight}
                                                                    src={bcgExteriorImage2}/>
                    }
                </Layer>
                <Layer scaleX={calcHeight(1)}
                       scaleY={calcHeight(1)}
                       offsetX={offsetMoveToWindow}
                       offsetY={calcHeight(-offsetYToCalcHeight(hotTubStageHeight))}
                >

                    {imageHeatingOvenSrc && <Image x={-830}
                                                   y={-468}
                                                   width={950}
                                                   height={750}
                                                   src={imageHeatingOvenSrc}
                                                   opacity={isExteriorBcg ? 0 : 1}
                    />
                    }


                    {imageBasicPositionTwo && <Image x={-850}
                                                     y={-530}
                                                     width={1380}
                                                     height={850}
                                                     src={imageBasicPositionTwo}
                                                     opacity={isExteriorBcg ? 1 : 0}
                    />
                    }

                    {imageWoodSrc && <Image x={-584}
                                            y={-460}
                                            width={820}
                                            height={650}
                                            src={imageWoodSrc}
                    />
                    }

                    {imageMetalStrapsSrc && <Image x={+imageMetalStrapsSrc?.[1].x1}
                                                   y={+imageMetalStrapsSrc?.[1].y1}
                                                   width={+imageMetalStrapsSrc?.[2].width}
                                                   height={+imageMetalStrapsSrc?.[2].height}
                                                   src={imageMetalStrapsSrc[0]}
                    />
                    }
                    {imageInsideColorSrc && <Image x={-580}
                                                   y={-510}
                                                   width={710}
                                                   height={800}
                                                   src={imageInsideColorSrc}
                    />
                    }

                    {imageCoverSrc && <Image x={+imageCoverSrc?.[1].x1}
                                             y={+imageCoverSrc?.[1].y1}
                                             width={+imageCoverSrc?.[2].width}
                                             height={+imageCoverSrc?.[2].height}
                                             src={imageCoverSrc[0]}
                                             opacity={coverOptionOpacity ? 1 : 0}
                    />
                    }
                </Layer>
            </Stage>

        </div>
    )

}

export default HotTubCanvasSecondView;
