import React, { useState } from "react";
import OptionText from "../../OptionText";
import plusIcon from "../../../assets/images/icon-svg.svg";
import Image from "../../Image/Image";
import doneIcon from "../../../assets/images/icon-done.svg";
import { Group } from "react-konva";
import { getTubeExtensionId } from "../../helperForIds";


const TubeExtensionOptionGroup = (props) => {

  const { optionName, setOpenTab, optionGroupProp, selectedTubeExtensionId, selectedTypeId } = props;
  const [tubeExtensionText, setTubeExtensionText] = useState('');
  const tubeExtensionId = getTubeExtensionId(selectedTypeId)
  return (
    <Group>
      <OptionText x={ optionGroupProp.optionTextProp.x }
                  y={ optionGroupProp.optionTextProp.y }
                  text={ tubeExtensionText }
      />
      { plusIcon && <Image x={ optionGroupProp.optionImageProp.x }
                           y={ optionGroupProp.optionImageProp.y }
                           width={ optionGroupProp.optionImageProp.width }
                           height={ optionGroupProp.optionImageProp.height }
                           onMouseOver={ () => setTubeExtensionText(optionName('tubeExtension')) }
                           onMouseOut={ () => setTubeExtensionText('') }
                           onClick={ () => setOpenTab('Tube extension') }
                           onTap={ () => setOpenTab('Tube extension') }
                           src={ +selectedTubeExtensionId !== tubeExtensionId ? plusIcon : doneIcon }

      />
      }
    </Group>

  )
}

export default TubeExtensionOptionGroup;