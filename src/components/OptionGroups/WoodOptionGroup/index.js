import React, { useState } from "react";
import OptionText from "../../OptionText";
import plusIcon from "../../../assets/images/icon-svg.svg";
import Image from "../../Image/Image";
import doneIcon from "../../../assets/images/icon-done.svg";
import { Group } from "react-konva";


const WoodOptionGroup = (props) => {

  const { optionName, setOpenTab, optionGroupProp } = props;

  const [woodText, setWoodText] = useState('');

  return (
    <Group>
      <OptionText x={ optionGroupProp.optionTextProp.x }
                  y={ optionGroupProp.optionTextProp.y }
                  text={ woodText }
      />
      { plusIcon && <Image x={ optionGroupProp.optionImageProp.x }
                           y={ optionGroupProp.optionImageProp.y }
                           width={ optionGroupProp.optionImageProp.width }
                           height={ optionGroupProp.optionImageProp.height }
                           onMouseOver={ () => setWoodText(optionName('wood')) }
                           onMouseOut={ () => setWoodText('') }
                           onClick={ () => setOpenTab('Wood') }
                           onTap={ () => setOpenTab('Wood') }
                           src={ doneIcon }

      />
      }
    </Group>
  )
}

export default WoodOptionGroup;