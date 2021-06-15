import { hotTubAPI } from "../../api";
import qs from "qs";
import { getAddAccNoPriceId, getPreparationForSandFilterId, getSandFilterId } from "../../components/helperForIds";


export const ActionTypes = {
  GET_DATA: "HOT_TUB/GET_DATA",
  GET_DATA_SUCCESS: "HOT_TUB/GET_DATA_SUCCESS",
  GET_DATA_FAILURE: "HOT_TUB/GET_DATA_FAILURE",
  GET_ROOT_DATA: "HOT_TUB/GET_ROOT_DATA",
  GET_ROOT_DATA_SUCCESS: "HOT_TUB/GET_ROOT_DATA_SUCCESS",
  GET_ROOT_DATA_FAILURE: "HOT_TUB/GET_ROOT_DATA_FAILURE",
  SET_SELECTED_SIZE_ID: "HOT_TUB/SET_SELECTED_SIZE_ID",
  SET_SELECTED_WOOD_ID: "HOT_TUB/SET_SELECTED_WOOD_ID",
  SET_SELECTED_SPRUCE_COLOR_ID: "HOT_TUB/SET_SELECTED_SPRUCE_COLOR_ID",
  SET_SELECTED_INSIDE_COLOR_ID: "HOT_TUB/SET_SELECTED_INSIDE_COLOR_ID",
  SET_SELECTED_COVER_ID: "HOT_TUB/SET_SELECTED_COVER_ID",
  SET_SELECTED_METAL_STRAPS_ID: "HOT_TUB/SET_SELECTED_METAL_STRAPS_ID",
  SET_SELECTED_MASSAGE_FUNCTION_ID: "HOT_TUB/SET_SELECTED_MASSAGE_FUNCTION_ID",
  SET_SELECTED_LED_ID: "HOT_TUB/SET_SELECTED_LED_ID",
  SET_SELECTED_HEATING_OVEN_ID: "HOT_TUB/SET_SELECTED_HEATING_OVEN_ID",
  SET_SELECTED_ADDITIONAL_ACCESSORIES_ID: "HOT_TUB/SET_SELECTED_ADDITIONAL_ACCESSORIES_ID",
  SET_SELECTED_TUBE_EXTENSION_ID: "HOT_TUB/SET_SELECTED_TUBE_EXTENSION_ID",
  SET_SELECTED_DELIVERY_ID: "HOT_TUB/SET_SELECTED_DELIVERY_ID",
  SET_SELECTED_WARMING_ID: "HOT_TUB/SET_SELECTED_WARMING_ID",
  GENERATE_PGF: "HOT_TUB/GENERATE_PGF",
  GENERATE_PGF_SUCCESS: "HOT_TUB/GENERATE_PGF_SUCCESS",
  GENERATE_PGF_FAILURE: "HOT_TUB/GENERATE_PGF_FAILURE",
  GENERATE_CART: "HOT_TUB/GENERATE_CART",
  GENERATE_CART_SUCCESS: "HOT_TUB/GENERATE_CART_SUCCESS",
  GENERATE_CART_FAILURE: "HOT_TUB/GENERATE_CART_FAILURE",
  SET_SELECTED_IDS_WITH_AMOUNT: "HOT_TUB/SET_SELECTED_IDS_WITH_AMOUNT",
  SET_SELECTED_POSITIONING_IDS: "HOT_TUB/SET_SELECTED_POSITIONING_IDS",
  SET_SELECTED_OBJ_POSITIONING_IDS: "HOT_TUB/SET_SELECTED_OBJ_POSITIONING_IDS",
  SET_SELECTED_OBJ_IDS_WITH_AMOUNT: "HOT_TUB/SET_SELECTED_OBJ_IDS_WITH_AMOUNT",
  SET_SELECTED_TYPE_ID: "HOT_TUB/SET_SELECTED_TYPE_ID",
}


