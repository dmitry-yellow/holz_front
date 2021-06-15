import { useMemo } from "react";


export const useImageExteriorBcgProperties = (rootData, isExteriorBcg, apiUrl, imageProp) => {
  return useMemo(() => {
    const exteriorImages = rootData?.exteriorImages;
    if (exteriorImages) {
      const imageLarge = exteriorImages?.[imageProp];
      if (imageLarge && isExteriorBcg) {
        return `${ apiUrl }${ imageLarge }`
      }
    }
  }, [isExteriorBcg, apiUrl, rootData])
}