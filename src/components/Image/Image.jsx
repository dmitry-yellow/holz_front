import React, {useState, useEffect, useRef} from "react";
import {Image as KonvaImage} from "react-konva";

const Image = React.forwardRef((props, ref) => {

    const [image, setImage] = useState(new window.Image());

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

    return (
        <KonvaImage {...props} image={image} ref={KonvaImageRef}/>
    );
});

export default Image;