export const getCalcData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.GET_DATA });

    const typeId = getState().hotTub.selectedTypeId;

    let response = await hotTubAPI.getExternalCalcData(typeId);

    await dispatch(getRootData());
    if (response?.data && response?.status === 200) {
      if(window.location.search){
        let querySearchObj = qs.parse(window.location.search.replace('?', ''));
        await dispatch({
          type: ActionTypes.GET_DATA_SUCCESS,
          data: response.data.__,         // response.data.__
          selectedWoodId: +querySearchObj.wood,
          selectedSizeId: +querySearchObj.size,
          selectedSpruceColorId: +querySearchObj.spruceColor,
          selectedInsideColorId: +querySearchObj.insideColor,
          selectedCoverId: +querySearchObj.cover,
          selectedMetalStrapsId: +querySearchObj.metalStraps,
          selectedMassageFunctionId: +querySearchObj.massageFunction,
          selectedLedId: +querySearchObj.led,
          selectedWarmingId: +querySearchObj.warming,
          selectedHeatingOvenId: +querySearchObj.heatingOven,
          selectedAdditionalAccessoriesIds: querySearchObj.additionalAccessories?.map(item => +item),
          selectedTubeExtensionId: +querySearchObj.tubeExtension,
          selectedDeliveryId: +querySearchObj.delivery,
        })
        await dispatch(setSelectedObjIdsWithAmount(querySearchObj.idsWithAmount));
        await dispatch(setSelectedObjPositioningIds(querySearchObj.positioning));
      } else {
        await dispatch({
          type: ActionTypes.GET_DATA_SUCCESS,
          data:  response.data.__        //response.data
        })
      }
    }
  } catch (error) {
    console.error(error)
    dispatch({ type: ActionTypes.GET_DATA_FAILURE })
  }
};

const getRootData = () => async (dispatch, getState) => {
  try {
    const typeId = getState().hotTub.selectedTypeId;
    dispatch({ type: ActionTypes.GET_ROOT_DATA });
    const response = await hotTubAPI.getRootData(typeId);
    if (response?.data && response?.status === 200) {
      await dispatch({
        type: ActionTypes.GET_ROOT_DATA_SUCCESS,
        rootData: response.data
      })
    }
  } catch (error) {
    console.error(error)
    dispatch({ type: ActionTypes.GET_ROOT_DATA_FAILURE })
  }
};

export const setSelectedIdsWithAmount = (selectedId, amount = 1) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_IDS_WITH_AMOUNT, selectedId, amount })
}
export const setSelectedObjIdsWithAmount = (selectedIds) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_OBJ_IDS_WITH_AMOUNT, selectedIds })
}


const getAllSelectedIds = (getState) => {
  let allSelectedIds = [];
  let selectedIds = [
    getState().hotTub.selectedSizeId,
    getState().hotTub.selectedCoverId,
    getState().hotTub.selectedDeliveryId,
    getState().hotTub.selectedHeatingOvenId,
    getState().hotTub.selectedInsideColorId,
    getState().hotTub.selectedLedId,
    getState().hotTub.selectedMassageFunctionId,
    getState().hotTub.selectedMetalStrapsId,
    getState().hotTub.selectedSpruceColorId,
    getState().hotTub.selectedTubeExtensionId,
    getState().hotTub.selectedWarmingId,
    getState().hotTub.selectedWoodId
  ];

  if (getState().hotTub.selectedAdditionalAccessoriesIds?.length >= 1) {
    allSelectedIds = selectedIds.concat(getState().hotTub.selectedAdditionalAccessoriesIds);
    return allSelectedIds;
  } else {
    allSelectedIds = selectedIds;
    return allSelectedIds;
  }
}

export const getCartData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.GENERATE_CART });
    const selectedIdsWithAmount = getState().hotTub.selectedIdsWithAmount;
    const selectedIds = await getAllSelectedIds(getState);

    const data = await selectedIds.map(id => {
      if (selectedIdsWithAmount?.[id]) {
        return { id: id, amount: selectedIdsWithAmount?.[id] }
      } else {
        return { id: id, amount: 1 }
      }
    })

    if (data && selectedIds?.length >= 1) {
      const response = await hotTubAPI.getCartData(data);
      if (response?.data && response?.status === 200) {
        await dispatch({
          type: ActionTypes.GENERATE_CART_SUCCESS,
          cart: response.data
        })
      }
    }
  } catch (error) {
    console.error(error)
    dispatch({ type: ActionTypes.GENERATE_CART_FAILURE })
  }
};

