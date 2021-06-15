import { useMemo } from "react";


export const useImageWoodProperties = (customizeData, selectedWoodId, selectedSpruceColorId, apiUrl, imageProp, currentPos = "") => {  // wood and spruce images prop

  return useMemo(() => {
    const woodData = customizeData?.wood;
    const spruceColorData = customizeData?.spruceColor;
    let imageLarge, position, width, height;

    if (woodData?.[`0${ selectedWoodId }`]._main.Name === 'Spruce' && spruceColorData) {

      imageLarge = spruceColorData?.[`0${ selectedSpruceColorId }`].base[imageProp];
      position = spruceColorData?.[`0${ selectedSpruceColorId }`].position;
      width = spruceColorData?.[`0${ selectedSpruceColorId }`].base[`width${ currentPos }`];
      height = spruceColorData?.[`0${ selectedSpruceColorId }`].base[`height${ currentPos }`];
    } else {
      imageLarge = woodData?.[`0${ selectedWoodId }`].base[imageProp];
      position = woodData?.[`0${ selectedWoodId }`].position;
      width = woodData?.[`0${ selectedWoodId }`].base[`width${ currentPos }`];
      height = woodData?.[`0${ selectedWoodId }`].base[`height${ currentPos }`];
    }

    if (woodData && spruceColorData && selectedWoodId && imageLarge && position && width && height) {
      return [`${ apiUrl }${ imageLarge }`, position, { width: width, height: height }];
    }

  }, [customizeData, selectedWoodId, selectedSpruceColorId, apiUrl]);
}