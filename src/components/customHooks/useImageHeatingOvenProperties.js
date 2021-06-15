import { useMemo } from "react";


export const useImageHeatingOvenProperties = (customizeData, selectedHeatingOvenId, apiUrl, imageProp, currentPos = "") => {   // heating oven image

  return useMemo(() => {
    const heatingOvenData = customizeData?.heatingOven;
    const imageLarge = heatingOvenData?.[`0${ selectedHeatingOvenId }`].base[imageProp];
    const position = heatingOvenData?.[`0${ selectedHeatingOvenId }`].position;
    const width = heatingOvenData?.[`0${ selectedHeatingOvenId }`].base[`width${currentPos}`];
    const height = heatingOvenData?.[`0${ selectedHeatingOvenId }`].base[`height${currentPos}`];

    if (heatingOvenData && selectedHeatingOvenId && imageLarge && position && width && height) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }];
    }

  }, [customizeData, selectedHeatingOvenId, apiUrl]);

}