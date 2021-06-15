import { useMemo } from "react";


export const useImageCoverProperties = (customizeData, selectedCoverId, apiUrl, imageProp, currentPos = "") => {

  return useMemo(() => {
    const coverData = customizeData?.cover;
    const position = coverData?.[`0${ selectedCoverId }`].position;
    const width = coverData?.[`0${ selectedCoverId }`].base[`width${currentPos}`];
    const height = coverData?.[`0${ selectedCoverId }`].base[`height${currentPos}`];
    const imageLarge = coverData?.[`0${ selectedCoverId }`].base[imageProp];

    if (coverData && selectedCoverId && imageLarge && position && width && height) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }];
    }

  }, [customizeData, selectedCoverId, apiUrl]);
}