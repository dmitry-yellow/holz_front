import { useRef, useEffect } from "react";

export const useOutsideClick = (callback) => {
    const innerRef = useRef();
    const callbackRef = useRef();

    const handleClick = event => {
        if (
          innerRef.current && 
          callbackRef.current &&
          !innerRef.current.contains(event.target)
        ) {
          callbackRef.current(event);
        }
      }
  
    useEffect(() => { 
      callbackRef.current = callback;
    });
  
    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }, []); 
    
    return innerRef;
};
