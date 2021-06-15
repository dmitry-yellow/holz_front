import { useMemo } from "react";


export const useImageTubeExtensionProperties = (customizeData, selectedTubeExtensionId, isExteriorBcg, apiUrl, imageLargeProp, objectImageProp, currentPos = '' ) => {     // tube extension additional 1m

  return  useMemo(() => {
    const tubeExtensionData = customizeData?.tubeExtension;

    if (tubeExtensionData && selectedTubeExtensionId) {
      const imageLarge = tubeExtensionData?.[`0${ selectedTubeExtensionId }`].base[imageLargeProp];
      const position = tubeExtensionData?.[`0${ selectedTubeExtensionId }`].position;
      const width = tubeExtensionData?.[`0${ selectedTubeExtensionId }`].base[`width${currentPos}`];
      const height = tubeExtensionData?.[`0${ selectedTubeExtensionId }`].base[`height${currentPos}`];

      const imageLargeExterior = tubeExtensionData?.[`0${ selectedTubeExtensionId }`].imagesext[objectImageProp];
      const positionExt = {
        [`x${currentPos}`]: tubeExtensionData?.[`0${ selectedTubeExtensionId }`].imagesext[`x${currentPos}`],
        [`y${currentPos}`]: tubeExtensionData?.[`0${ selectedTubeExtensionId }`].imagesext[`y${currentPos}`]
      };
      const widthExt = tubeExtensionData?.[`0${ selectedTubeExtensionId }`].imagesext[`width${currentPos}`];
      const heightExt = tubeExtensionData?.[`0${ selectedTubeExtensionId }`].imagesext[`height${currentPos}`];

      if (isExteriorBcg && imageLargeExterior) {
        return [`${ apiUrl }${ imageLargeExterior }`, positionExt, { width: widthExt, height: heightExt }]
      } else if (imageLarge) {
        return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }]
      }

    }
  }, [customizeData, selectedTubeExtensionId, apiUrl, isExteriorBcg]);
}