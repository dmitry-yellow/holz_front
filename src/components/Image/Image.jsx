import React, {useState, useEffect, useRef} from "react";
import {Image as KonvaImage} from "react-konva";
import useImage from "use-image";
const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari']);


    const Image = React.forwardRef((props, ref) => {
        const [imageState, setImage] = useState(new window.Image());
        const [image, status] = useImage(props.src, 'Anonymous');
        const localRef = useRef(null);
        const KonvaImageRef = ref || localRef;

        useEffect(() => {
            const img = new window.Image();
            img.src = props.src;
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                setImage(img);
            };
        }, [props.src, props]);

        if(isSafari) {
            return (
                <React.Fragment>
                    <KonvaImage {...props} image={image} ref={KonvaImageRef}/>
                </React.Fragment>
            )
        }else{
            return (<KonvaImage {...props} image={imageState} ref={KonvaImageRef}/>
            )
        }

    });

export default Image;
