import React, { useState } from "react";
import OptionText from "../../OptionText";
import plusIcon from "../../../assets/images/icon-svg.svg";
import Image from "../../Image/Image";
import doneIcon from "../../../assets/images/icon-done.svg";
import { Group } from "react-konva";


const InsideColorGroup = (props) => {

  const { optionName, setOpenTab, optionGroupProp } = props;

  const [insideColorText, setInsideColorText] = useState('');

  return (
    <Group>
      <OptionText x={optionGroupProp.optionTextProp.x}
                  y={ optionGroupProp.optionTextProp.y }
                  text={ insideColorText }
      />
      { plusIcon && <Image x={ optionGroupProp.optionImageProp.x }
                           y={ optionGroupProp.optionImageProp.y }
                           width={ optionGroupProp.optionImageProp.width }
                           height={ optionGroupProp.optionImageProp.height }
                           onMouseOver={ () => setInsideColorText(optionName('insideColor')) }
                           onMouseOut={ () => setInsideColorText('') }
                           onClick={ () => setOpenTab('Inside color') }
                           onTap={ () => setOpenTab('Inside color') }
                           src={ doneIcon }

      />
      }
    </Group>
  )
}

export default InsideColorGroup;