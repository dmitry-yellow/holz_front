import React, { useState, useEffect, useRef } from "react";
import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";

const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
  return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari']);


const Image = React.forwardRef((props, ref) => {

  const [image, status] = useImage(props.src, 'Anonymous');
  const [imageState, setStateImage] = useState(image);
  const localRef = useRef(null);
  const KonvaImageRef = ref || localRef;

  useEffect(() => {
    if (status == 'loaded') {
      setStateImage(image);
    }
  }, [props.src, props, image]);


  return (
      <React.Fragment>
        <KonvaImage { ...props } image={ imageState } ref={ KonvaImageRef }/>
      </React.Fragment>
  )
});

export default Image;
