import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to the top of the page whenever the location changes
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Render nothing (this component doesn't have a UI)
    return null;
};

export default ScrollToTop;
