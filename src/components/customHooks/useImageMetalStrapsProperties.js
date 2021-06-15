import { useMemo } from "react";


export const useImageMetalStrapsProperties = (customizeData, selectedMetalStrapsId, isExteriorBcg, apiUrl, imageLargeProp, objectImageProp, currentPos = '') => {

  return useMemo(() => {
    const metalStrapsData = customizeData?.metalStraps;
    const width = metalStrapsData?.[`0${ selectedMetalStrapsId }`].base[`width${currentPos}`];
    const height = metalStrapsData?.[`0${ selectedMetalStrapsId }`].base[`height${currentPos}`];
    const widthExterior = metalStrapsData?.[`0${ selectedMetalStrapsId }`].imagesext[`width${currentPos}`];
    const heightExterior = metalStrapsData?.[`0${ selectedMetalStrapsId }`].imagesext[`height${currentPos}`];


    const position = metalStrapsData?.[`0${ selectedMetalStrapsId }`].position;
    const positionExterior = {
      [`x${currentPos}`]: metalStrapsData?.[`0${ selectedMetalStrapsId }`].imagesext[`x${currentPos}`],
      [`y${currentPos}`]: metalStrapsData?.[`0${ selectedMetalStrapsId }`].imagesext[`y${currentPos}`]
    };

    const imageLarge = metalStrapsData?.[`0${ selectedMetalStrapsId }`].base[imageLargeProp];
    const imageLargeExterior = metalStrapsData?.[`0${ selectedMetalStrapsId }`].imagesext[objectImageProp];

    if (metalStrapsData && selectedMetalStrapsId && imageLarge && imageLargeExterior && position && positionExterior) {
      if (isExteriorBcg) {
        return [`${ apiUrl }${ imageLargeExterior }`, positionExterior, {
          width: widthExterior,
          height: heightExterior
        }]
      } else {
        return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }]
      }
    }
  }, [customizeData, selectedMetalStrapsId, apiUrl, isExteriorBcg]);
}