import React, { useState } from "react";
import OptionText from "../../OptionText";
import plusIcon from "../../../assets/images/icon-svg.svg";
import Image from "../../Image/Image";
import doneIcon from "../../../assets/images/icon-done.svg";
import { Group } from "react-konva";
import { useSelector } from "react-redux";
import { getAddAccNoPriceId } from "../../helperForIds";


const AdditionalAccessories = (props) => {

  const { optionName, setOpenTab, optionGroupProp, selectedAdditionalAccessoriesIds, selectedTypeId } = props;
  const [additionalAccessoriesText, setAdditionalAccessoriesText] = useState('');
  const noAddAccId = getAddAccNoPriceId(selectedTypeId);

  return (

    <Group>
      <OptionText x={ optionGroupProp.optionTextProp.x }
                  y={ optionGroupProp.optionTextProp.y }
                  text={ additionalAccessoriesText }
      />

      { plusIcon && <Image x={ optionGroupProp.optionImageProp.x }
                           y={ optionGroupProp.optionImageProp.y }
                           width={ optionGroupProp.optionImageProp.width }
                           height={ optionGroupProp.optionImageProp.height }
                           onMouseOver={ () => setAdditionalAccessoriesText(optionName('additionalAccessories')) }
                           onMouseOut={ () => setAdditionalAccessoriesText('') }
                           onClick={ () => setOpenTab('Additional Accessoires') }
                           onTap={ () => setOpenTab('Additional Accessoires') }
                           src={ +selectedAdditionalAccessoriesIds.includes(noAddAccId) ? plusIcon : doneIcon }

      />
      }
    </Group>
  )
}

export default AdditionalAccessories;