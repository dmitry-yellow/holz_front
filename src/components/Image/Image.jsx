import React, {useState, useEffect, useRef} from "react";
import {Image as KonvaImage} from "react-konva";
import useImage from "use-image";
const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari']);


    const Image = React.forwardRef((props, ref) => {

        const [image, status] = useImage(props.src, 'Anonymous');
        const [imageState, setImage] = useState(image);
        const localRef = useRef(null);
        const KonvaImageRef = ref || localRef;

        useEffect(() => {
            if(status=='loaded') {
                    setImage(image);
            }
        }, [props.src, props]);


    /*    if(isSafari) {*/
            return (

                <React.Fragment>
                    <KonvaImage {...props} image={imageState} ref={KonvaImageRef}/>
                </React.Fragment>

            )
        /*}else{
            return (<KonvaImage {...props} image={imageState} ref={KonvaImageRef}/>
            )
        }*/

    });

export default Image;
