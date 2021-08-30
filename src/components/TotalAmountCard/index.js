import { useMemo, useEffect } from 'react';
import './style.css';
import * as accounting from "accounting-js";
import { useDispatch, useSelector } from "react-redux";
import { getCartData, generatePdfLink } from "../../actions/hotTub";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";
import qs from "qs";
import { getBigSizeId } from "../helperForIds";


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
    setHotTubPositionView,
    setExteriorBcg
  } = props;

  const dispatch = useDispatch();
  const isLoadingPgfGenerator = useSelector(state => state.hotTub.isLoadingPgfGenerator);
  const selectedIdsWithAmount = useSelector(state => state.hotTub.selectedIdsWithAmount);
  const selectedPositioningIds = useSelector(state => state.hotTub.selectedPositioningIds);
  const selectedTypeId = useSelector(state => state.hotTub.selectedTypeId);
  const cartData = useSelector(state => state.hotTub.cart);

  useEffect(() => {
    generateDynForm(cartData, cartUrl);
  }, [cartData]);


  const trimCanvas = (c) => {
    var ctx = c.getContext('2d');
    var copy = document.createElement('canvas').getContext('2d'),
        pixels = ctx.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length,
        i,
        bound = {
          top: null,
          left: null,
          right: null,
          bottom: null
        },
        x, y;

    for (i = 0; i < l; i += 4) {
      if (pixels.data[i + 3] !== 0) {
        x = (i / 4) % c.width;
        y = ~~((i / 4) / c.width);

        if (bound.top === null) {
          bound.top = y;
        }

        if (bound.left === null) {
          bound.left = x;
        } else if (x < bound.left) {
          bound.left = x;
        }

        if (bound.right === null) {
          bound.right = x;
        } else if (bound.right < x) {
          bound.right = x;
        }

        if (bound.bottom === null) {
          bound.bottom = y;
        } else if (bound.bottom < y) {
          bound.bottom = y;
        }
      }
    }

    // Calculate the height and width of the content
    var trimHeight = bound.bottom - bound.top,
        trimWidth = bound.right - bound.left,
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    // Return trimmed canvas
    return copy.canvas;
  }


  const generateImage = () => {
    let canvases = document.getElementsByTagName('canvas');
    let combined = document.getElementById("CursorLayer");
    if (!combined) {
      combined = document.createElement('canvas');
      combined.id = "CursorLayer";
      combined.width = canvases?.[0]?.width;
      combined.height = canvases?.[0]?.height;
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
    let trimed = trimCanvas(combined);
    const dataText = trimed.toDataURL("image/png");
    ctx.clearRect(0, 0, combined.width, combined.height);
    return dataText;
  }

  const generateDynForm = (data, sendTo) => {
    if (data) {
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

  const delay = (delayInms) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

  let callGenerate = async () => {

    let images = [];
    const positions = ['positionOne', 'positionTwo', 'positionThree', 'positionFour'];
    setExteriorBcg(false);
    for (let i in positions) {
      setHotTubPositionView(positions[i]);
      await delay(800);
      images.push(generateImage());
    }
    setHotTubPositionView('positionOne');
    setExteriorBcg(true);
    dispatch(generatePdfLink(images));
  };


  const getAllSelectedIds = () => {
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
    return allSelectedIds;
  }

  const totalPrice = useMemo(() => {

    let allSelectedIds = getAllSelectedIds();
    const bigSizeId  = getBigSizeId(selectedTypeId);

    if (allSelectedIds?.length >= 1 && customizeData) {
      let totalPrice = 0;
      allSelectedIds.forEach((id) => {
        Object.values(customizeData).forEach((dataItem) => {
          if (Object.keys(dataItem)?.length >= 1) {

            let currentId = Object.keys(dataItem).filter(itemId => +itemId === +id ? String(id) : '');
            let value;
            let amount = 1;

            if (selectedIdsWithAmount?.[+currentId]) {
              amount = selectedIdsWithAmount?.[+currentId];
            }

            if (selectedSizeId == bigSizeId) {
              value = currentId?.length >= 1 && dataItem?.[`${ currentId }`].base?.priceBig?.realValue;
            } else {
              value = currentId?.length >= 1 && dataItem?.[`${ currentId }`].base.price.realValue;
            }
            if (value) {
              let unformatValue = accounting.unformat(`€ ${ value }`);
              totalPrice = totalPrice + unformatValue * amount;
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
    selectedWoodId, selectedIdsWithAmount
  ])


  const qsMediaStringUrl = useMemo(() => {
    let selectedIds = {
      type: selectedTypeId,
      size: selectedSizeId,
      wood: selectedWoodId,
      spruceColor: selectedSpruceColorId,
      insideColor: selectedInsideColorId,
      cover: selectedCoverId,
      metalStraps: selectedMetalStrapsId,
      massageFunction: selectedMassageFunctionId,
      led: selectedLedId,
      warming: selectedWarmingId,
      heatingOven: selectedHeatingOvenId,
      tubeExtension: selectedTubeExtensionId,
      delivery: selectedDeliveryId,
      additionalAccessories: selectedAdditionalAccessoriesIds,
      idsWithAmount: selectedIdsWithAmount,
      positioning: selectedPositioningIds
    };

    let string = qs.stringify(selectedIds);
    return `${process.env.REACT_APP_CONFIGURATOR_BASE_URL}?${string}`

  }, [
    selectedSizeId, selectedWoodId, selectedSpruceColorId, selectedTypeId,
    selectedInsideColorId, selectedCoverId, selectedMetalStrapsId,
    selectedMassageFunctionId, selectedLedId, selectedWarmingId,
    selectedHeatingOvenId, selectedTubeExtensionId, selectedDeliveryId,
    selectedAdditionalAccessoriesIds, selectedPositioningIds, selectedIdsWithAmount
  ]);


  return (
      <div className="TotalAmountCard">
        <div className="TotalAmountCard-title">
          <p className="TotalAmountCard-title-amount">Gesamtsumme</p>
          <p className="TotalAmountCard-title-price">{ totalPrice && `€ ${ totalPrice }` }</p>
        </div>
        <p>Versandbereit in 10-12 Wochen</p>
        <button onClick={ () => callToCart() }>in den Warenkorb</button>
        <p className='TotalAmountCard-pdfTextDownload'
           onClick={ () => callGenerate() }
        >{ isLoadingPgfGenerator ? 'Wird geladen ...' : 'Konfiguration als PDF herunterladen' }</p>
        <div className='TotalAmountCard-share'>
          <p>Teilen!</p>
          <FacebookShareButton className='TotalAmountCard-share-button'
                               url={qsMediaStringUrl}
                               children={ <FacebookIcon size={ 32 } round={ true }/> }
          />
          <WhatsappShareButton className='TotalAmountCard-share-button'
                               url={qsMediaStringUrl}
                               children={ <WhatsappIcon size={ 32 } round={ true }/> }
          />
          <TwitterShareButton className='TotalAmountCard-share-button'
                              url={qsMediaStringUrl}
                              children={ <TwitterIcon size={ 32 } round={ true }/> }
          />
          <EmailShareButton className='TotalAmountCard-share-button'
                            url={qsMediaStringUrl}
                            children={ <EmailIcon size={ 32 } round={ true }/> }
          />
          <LinkedinShareButton className='TotalAmountCard-share-button'
                               url={qsMediaStringUrl}
                               children={ <LinkedinIcon size={ 32 } round={ true }/> }
          />
          <TelegramShareButton className='TotalAmountCard-share-button'
                               url={qsMediaStringUrl}
                               children={ <TelegramIcon size={ 32 } round={ true }/> }
          />
        </div>


      </div>
  )
}

export default TotalAmountCard;
