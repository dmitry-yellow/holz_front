import React, { useState } from "react";
import OptionText from "../../OptionText";
import plusIcon from "../../../assets/images/icon-svg.svg";
import Image from "../../Image/Image";
import doneIcon from "../../../assets/images/icon-done.svg";
import { Group } from "react-konva";
import { getNoCoverId } from "../../helperForIds";


const CoverOptionGroup = (props) => {

  const { optionName, setOpenTab, optionGroupProp, selectedCoverId, selectedTypeId } = props;
  const [coverText, setCoverText] = useState('');
  const noCoverId = getNoCoverId(selectedTypeId);

  return (
    <Group>
      <OptionText x={ optionGroupProp.optionTextProp.x }
                  y={ optionGroupProp.optionTextProp.y }
                  text={ coverText }
      />
      { plusIcon && selectedCoverId && <Image x={ optionGroupProp.optionImageProp.x }
                           y={ optionGroupProp.optionImageProp.y }
                           width={ optionGroupProp.optionImageProp.width }
                           height={ optionGroupProp.optionImageProp.height }
                           onMouseOver={ () => setCoverText(optionName('cover')) }
                           onMouseOut={ () => setCoverText('') }
                           onClick={ () => setOpenTab('Cover') }
                           onTap={ () => setOpenTab('Cover') }
                           src={ +selectedCoverId === noCoverId ? plusIcon : doneIcon }
      />
      }
    </Group>
  )
}

export default CoverOptionGroup;