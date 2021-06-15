import { useMemo } from "react";


export const useImageExteriorHeatingOvenProperties = (rootData, isExteriorBcg, apiUrl, imageProp, currentPos = '') => {     // exterior heating oven images

  return useMemo(() => {
    const exteriorImages = rootData?.reflections;
    if (exteriorImages) {
      const imageLarge = exteriorImages?.[imageProp];
      const width = exteriorImages[`width${currentPos}`];
      const height = exteriorImages[`height${currentPos}`];
      const positions = {
        [`x${currentPos}`]: exteriorImages[`x${currentPos}`],
        [`y${currentPos}`]: exteriorImages[`y${currentPos}`]
      }
      if (imageLarge && isExteriorBcg) {
        return [`${ apiUrl }${ imageLarge }`, positions, { width: width, height: height }];
      }
    }
  }, [isExteriorBcg, apiUrl, rootData])
}