import React from "react";
import moment from "moment";

function FormatDate(props) {
    const dateObj = moment(props);

    if (!dateObj.isValid()) {
        return "Invalid Date"; // Handle invalid date strings
    }

    const dateNow = moment();
    const diff = dateNow.diff(dateObj, "seconds");
    if (diff < 60) {
        return "Just now";
    } else if (diff < 60 * 60) {
        return `${Math.floor(diff / 60)} minutes ago`;
    } else if (diff < 60 * 60 * 24) {
        return `${Math.floor(diff / 3600)} hours ago`;
    } else if (diff < 60 * 60 * 24 * 7) {
        return `${Math.floor(diff / (3600 * 24))} days ago`;
    }

    return dateObj.format("LLLL");
}

export default FormatDate;
