import React, {useEffect, useRef} from 'react';


function UseScroll(parentRef: any, childRef: any, callback :any) {
    const observer = useRef<any>(null);

    useEffect(() => {
        const options = {
            root: parentRef.current,
            rootMargin: "0px",
            threshold: 0
        };
        observer.current = new IntersectionObserver(([target]) => {
            if(target.isIntersecting) {
                callback()
            }
        }, options);
        observer.current.observe(childRef.current);

        return () => {
            observer.current.unobserve(childRef.current)
        }
    }, [callback])
}

export default UseScroll;