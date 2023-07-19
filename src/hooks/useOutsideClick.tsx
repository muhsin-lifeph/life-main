import { useEffect, useRef } from "react";

export function useOutsideClick(callback:any) {
    const ref = useRef<any>();
  
    useEffect(() => {
      const handleClick = (event:any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);
  
    return ref;
  };