import React from "react";
import { Text } from "react-konva";


const OptionText = (props) => {

  const { text, x, y } = props;

  return <>
    { text?.length > 1 && <Text x={ x }
                                y={ y }
                                text={ text }
                                fontFamily='Montserrat_400'
                                fontSize={ 16 }
                                fill={ 'black' }
    />
    }
  </>
}


export default OptionText;