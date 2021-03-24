import { ActionTypes } from "../../actions/hotTub";


const initialState = {
  data: {},
  rootData: {},
  selectedSizeId: null,
  selectedWoodId: null,
  selectedSpruceColorId: null,
  selectedInsideColorId: null,
  selectedCoverId: null,
  selectedMetalStrapsId: null,
  selectedMassageFunctionId: null,
  selectedLedId: null,
  selectedWarmingId: null,
  selectedHeatingOvenId: null,
  selectedAdditionalAccessoriesIds: [],
  selectedPositioningIds: {},
  selectedTubeExtensionId: null,
  selectedDeliveryId: null,
  isLoadingData: false,
  isLoadingRootData: false,
  isLoadingPgfGenerator: false,
  selectedIdsWithAmount: {},
  pdfFile: ''
}

const hotTubReducer = (state = initialState, action) => {

  switch (action.type) {

    case ActionTypes.GET_DATA:
      return {
        ...state,
        isLoadingData: true
      }
    case ActionTypes.GET_DATA_SUCCESS:
      return {
        ...state,
        isLoadingData: false,
        data: action.data,
        selectedSizeId: +Object.keys(action.data.sizes)[0],
        selectedWoodId: +Object.keys(action.data.wood)[0],
        selectedSpruceColorId: +Object.keys(action.data.spruceColor)[0],
        selectedInsideColorId: +Object.keys(action.data.insideColor)[2],
        selectedCoverId: +Object.keys(action.data.cover)[0],
        selectedMetalStrapsId: +Object.keys(action.data.metalStraps)[0],
        selectedMassageFunctionId: +Object.keys(action.data.massageFunction)[0],
        selectedLedId: +Object.keys(action.data.led)[0],
        selectedWarmingId: +Object.keys(action.data.warming)[0],
        selectedHeatingOvenId: +Object.keys(action.data.heatingOven)[0],
        selectedAdditionalAccessoriesIds: [+Object.keys(action.data.additionalAccessories)[0]],
        selectedTubeExtensionId: +Object.keys(action.data.tubeExtension)[1],
        selectedDeliveryId: +Object.keys(action.data.delivery)[0],
      }
    case ActionTypes.GET_DATA_FAILURE:
      return {
        ...state,
        isLoadingData: false
      }
    case ActionTypes.GET_ROOT_DATA:
      return {
        ...state,
        isLoadingRootData: true
      }
    case ActionTypes.GET_ROOT_DATA_SUCCESS:
      return {
        ...state,
        isLoadingRootData: false,
        rootData: action.rootData
      }
    case ActionTypes.GET_ROOT_DATA_FAILURE:
      return {
        ...state,
        isLoadingRootData: false
      }
    case ActionTypes.GENERATE_PGF:
      return {
        ...state,
        isLoadingPgfGenerator: true
      }
    case ActionTypes.GENERATE_PGF_SUCCESS:
      return {
        ...state,
        isLoadingPgfGenerator: false,
        pdfFile: action.pdfFile,
      }
    case ActionTypes.GENERATE_PGF_FAILURE:
      return {
        ...state,
        isLoadingPgfGenerator: false
      }
    case ActionTypes.GENERATE_CART:
      return {
        ...state,
        isLoadingCartData: true
      }
    case ActionTypes.GENERATE_CART_SUCCESS:
      return {
        ...state,
        isLoadingCartData: false,
        cart: action.cart,
      }
    case ActionTypes.GENERATE_CART_FAILURE:
      return {
        ...state,
        isLoadingCartData: false
      }
    case ActionTypes.SET_SELECTED_SIZE_ID:
      return {
        ...state,
        selectedSizeId: action.selectedSizeId
      }
    case ActionTypes.SET_SELECTED_WOOD_ID:
      return {
        ...state,
        selectedWoodId: action.selectedWoodId
      }
    case ActionTypes.SET_SELECTED_SPRUCE_COLOR_ID:
      return {
        ...state,
        selectedSpruceColorId: action.selectedSpruceColorId
      }
    case ActionTypes.SET_SELECTED_INSIDE_COLOR_ID:
      return {
        ...state,
        selectedInsideColorId: action.selectedInsideColorId
      }
    case ActionTypes.SET_SELECTED_COVER_ID:
      return {
        ...state,
        selectedCoverId: action.selectedCoverId
      }
    case ActionTypes.SET_SELECTED_MASSAGE_FUNCTION_ID:
      return {
        ...state,
        selectedMassageFunctionId: action.selectedMassageFunctionId,
        selectedIdsWithAmount: {
          ...state.selectedIdsWithAmount,
          [action.selectedMassageFunctionId]: 1
        }
      }
    case ActionTypes.SET_SELECTED_LED_ID:
      return {
        ...state,
        selectedLedId: action.selectedLedId
      }
    case ActionTypes.SET_SELECTED_WARMING_ID:
      return {
        ...state,
        selectedWarmingId: action.selectedWarmingId
      }
    case ActionTypes.SET_SELECTED_HEATING_OVEN_ID:
      return {
        ...state,
        selectedHeatingOvenId: action.selectedHeatingOvenId
      }
    case ActionTypes.SET_SELECTED_ADDITIONAL_ACCESSORIES_ID:
      return {
        ...state,
        selectedAdditionalAccessoriesIds: action.selectedAdditionalAccessoriesIds,
        selectedIdsWithAmount: {
          ...state.selectedIdsWithAmount,
          [action.additionalAccessoriesId]: 1
        }
      }
      case ActionTypes.SET_SELECTED_POSITIONING_IDS:
      return {
        ...state,
        selectedPositioningIds: {
          ...state.selectedPositioningIds,
          [action.option]: action.positioningId
        }
      }
    case ActionTypes.SET_SELECTED_TUBE_EXTENSION_ID:
      return {
        ...state,
        selectedTubeExtensionId: action.selectedTubeExtensionId,
        selectedIdsWithAmount: {
          ...state.selectedIdsWithAmount,
          [action.selectedTubeExtensionId]: 1
        }
      }
    case ActionTypes.SET_SELECTED_DELIVERY_ID:
      return {
        ...state,
        selectedDeliveryId: action.selectedDeliveryId
      }
    case ActionTypes.SET_SELECTED_METAL_STRAPS_ID:
      return {
        ...state,
        selectedMetalStrapsId: action.selectedMetalStrapsId
      }
    case ActionTypes.SET_SELECTED_IDS_WITH_AMOUNT:
      return {
        ...state,
        selectedIdsWithAmount: {
          ...state.selectedIdsWithAmount,
          [action.selectedId]: action.amount
        }
      }

    default:
      return state;
  }
}

export default hotTubReducer;