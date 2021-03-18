import {useMemo, useEffect} from 'react';
import './style.css';
import * as accounting from "accounting-js";
import {useDispatch, useSelector} from "react-redux";
import {getCartData, generatePdfLink} from "../../actions/hotTub";

const cartUrl = process.env.REACT_APP_CART_URL;

const TotalAmountCard = (props) => {

    const {
        customizeData,
        selectedSizeId,
        selectedAdditionalAccessoriesIds,
        selectedCoverId,
        selectedDeliveryId,
        selectedHeatingOvenId,
        selectedInsideColorId,
        selectedLedId,
        selectedMassageFunctionId,
        selectedMetalStrapsId,
        selectedSpruceColorId,
        selectedTubeExtensionId,
        selectedWarmingId,
        selectedWoodId,
        setHotTubPositionView
    } = props;

    const dispatch = useDispatch();
    const isLoadingPgfGenerator = useSelector(state => state.hotTub.isLoadingPgfGenerator);
    const cartData = useSelector(state => state.hotTub.cart);
    useEffect(() => {
        generateDynForm(cartData, cartUrl);
    }, [cartData]);

    const generateImage = () => {
        let canvases = document.getElementsByTagName('canvas');
        let combined = document.getElementById("CursorLayer");
        if (!combined) {
            combined = document.createElement('canvas');
            combined.id = "CursorLayer";
            combined.width = canvases[0].width;
            combined.height = canvases[0].height;
            combined.style.display = 'none';
            combined.crossOrigin = "anonymous";
            combined.style.position = "absolute";
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(combined);
        }

        let ctx = combined.getContext("2d");

        for (let i = 1; i < canvases.length; i++) {
            ctx.drawImage(canvases[i], 0, 0); //Copying Canvas1
        }

        return combined.toDataURL("image/png");
    }

    const generateDynForm = (data, sendTo) => {
        if(data) {
            var f = document.createElement("form");
            f.setAttribute('style', "display:none");
            f.setAttribute('method', "post");
            f.setAttribute('action', sendTo);
            for (let z in data) {
                let item = data[z];
                var i = document.createElement("input"); //input element, text
                i.setAttribute('type', "text");
                i.setAttribute('name', item.name);
                i.setAttribute('value', item.value);
                f.appendChild(i);
            }

            document.getElementsByTagName('body')[0].appendChild(f);
            f.submit();
        }
    }

    const callToCart = () => {
        dispatch(getCartData());
    }

    let callGenerate = () => {

        let images = [];
        const positions = ['positionOne', 'positionTwo', 'positionThree', 'positionFor']
        for (let i in positions) {
            setHotTubPositionView(positions[i]);
            images.push(generateImage())
        }

        dispatch(generatePdfLink(images));
    };

    const totalPrice = useMemo(() => {
        let allSelectedIds = [];
        let selectedIds = [
            selectedSizeId,
            selectedCoverId,
            selectedDeliveryId,
            selectedHeatingOvenId,
            selectedInsideColorId,
            selectedLedId,
            selectedMassageFunctionId,
            selectedMetalStrapsId,
            selectedSpruceColorId,
            selectedTubeExtensionId,
            selectedWarmingId,
            selectedWoodId
        ];

        if (selectedAdditionalAccessoriesIds?.length >= 1) {
            allSelectedIds = selectedIds.concat(selectedAdditionalAccessoriesIds);
        } else {
            allSelectedIds = selectedIds;
        }

        if (allSelectedIds?.length >= 1 && customizeData) {
            let totalPrice = 0;
            allSelectedIds.forEach((id) => {
                Object.values(customizeData).forEach((dataItem) => {
                    if (Object.keys(dataItem)?.length >= 1) {
                        let currentId = Object.keys(dataItem).filter(itemId => +itemId === +id ? String(id) : '');
                        let value;

                        if(selectedSizeId==80530){
                            value = currentId?.length >= 1 && dataItem?.[`${currentId}`].base?.priceBig?.realValue;
                        }else {
                            value = currentId?.length >= 1 && dataItem?.[`${currentId}`].base.price.realValue;
                        }
                        if (value) {
                            totalPrice = totalPrice + accounting.unformat(`€ ${value}`)
                        }
                    }
                })
            })
            return accounting.formatNumber(totalPrice);
        }

    }, [
        selectedAdditionalAccessoriesIds, customizeData, selectedSizeId,
        selectedCoverId, selectedDeliveryId, selectedHeatingOvenId,
        selectedInsideColorId, selectedLedId, selectedMassageFunctionId,
        selectedMetalStrapsId, selectedSpruceColorId, selectedTubeExtensionId, selectedWarmingId,
        selectedWoodId
    ])

    return (
        <div className="TotalAmountCard">
            <div className="TotalAmountCard-title">
                <p className="TotalAmountCard-title-amount">Gesamtsumme</p>
                <p className="TotalAmountCard-title-price">{totalPrice && `€ ${totalPrice}`}</p>
            </div>
            <p>Versandbereit in 8-10 Wochen</p>
            <button onClick={() => callToCart()}>in den Warenkorb</button>
            <p className='TotalAmountCard-pdfTextDownload'
               onClick={() => callGenerate()}
            >{isLoadingPgfGenerator ? 'Wird geladen ...' : 'Konfiguration als PDF herunterladen'}</p>
        </div>
    )
}

export default TotalAmountCard;
