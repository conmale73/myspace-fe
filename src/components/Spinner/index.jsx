import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = ({ css, size, loading }) => {
    return (
        <div className="absolute transform -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4">
            <BeatLoader
                css={css}
                size={size}
                color={"#505050"}
                loading={loading}
            />
        </div>
    );
};

export default Spinner;
