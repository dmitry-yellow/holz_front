import { useMemo } from "react";


export const useImageMassageFunctionProperties = (customizeData, selectedMassageFunctionId, isCustomizeOptionsWater, apiUrl, imageLargeProp, imageProp, currentPos = '') => {

  return useMemo(() => {
    const massageFunctionData = customizeData?.massageFunction;
    let insideSrc, imageSrc, massagePosition;

    if (!isCustomizeOptionsWater) {
      insideSrc = 'base';
      imageSrc = imageLargeProp;
      massagePosition = 'position';
    } else {
      insideSrc = 'waterPictures';
      imageSrc = imageProp;
      massagePosition = 'waterPosition'
    }

    const imageLarge = massageFunctionData?.[`0${ selectedMassageFunctionId }`][insideSrc][imageSrc];
    const width = massageFunctionData?.[`0${ selectedMassageFunctionId }`][insideSrc][`width${currentPos}`];
    const height = massageFunctionData?.[`0${ selectedMassageFunctionId }`][insideSrc][`height${currentPos}`];
    const position = massageFunctionData?.[`0${ selectedMassageFunctionId }`]?.[massagePosition];


    if (massageFunctionData && selectedMassageFunctionId && imageLarge && position && height && width) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }];
    }
  }, [customizeData, selectedMassageFunctionId, apiUrl, isCustomizeOptionsWater]);
}