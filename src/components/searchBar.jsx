import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ searchNameValue, handleNameSelect }) => {
    return (
        <input
            className="mt-2"
            type="text"
            placeholder="Поиск..."
            value={searchNameValue}
            onChange={handleNameSelect}
        ></input>
    );
};
SearchBar.propTypes = {
    searchNameValue: PropTypes.string.isRequired,
    handleNameSelect: PropTypes.func.isRequired
};

export default SearchBar;
