import { useMemo } from 'react';
import './style.css';
import * as accounting from "accounting-js";
import { useDispatch, useSelector } from "react-redux";
import { generatePdfLink } from "../../actions/hotTub";


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
    selectedWoodId
  } = props;

  const dispatch = useDispatch();
  const isLoadingPgfGenerator = useSelector(state => state.hotTub.isLoadingPgfGenerator);

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
          if(Object.keys(dataItem)?.length >= 1){
            let currentId = Object.keys(dataItem).filter(itemId => +itemId === +id ? String(id) : '');
            let value = currentId?.length >= 1 && dataItem?.[`${ currentId }`].base.price.realValue;
            if(value){
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
        <p>Versandbereit in 2-3 Wochen</p>
        <button>in den Warenkorb</button>
        <p className='TotalAmountCard-pdfTextDownload'
           onClick={() => dispatch(generatePdfLink())}
        >{isLoadingPgfGenerator ? 'Wird geladen ...' : 'Konfiguration als PDF herunterladen' }</p>
      </div>
  )
}

export default TotalAmountCard;