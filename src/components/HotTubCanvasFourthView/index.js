import {Group, Layer, Stage, Text} from "react-konva";
import Image from "../Image/Image";
import {useMemo, useRef, useEffect, useState} from "react";
import imageBasicPositionFour
    from '../../assets/images/hintergrund-180-metall-und-schatten-02_0000_180er-metal-und-schatten-02.png';
import plusIcon from "../../assets/images/icon-svg.svg";
import doneIcon from '../../assets/images/icon-done.svg';
import {useKunakovHeight} from "../customHooks/useKunakovHeight";


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
        isCustomizeOptionsOpen, isCustomizeOptionsWater,
        selectedMassageFunctionId,
        coverOptionOpacity
    } = props;

    const apiUrl = process.env.REACT_APP_HOST_API_URL;

    const [calcHeight] = useKunakovHeight(hotTubStageHeight);

    const accessoriesRef = useRef(null);
    const iconsRef = useRef(null);
    const bcgRefImageLayer = useRef(null);
    const massageRef = useRef(null);

    const [woodText, setWoodText] = useState('');
    const [insideColorText, setInsideColorText] = useState('');
    const [coverText, setCoverText] = useState('');
    const [tubeExtensionText, setTubeExtensionText] = useState('');
    const [additionalAccessoriesText, setAdditionalAccessoriesText] = useState('');

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
    }, [iconsRef, accessoriesRef]);

    const imageAdditionalAccessoriesSrc = useMemo(() => {
        const additionalAccessoriesData = customizeData?.additionalAccessories;
        const woodData = customizeData?.wood;
        const spruceColorData = customizeData?.spruceColor;
        if (additionalAccessoriesData && selectedAdditionalAccessoriesIds) {
            let arr = [];
            selectedAdditionalAccessoriesIds.forEach(id => {
                const position = additionalAccessoriesData?.[`${id}`].position;
                const width = additionalAccessoriesData?.[`${id}`].base.width3;
                const height = additionalAccessoriesData?.[`${id}`].base.height3;

                const positionExterior = {
                    x3: additionalAccessoriesData?.['80574'].imagesext.x3,
                    y3: additionalAccessoriesData?.['80574'].imagesext.y3
                };
                const widthExterior = additionalAccessoriesData?.['80574'].imagesext.width3;
                const heightExterior = additionalAccessoriesData?.['80574'].imagesext.height3;
                const imageLargeExterior = additionalAccessoriesData?.['80574'].imagesext.objectimage4;

                let imageLarge = '';
                if (+id === 80576) {
                    if (woodData?.[`${selectedWoodId}`]._main.Name === 'Spruce') {
                        imageLarge = spruceColorData?.[`${selectedSpruceColorId}`].base.boxImage3;
                    } else {
                        imageLarge = woodData?.[`${selectedWoodId}`].base.boxImage3;
                    }
                } else {
                    imageLarge = additionalAccessoriesData?.[`${id}`].base.imageLarge4;
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
            imageLarge = spruceColorData?.[`${selectedSpruceColorId}`].base.imageLarge4;
        } else {
            imageLarge = woodData?.[`${selectedWoodId}`].base.imageLarge4;
        }

        if (woodData && spruceColorData && selectedWoodId && imageLarge) {
            return `${apiUrl}${imageLarge}`
        }
    }, [customizeData, selectedWoodId, selectedSpruceColorId, apiUrl]);


    const imageInsideColorSrc = useMemo(() => {
        const insideColorData = customizeData?.insideColor;
        const imageLarge = insideColorData?.[`${selectedInsideColorId}`].base.imageLarge4;

        if (insideColorData && selectedInsideColorId && imageLarge) {
            return `${apiUrl}${imageLarge}`
        }
    }, [customizeData, selectedInsideColorId, apiUrl]);


    const imageMassageFunctionSrc = useMemo(() => {
        const massageFunctionData = customizeData?.massageFunction;

        let insideSrc, imageSrc;

        if (!isCustomizeOptionsWater) {
            insideSrc = 'base';
            imageSrc = 'imageLarge4';
        } else {
            insideSrc = 'waterPictures';
            imageSrc = 'image4';
        }

        const imageLarge = massageFunctionData?.[`${selectedMassageFunctionId}`][insideSrc][imageSrc];
        const width = massageFunctionData?.[`${selectedMassageFunctionId}`][insideSrc].width3;
        const height = massageFunctionData?.[`${selectedMassageFunctionId}`][insideSrc].height3;
        const position = massageFunctionData?.[`${selectedMassageFunctionId}`].position;


        if (massageFunctionData && selectedMassageFunctionId && imageLarge && position && height && width) {
            console.log(imageLarge);
            return [`${apiUrl}${imageLarge}`, position, {width: width, height: height}];
        }
    }, [customizeData, selectedMassageFunctionId, apiUrl, isCustomizeOptionsWater]);


    const imageHeatingOvenSrc = useMemo(() => {
        const heatingOvenData = customizeData?.heatingOven;
        const imageLarge = heatingOvenData?.[`${selectedHeatingOvenId}`].base.imageLarge4;

        if (heatingOvenData && selectedHeatingOvenId && imageLarge) {
            return `${apiUrl}${imageLarge}`
        }
    }, [customizeData, selectedHeatingOvenId, apiUrl]);


    const imageCoverSrc = useMemo(() => {
        const coverData = customizeData?.cover;
        const position = coverData?.[`${selectedCoverId}`].position;
        const width = coverData?.[`${selectedCoverId}`].base.width3;
        const height = coverData?.[`${selectedCoverId}`].base.height3;
        const imageLarge = coverData?.[`${selectedCoverId}`].base.imageLarge4;
        if (coverData && selectedCoverId && imageLarge && position && width && height) {
            return [`${apiUrl}${imageLarge}`, position, {width: width, height: height}];
        }
    }, [customizeData, selectedCoverId, apiUrl]);


    const imageTubeExtensionSrc = useMemo(() => {
        const tubeExtensionData = customizeData?.tubeExtension;

        if (tubeExtensionData && selectedTubeExtensionId) {
            const imageLarge = tubeExtensionData?.[`${selectedTubeExtensionId}`].base.imageLarge4;
            const imageLargeExterior = tubeExtensionData?.[`${selectedTubeExtensionId}`].imagesext.objectimage4;

            if (isExteriorBcg && imageLargeExterior) {
                return `${apiUrl}${imageLargeExterior}`
            } else if (imageLarge) {
                return `${apiUrl}${imageLarge}`
            }

        }
    }, [customizeData, selectedTubeExtensionId, apiUrl, isExteriorBcg]);

    const bcgExteriorImage4 = useMemo(() => {
        const exteriorImages = rootData?.exteriorImages;

        if (exteriorImages) {
            const imageLarge = exteriorImages?.exterior4;
            if (imageLarge && isExteriorBcg) {
                return `${apiUrl}${imageLarge}`
            }
        }

    }, [isExteriorBcg, apiUrl, rootData])


    return (
        <div className='HotTubCanvasFourthView'>
            <Stage width={hotTubStageWidth}
                   height={hotTubStageHeight}
                   offsetX={-hotTubStageWidth / 2}
                   offsetY={-hotTubStageHeight / 2}
            >
                {console.log(imageMassageFunctionSrc)}
                <Layer ref={massageRef}
                       scaleX={calcHeight(1)}
                       scaleY={calcHeight(1)}
                       offsetX={0}
                       offsetY={calcHeight(-250)}
                >
                    {imageMassageFunctionSrc && <Image x={+imageMassageFunctionSrc?.[1].x3}
                                                       y={+imageMassageFunctionSrc?.[1].y3}
                                                       width={+imageMassageFunctionSrc[2].width}
                                                       height={+imageMassageFunctionSrc[2].height}
                                                       src={imageMassageFunctionSrc?.[0]}
                                                       opacity={selectedCoverId !== 80580 && coverOptionOpacity ? 0 : 1}
                    />
                    }
                </Layer>
                <Layer scaleX={calcHeight(1)}
                       scaleY={calcHeight(1)}
                       ref={iconsRef}
                       opacity={isCustomizeOptionsOpen ? 1 : 0}
                       offsetX={0}
                       offsetY={calcHeight(-250)}
                >
                    <Group>
                        {woodText?.length > 1 && <Text x={65}
                                                       y={-350}
                                                       fontFamily='Lato_400'
                                                       fontSize={16}
                                                       text={woodText}
                                                       fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={70}
                                            y={-330}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setWoodText('Wood')}
                                            onMouseOut={() => setWoodText('')}
                                            onClick={() => setOpenTab('Wood')}
                                            src={doneIcon}

                        />
                        }
                    </Group>
                    <Group>
                        {insideColorText?.length > 1 && <Text x={-380}
                                                              y={-410}
                                                              fontFamily='Lato_400'
                                                              fontSize={16}
                                                              text={insideColorText}
                                                              fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={-360}
                                            y={-390}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setInsideColorText('Inside color')}
                                            onMouseOut={() => setInsideColorText('')}
                                            onClick={() => setOpenTab('Inside color')}
                                            src={doneIcon}

                        />
                        }
                    </Group>
                    <Group>
                        {coverText?.length > 1 && <Text x={-175}
                                                        y={-280}
                                                        fontFamily='Lato_400'
                                                        fontSize={16}
                                                        text={coverText}
                                                        fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={-170}
                                            y={-260}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setCoverText('Cover')}
                                            onMouseOut={() => setCoverText('')}
                                            onClick={() => setOpenTab('Cover')}
                                            src={+selectedCoverId === 80580 ? plusIcon : doneIcon}

                        />
                        }
                    </Group>


                    <Group>
                        {tubeExtensionText?.length > 1 && <Text x={180}
                                                                y={-160}
                                                                fontFamily='Lato_400'
                                                                fontSize={16}
                                                                text={tubeExtensionText}
                                                                fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={210}
                                            y={-140}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setTubeExtensionText('Tube extension ')}
                                            onMouseOut={() => setTubeExtensionText('')}
                                            onClick={() => setOpenTab('Tube extension')}
                                            src={+selectedTubeExtensionId !== 80527 ? plusIcon : doneIcon}

                        />
                        }
                    </Group>
                    <Group>
                        {additionalAccessoriesText?.length > 1 && <Text x={-500}
                                                                        y={-230}
                                                                        fontFamily='Lato_400'
                                                                        fontSize={16}
                                                                        text={additionalAccessoriesText}
                                                                        fill={'black'}
                        />
                        }

                        {plusIcon && <Image x={-445}
                                            y={-210}
                                            width={30}
                                            height={30}
                                            onMouseOver={() => setAdditionalAccessoriesText('Additional accessories ')}
                                            onMouseOut={() => setAdditionalAccessoriesText('')}
                                            onClick={() => setOpenTab('Additional Accessoires')}
                                            src={+selectedAdditionalAccessoriesIds.includes(80523) ? plusIcon : doneIcon}

                        />
                        }
                    </Group>

                </Layer>
                <Layer scaleX={calcHeight(1)}
                       scaleY={calcHeight(1)}
                       offsetX={0}
                       offsetY={calcHeight(-250)}
                >
                    {imageAdditionalAccessoriesSrc?.length >= 1 && imageAdditionalAccessoriesSrc.map((item, index) => {
                        return <Image key={index}
                                      x={+item.position.x3 && +item.position.x3}
                                      y={+item.position.y3 && +item.position.y3}
                                      width={+item.width && +item.width}
                                      height={+item.height && +item.height}
                                      src={item.image && item.image}
                        />
                    })}
                    <Group>
                        {imageTubeExtensionSrc && <Image x={-730}
                                                         y={-570}
                                                         width={1000}
                                                         height={700}
                                                         src={imageTubeExtensionSrc}
                        />
                        }
                    </Group>

                </Layer>
                <Layer scaleX={1}
                       scaleY={1}
                       ref={bcgRefImageLayer}
                >
                    {(bcgExteriorImage4 && isExteriorBcg) && <Image x={-hotTubStageWidth / 2}
                                                                    y={-hotTubStageHeight / 2}
                                                                    width={hotTubStageWidth}
                                                                    height={hotTubStageHeight}
                                                                    src={bcgExteriorImage4}/>
                    }
                </Layer>
                <Layer scaleX={calcHeight(1)}
                       scaleY={calcHeight(1)}
                       offsetX={0}
                       offsetY={calcHeight(-250)}
                >

                    {imageHeatingOvenSrc && <Image x={-765}
                                                   y={-408}
                                                   width={860}
                                                   height={500}
                                                   src={imageHeatingOvenSrc}
                                                   opacity={isExteriorBcg ? 0 : 1}
                    />
                    }


                    {imageBasicPositionFour && <Image x={-770}
                                                      y={-550}
                                                      width={1150}
                                                      height={690}
                                                      src={imageBasicPositionFour}
                                                      opacity={isExteriorBcg ? 1 : 0}
                    />
                    }

                    {imageWoodSrc && <Image x={-545}
                                            y={-460}
                                            width={670}
                                            height={480}
                                            src={imageWoodSrc}
                    />
                    }

                    {imageInsideColorSrc && <Image x={-770}
                                                   y={-484}
                                                   width={850}
                                                   height={590}
                                                   src={imageInsideColorSrc}
                    />
                    }

                    {imageCoverSrc && <Image x={+imageCoverSrc?.[1].x3}
                                             y={+imageCoverSrc?.[1].y3}
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

export default HotTubCanvasFourthView;