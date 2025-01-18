'use client'
import { useState, useEffect } from "react";

const useScrollVisibility = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY === 0); // Jika scrollY = 0, elemen terlihat
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isVisible;
};

export default useScrollVisibility;
