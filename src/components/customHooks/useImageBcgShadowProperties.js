import { useMemo } from "react";


export const useImageBcgShadowProperties = (customizeData, selectedSizeId, apiUrl, imageProp, currentPos= '') => {    // bottom shadow

  return useMemo(() => {
    const bcgShadowImageData = customizeData?.sizes;
    const imageLarge = bcgShadowImageData?.[`0${ selectedSizeId }`].base[imageProp];
    const position = bcgShadowImageData?.[`0${ selectedSizeId }`].position;
    const width = bcgShadowImageData?.[`0${ selectedSizeId }`].base[`width${currentPos}`];
    const height = bcgShadowImageData?.[`0${ selectedSizeId }`].base[`height${currentPos}`];

    if (bcgShadowImageData && selectedSizeId && imageLarge && position && width && height) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }]
    }

  }, [apiUrl, selectedSizeId, customizeData])
}