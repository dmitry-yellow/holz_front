import React, { useState } from "react";
import OptionText from "../../OptionText";
import plusIcon from "../../../assets/images/icon-svg.svg";
import Image from "../../Image/Image";
import doneIcon from "../../../assets/images/icon-done.svg";
import { Group } from "react-konva";
import { getNoMetalStrapsId } from "../../helperForIds";


const MetalStrapsOptionGroup = (props) => {

  const { optionName, setOpenTab, optionGroupProp, selectedMetalStrapsId, selectedTypeId } = props;
  const [metalStrapsText, setMetalStrapsText] = useState('');
  const noMetalStrapsId = getNoMetalStrapsId(selectedTypeId);

  return (
    <Group>
      <OptionText x={ optionGroupProp.optionTextProp.x }
                  y={ optionGroupProp.optionTextProp.y }
                  text={ metalStrapsText }
      />
      { plusIcon && selectedMetalStrapsId && <Image x={ optionGroupProp.optionImageProp.x }
                                              y={ optionGroupProp.optionImageProp.y }
                                              width={ optionGroupProp.optionImageProp.width }
                                              height={ optionGroupProp.optionImageProp.height }
                                              onMouseOver={ () => setMetalStrapsText(optionName('metalStraps')) }
                                              onMouseOut={ () => setMetalStrapsText('') }
                                              onClick={ () => setOpenTab('Metal Straps') }
                                              onTap={ () => setOpenTab('Metal Straps') }
                                              src={ +selectedMetalStrapsId === noMetalStrapsId ? plusIcon : doneIcon }
      />
      }
    </Group>
  )
}

export default MetalStrapsOptionGroup;