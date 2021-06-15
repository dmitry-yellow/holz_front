import { useMemo } from "react";

export const useImageSmokeProperties = (customizeData, selectedHeatingOvenId, apiUrl, currentPos = "") => {

  return useMemo(() => {
    const heatingOvenData = customizeData?.heatingOven;

    const imageLarge = heatingOvenData?.[`0${ selectedHeatingOvenId }`].base[`boxImage${ currentPos }`];
    const positions = {
      [`x${ currentPos }`]: heatingOvenData?.[`0${ selectedHeatingOvenId }`].imagesext[`x${ currentPos }`],
      [`y${ currentPos }`]: heatingOvenData?.[`0${ selectedHeatingOvenId }`].imagesext[`y${ currentPos }`]
    }
    const width = heatingOvenData?.[`0${ selectedHeatingOvenId }`].imagesext[`width${ currentPos }`];
    const height = heatingOvenData?.[`0${ selectedHeatingOvenId }`].imagesext[`height${ currentPos }`];

    if (heatingOvenData && selectedHeatingOvenId && imageLarge) {
      return [`${ apiUrl }${ imageLarge }`, positions, { width: width, height: height }]
    }

  }, [customizeData, selectedHeatingOvenId, apiUrl]);
}