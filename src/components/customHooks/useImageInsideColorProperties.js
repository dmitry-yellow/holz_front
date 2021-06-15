import { useMemo } from "react";
import { getNoLedId, getSmallSizeId } from "../helperForIds";


export const useImageInsideColorProperties = (customizeData, selectedTypeId, selectedInsideColorId, selectedLedId, selectedSizeId, isCustomizeOptionsWater, apiUrl, imageLargeProp, imageProp, currentPos = '') => {        // inside color without or with water and led or no led, w, h and pos must be equals

  return useMemo(() => {
    const insideColorData = customizeData?.insideColor;
    const bigInsideColorData = customizeData?.bigInsideColor;
    const smallSizeId = getSmallSizeId(selectedTypeId);
    const noLedId = getNoLedId(selectedTypeId);
    let insideSrc, imageSrc, imageLarge, position, width, height;

    if (!isCustomizeOptionsWater) {
      if (+selectedLedId !== noLedId) {
        insideSrc = 'waterledoff';
        imageSrc = imageProp;          // image1
      } else {
        insideSrc = 'base';
        imageSrc = imageLargeProp;    // imageLarge1
      }

    } else {
      if (+selectedLedId !== noLedId) {
        insideSrc = 'waterledon';
        imageSrc = imageProp;             // image1
      } else {
        insideSrc = 'waterPictures';
        imageSrc = imageProp;             // image1
      }
    }

    let keysInsideColorData = insideColorData && Object.keys(insideColorData).map(item => +item).sort();
    let keysBigInsideColorData = bigInsideColorData && Object.keys(bigInsideColorData).map(item => +item).sort();
    const indexOfSelectedInsideColorId = keysInsideColorData?.indexOf(selectedInsideColorId);
    let selectedBigInsideColorId = keysBigInsideColorData?.[indexOfSelectedInsideColorId];

    if (+selectedSizeId === smallSizeId) {

      imageLarge = insideColorData?.[`0${ selectedInsideColorId }`]?.[insideSrc]?.[imageSrc];
      width = insideColorData?.[`0${ selectedInsideColorId }`]?.base[`width${currentPos}`];
      height = insideColorData?.[`0${ selectedInsideColorId }`]?.base[`height${currentPos}`];
      position = insideColorData?.[`0${ selectedInsideColorId }`].position;
    } else {
      imageLarge = bigInsideColorData?.[`0${ selectedBigInsideColorId }`]?.[insideSrc]?.[imageSrc];
      width = bigInsideColorData?.[`0${ selectedBigInsideColorId }`]?.base[`width${currentPos}`];
      height = bigInsideColorData?.[`0${ selectedBigInsideColorId }`]?.base[`height${currentPos}`];

      position = bigInsideColorData?.[`0${ selectedBigInsideColorId }`].position;
    }

    if (insideColorData && selectedInsideColorId && imageLarge) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }]
    }
  }, [customizeData, selectedInsideColorId, apiUrl, isCustomizeOptionsWater, selectedLedId, selectedSizeId]);
}


export const useImageInsideColorSecondViewProperties = (customizeData, selectedInsideColorId, apiUrl, imageLargePos, currentPos= '') => {  // inside color without or with water and led or no led, w, h and pos must be equals

  return useMemo(() => {

    const insideColorData = customizeData?.insideColor;
    const imageLarge = insideColorData?.[`0${ selectedInsideColorId }`].base[imageLargePos];
    const width = insideColorData?.[`0${ selectedInsideColorId }`].base[`width${currentPos}`];
    const height = insideColorData?.[`0${ selectedInsideColorId }`].base[`height${currentPos}`];
    const position = insideColorData?.[`0${ selectedInsideColorId }`].position;

    if (insideColorData && selectedInsideColorId && imageLarge) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }]
    }

  }, [customizeData, selectedInsideColorId, apiUrl]);
}