export const generatePdfLink = (images) => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.GENERATE_PGF });
    const selectedIdsWithAmount = getState().hotTub.selectedIdsWithAmount;
    const selectedPositioningIds = getState().hotTub.selectedPositioningIds;
    const selectedIds = await getAllSelectedIds(getState);
    let sendData;

    const data = await selectedIds.map(id => {
      if (selectedIdsWithAmount?.[id]) {
        return { id: id, amount: selectedIdsWithAmount?.[id] }
      } else {
        return { id: id, amount: 1 }
      }
    })

    if(Object.keys(selectedPositioningIds)?.length){
      sendData = { data: data, images: images, positioning: selectedPositioningIds };
    } else {
      sendData = { data: data, images: images }
    }

    if (data && selectedIds?.length >= 1 && sendData) {
      const response = await hotTubAPI.generatePdfLink(sendData);
      if (response?.data && response?.status === 200) {
        await dispatch({
          type: ActionTypes.GENERATE_PGF_SUCCESS,
          pdfFile: response.data.file

        })
        window.open(`${ process.env.REACT_APP_HOST_API_URL }${ response.data.file }`, '_blank');
      }
    }
  } catch (error) {
    console.error(error)
    dispatch({ type: ActionTypes.GENERATE_PGF_FAILURE })
  }
};

export const setSelectedSizeId = (sizeId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_SIZE_ID, selectedSizeId: sizeId })
}

export const setSelectedWoodId = (woodId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_WOOD_ID, selectedWoodId: woodId })
}

export const setSelectedSpruceColorId = (spruceColorId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_SPRUCE_COLOR_ID, selectedSpruceColorId: spruceColorId })
}

export const setSelectedInsideColorId = (insideColorId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_INSIDE_COLOR_ID, selectedInsideColorId: insideColorId })
}

export const setSelectedCoverId = (coverId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_COVER_ID, selectedCoverId: coverId })
}

export const setSelectedMassageFunctionId = (massageFunctionId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_MASSAGE_FUNCTION_ID, selectedMassageFunctionId: massageFunctionId })
}

export const setSelectedLedId = (ledId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_LED_ID, selectedLedId: ledId })
}

export const setSelectedHeatingOvenId = (heatingOvenId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_HEATING_OVEN_ID, selectedHeatingOvenId: heatingOvenId })
}

export const setSelectedAdditionalAccessoriesId = (additionalAccessoriesId) => async (dispatch, getState) => {
  const selectedTypeId = getState().hotTub.selectedTypeId;
  const oldSelectedIds = getState().hotTub.selectedAdditionalAccessoriesIds;
  const noPriceId = getAddAccNoPriceId(selectedTypeId); // +Object.keys(getState().hotTub.data.additionalAccessories)[0];  // no price id change to function
  const sandFilterId = getSandFilterId(selectedTypeId);
  const preparationForSandFilterId = getPreparationForSandFilterId(selectedTypeId);

  let newSelectedIds = [...oldSelectedIds];
  if (additionalAccessoriesId === noPriceId) {
    newSelectedIds = [additionalAccessoriesId];
  } else if (oldSelectedIds.includes(additionalAccessoriesId)) {

    if (oldSelectedIds.length <= 1) {
      newSelectedIds = [noPriceId];
    } else {
      newSelectedIds = oldSelectedIds.filter((id) => id !== additionalAccessoriesId);
    }

  } else {

    if (oldSelectedIds.includes(noPriceId)) {
      newSelectedIds = newSelectedIds.filter(id => id !== noPriceId)
    }

    newSelectedIds.push(additionalAccessoriesId);

    if (newSelectedIds.includes(sandFilterId)) {
      newSelectedIds = newSelectedIds.filter((id) => id !== preparationForSandFilterId);
    }

  }
  await dispatch({
    type: ActionTypes.SET_SELECTED_ADDITIONAL_ACCESSORIES_ID,
    selectedAdditionalAccessoriesIds: newSelectedIds,
    additionalAccessoriesId
  })
}

export const setSelectedPositioningIds = (option, positioningId) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SELECTED_POSITIONING_IDS,
    positioningId: positioningId,
    option
  })
}

export const setSelectedObjPositioningIds = (positioningObj) => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_SELECTED_OBJ_POSITIONING_IDS,
    positioningObj
  })
}

export const setSelectedTubeExtensionId = (tubeExtensionId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_TUBE_EXTENSION_ID, selectedTubeExtensionId: tubeExtensionId })
}

export const setSelectedDeliveryId = (deliveryId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_DELIVERY_ID, selectedDeliveryId: deliveryId })
}

export const setSelectedWarmingId = (warmingId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_WARMING_ID, selectedWarmingId: warmingId })
}

export const setSelectedMetalStrapsId = (metalStrapsId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_METAL_STRAPS_ID, selectedMetalStrapsId: metalStrapsId })
}

export const setSelectedTypeId = (typeId) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_SELECTED_TYPE_ID, selectedTypeId: typeId })
}

