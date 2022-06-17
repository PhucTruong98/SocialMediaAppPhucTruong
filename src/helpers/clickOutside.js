import { useEffect } from "react";


export default function useClickOutside(ref, fun)
{

    var a = 0;

    useEffect(() => {
        const listener = (e) => {
            if(!ref.current || ref.current.contains(e.target)) {
                return;

            }
            fun();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        }


    }, [a]);
}