import React, { useEffect, useRef, useState } from "react";
import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";

const Image = React.forwardRef((props, ref) => {


  const [image, status] = useImage(props.src, 'Anonymous');
  const [pos, setPos] = useState({ x: props.x, y: props.y, img: image, width: props.width, height: props.height });
  const localRef = useRef(null);
  const KonvaImageRef = ref || localRef;

  useEffect(() => {
    if (status === 'loaded') {
      setPos({ x: props.x, y: props.y, img: image, width: props.width, height: props.height })
    }
  }, [status]);

  return (
      <React.Fragment>
         <KonvaImage { ...props } x={pos.x} y={pos.y} image={ pos.img } width={pos.width} height={pos.height} ref={ KonvaImageRef }/>
      </React.Fragment>
  )
});

export default Image;
