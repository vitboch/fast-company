import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, onToggleBookmark, id }) => {
    return (
        <button
            className={`bi ${status ? "bi-bookmark-star-fill" : "bi-bookmark"}`}
            onClick={() => onToggleBookmark(id)}
        ></button>
    );
};

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default Bookmark;
