import {Fragment, useEffect} from 'react';
import CustomizeOptionContainer from "../CustomizeOptionContainer";
import "./style.css";
import {useDispatch, useSelector} from "react-redux";
import {
    setSelectedAdditionalAccessoriesId,
    setSelectedCoverId, setSelectedDeliveryId, setSelectedHeatingOvenId,
    setSelectedInsideColorId, setSelectedLedId, setSelectedMassageFunctionId, setSelectedMetalStrapsId,
    setSelectedSizeId,
    setSelectedSpruceColorId, setSelectedTubeExtensionId, setSelectedWarmingId,
    setSelectedWoodId
} from "../../actions/hotTub";
import customizeMenu from "./menuHelper";
import ColorsOption from "../ColorsOption";
import SizeOption from "../SizeOption";
import TotalAmountCard from "../TotalAmountCard";


const HotTubCustomize = (props) => {

    const {customizeData, openTab, setOpenTab, rootData, setHotTubPositionView} = props;

    const dispatch = useDispatch();

    const isLoadingData = useSelector(state => state.hotTub.isLoadingData);
    const selectedSizeId = useSelector(state => state.hotTub.selectedSizeId);
    const selectedWoodId = useSelector(state => state.hotTub.selectedWoodId);
    const selectedSpruceColorId = useSelector(state => state.hotTub.selectedSpruceColorId);
    const selectedInsideColorId = useSelector(state => state.hotTub.selectedInsideColorId);
    const selectedCoverId = useSelector(state => state.hotTub.selectedCoverId);
    const selectedMetalStrapsId = useSelector(state => state.hotTub.selectedMetalStrapsId);
    const selectedMassageFunctionId = useSelector(state => state.hotTub.selectedMassageFunctionId);
    const selectedLedId = useSelector(state => state.hotTub.selectedLedId);
    const selectedWarmingId = useSelector(state => state.hotTub.selectedWarmingId);
    const selectedHeatingOvenId = useSelector(state => state.hotTub.selectedHeatingOvenId);
    const selectedAdditionalAccessoriesIds = useSelector(state => state.hotTub.selectedAdditionalAccessoriesIds);
    const selectedTubeExtensionId = useSelector(state => state.hotTub.selectedTubeExtensionId);
    const selectedDeliveryId = useSelector(state => state.hotTub.selectedDeliveryId);


    useEffect(() => {
        document.getElementById('HotTubCustomize').scroll({
            bottom: 100,
            left: 0,
            behavior: 'smooth'
        })
    }, [openTab])

    const loadCurrentContentForOption = (mainOption) => {
        switch (mainOption) {
            case 'Wood':
                return <ColorsOption optionData={customizeData?.wood}
                                     selectedId={selectedWoodId}
                                     setSelectedId={setSelectedWoodId}
                                     setSelectedSpruceColorId={setSelectedSpruceColorId}
                                     option='Wood'
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions?.wood}
                                     openTab={openTab}
                                     dispatch={dispatch}
                />
            case 'Spruce color':
                return <ColorsOption optionData={customizeData?.spruceColor}
                                     selectedId={selectedSpruceColorId}
                                     setSelectedId={setSelectedSpruceColorId}
                                     option='Spruce color'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.spruceColor}
                                     openTab={openTab}
                />
            case 'Inside color':
                return <ColorsOption optionData={customizeData?.insideColor}
                                     selectedId={selectedInsideColorId}
                                     setSelectedId={setSelectedInsideColorId}
                                     option='Inside color'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.insideColor}
                                     openTab={openTab}
                />
            case 'Cover':
                return <ColorsOption optionData={customizeData?.cover}
                                     selectedId={selectedCoverId}
                                     setSelectedId={setSelectedCoverId}
                                     option='Cover'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.cover}
                                     openTab={openTab}
                />
            case 'Metal Straps':
                return <ColorsOption optionData={customizeData?.metalStraps}
                                     selectedId={selectedMetalStrapsId}
                                     setSelectedId={setSelectedMetalStrapsId}
                                     additionalClass={'without-image'}
                                     option='Metal Straps'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.metalStraps}
                                     openTab={openTab}
                />
            case 'Massage Function':
                return <ColorsOption optionData={customizeData?.massageFunction}
                                     selectedId={selectedMassageFunctionId}
                                     setSelectedId={setSelectedMassageFunctionId}
                                     additionalClass={'without-image'}
                                     option='Massage Function'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.massageFunction}
                                     openTab={openTab}
                />
            case 'LED':
                return <ColorsOption optionData={customizeData?.led}
                                     selectedId={selectedLedId}
                                     setSelectedId={setSelectedLedId}
                                     additionalClass={'without-image'}
                                     option='LED'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.led}
                                     openTab={openTab}
                />
            case 'Warming':
                return <ColorsOption optionData={customizeData?.warming}
                                     selectedId={selectedWarmingId}
                                     setSelectedId={setSelectedWarmingId}
                                     additionalClass={'without-image'}
                                     option='Warming'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.warming}
                                     openTab={openTab}
                />
            case 'Heating oven':
                return <ColorsOption optionData={customizeData?.heatingOven}
                                     selectedId={selectedHeatingOvenId}
                                     setSelectedId={setSelectedHeatingOvenId}
                                     option='Heating oven'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.heatingOven}
                                     openTab={openTab}
                />
            case 'Additional Accessoires':
                return <ColorsOption optionData={customizeData?.additionalAccessories}
                                     selectedId={selectedAdditionalAccessoriesIds}
                                     setSelectedId={setSelectedAdditionalAccessoriesId}
                                     additionalClass={'without-image'}
                                     option='Additional Accessoires'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.additionalAccessories}
                                     multi
                                     openTab={openTab}
                />
            case 'Tube extension':
                return <ColorsOption optionData={customizeData?.tubeExtension}
                                     selectedId={selectedTubeExtensionId}
                                     setSelectedId={setSelectedTubeExtensionId}
                                     additionalClass={'without-image'}
                                     option='Tube extension'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.tubeExtension}
                                     openTab={openTab}
                />
            case 'Delivery':
                return <ColorsOption optionData={customizeData?.delivery}
                                     selectedId={selectedDeliveryId}
                                     setSelectedId={setSelectedDeliveryId}
                                     additionalClass={'without-image'}
                                     option='Delivery'
                                     dispatch={dispatch}
                                     dataTooltip={rootData?.descriptions && rootData?.descriptions.delivery}
                                     openTab={openTab}
                />
            default:
                return null
        }
    }

    return (
        <div className='HotTubCustomize' id='HotTubCustomize'>   {/*classForCustomize*/}
            <p className="HotTubCustomize-title">Passen Sie Ihren Whirlpool an</p>
            {isLoadingData ? <p>Loading...</p> :
                <Fragment>
                    <SizeOption sizeData={customizeData?.sizes}
                                setSelectedSizeId={setSelectedSizeId}
                                selectedSizeId={selectedSizeId}
                                dispatch={dispatch}
                    />

                    {customizeMenu.map((item, index) => {
                        const isDisabled = (customizeData?.wood?.[`${selectedWoodId}`]._main.Name !== 'Spruce') && item.option === 'Spruce color';
                        let showName;

                        if (rootData.descriptions) {
                            const referencerName=rootData.descriptions?.[`${item.referencer}`];
                            showName=(referencerName?.germanName);
                        }

                        return <CustomizeOptionContainer key={index}
                                                         option={item.option}
                                                         setOpenTab={setOpenTab}
                                                         content={loadCurrentContentForOption(item.option)}
                                                         optional={item.optional}
                                                         isOpen={openTab === item.option}
                                                         openTab={openTab}
                                                         showName={showName}
                                                         isDisabled={isDisabled}
                        />
                    })}
                    <TotalAmountCard customizeData={ customizeData }
                                     selectedSizeId={ selectedSizeId }
                                     selectedWoodId={ selectedWoodId }
                                     selectedSpruceColorId={ selectedSpruceColorId }
                                     selectedInsideColorId={ selectedInsideColorId }
                                     selectedCoverId={ selectedCoverId }
                                     selectedMetalStrapsId={ selectedMetalStrapsId }
                                     selectedMassageFunctionId={ selectedMassageFunctionId }
                                     selectedLedId={ selectedLedId }
                                     selectedWarmingId={ selectedWarmingId }
                                     selectedHeatingOvenId={ selectedHeatingOvenId }
                                     selectedAdditionalAccessoriesIds={ selectedAdditionalAccessoriesIds }
                                     selectedTubeExtensionId={ selectedTubeExtensionId }
                                     selectedDeliveryId={ selectedDeliveryId }
                                     setHotTubPositionView={ setHotTubPositionView }
                    />
                </Fragment>
            }

        </div>
    )
}


export default HotTubCustomize;