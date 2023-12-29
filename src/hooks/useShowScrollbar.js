// useShowScrollbar.js

import { useEffect } from "react";

const useShowScrollbar = () => {
    useEffect(() => {
        const handleScroll = () => {
            // Add the "show-scrollbar" class to the body when scrolling occurs
            document.body.classList.add("show-scrollbar");

            // Remove the "show-scrollbar" class after a short delay (e.g., 1 second)
            // Adjust the delay according to your preference
            setTimeout(() => {
                document.body.classList.remove("show-scrollbar");
            }, 1000);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
};

export default useShowScrollbar;
