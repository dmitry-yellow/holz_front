import { useMemo } from "react";
import { getSkimmerId, getSandFilterId, getWoodenBoxId } from "../helperForIds";


export const useImageAdditionalAccessoriesProperties = (
  customizeData, selectedTypeId,
  selectedAdditionalAccessoriesIds,
  selectedWoodId, selectedSpruceColorId,
  isExteriorBcg, apiUrl, imageLargeProp,
  objectImageProp, currentPos = ''
) => {

  return useMemo(() => {

    const additionalAccessoriesData = customizeData?.additionalAccessories;
    const woodData = customizeData?.wood;
    const spruceColorData = customizeData?.spruceColor;
    const skimmerId = getSkimmerId(selectedTypeId);   // for ext skimmer and different data
    const sandFilterId = getSandFilterId(selectedTypeId);   // for z-index AA and different data
    const woodenBoxId = getWoodenBoxId(selectedTypeId);     // oldId = 80576
    if (additionalAccessoriesData && selectedAdditionalAccessoriesIds) {
      let arr = [];
      selectedAdditionalAccessoriesIds.forEach(id => {
        const position = additionalAccessoriesData?.[`0${ id }`].position;
        const width = additionalAccessoriesData?.[`0${ id }`].base[`width${currentPos}`];
        const height = additionalAccessoriesData?.[`0${ id }`].base[`height${currentPos}`];

        const positionExterior = {
          [`x${currentPos}`]: additionalAccessoriesData?.[`0${skimmerId}`].imagesext[`x${currentPos}`],
          [`y${currentPos}`]: additionalAccessoriesData?.[`0${skimmerId}`].imagesext[`y${currentPos}`]
        };
        const widthExterior = additionalAccessoriesData?.[`0${skimmerId}`].imagesext[`width${currentPos}`];
        const heightExterior = additionalAccessoriesData?.[`0${skimmerId}`].imagesext[`height${currentPos}`];
        const imageLargeExterior = additionalAccessoriesData?.[`0${skimmerId}`].imagesext[objectImageProp];

        let imageLarge = '';
        if (+id === woodenBoxId) {
          if (woodData?.[`0${ selectedWoodId }`]._main.Name === 'Spruce') {
            imageLarge = spruceColorData?.[`0${ selectedSpruceColorId }`].base[`boxImage${currentPos}`];
          } else {
            imageLarge = woodData?.[`0${ selectedWoodId }`].base[`boxImage${currentPos}`];
          }
        } else {
          imageLarge = additionalAccessoriesData?.[`0${ id }`].base[imageLargeProp];
        }

        if (isExteriorBcg && +id === skimmerId) {
          arr = [...arr, {
            image: `${ apiUrl }${ imageLargeExterior }`,
            position: positionExterior,
            width: widthExterior,
            height: heightExterior,
            id
          }]
        } else if (imageLarge) {
          if (+id === sandFilterId) {
            arr = [{
              image: `${ apiUrl }${ imageLarge }`,
              position: position,
              width: width,
              height: height,
              id
            }, ...arr]
          } else {
            arr = [...arr, {
              image: `${ apiUrl }${ imageLarge }`,
              position: position,
              width: width,
              height: height,
              id
            }]
          }
        }
      })
      return arr;
    }

  }, [customizeData, selectedAdditionalAccessoriesIds, selectedWoodId, selectedSpruceColorId, apiUrl, isExteriorBcg]);
}