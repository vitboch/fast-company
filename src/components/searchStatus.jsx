import React from "react";

const SearchStatus = ({ totalUsers }) => {
    const renderPhrase = (number) => {
        const data = {
            0: "Никто с тобой не тусанет",
            1: " человека тусанут с тобой сегодня",
            2: " человек тусанут с тобой сегодня",
            3: " человек тусанет с тобой сегодня",
            color: {
                0: "danger",
                1: "primary"
            }
        };
        let color;
        let answer;
        const lastOne = Number(number.toString().slice(-1));
        number < 1 ? (color = data.color["0"]) : (color = data.color["1"]);
        if (number < 1) {
            answer = data["0"];
        } else if (number > 1 && number < 5) {
            answer = number + data["1"];
        } else if ([2, 3, 4].indexOf(lastOne) >= 0 && number > 10) {
            answer = number + data["2"];
        } else answer = number + data["3"];

        return <span className={"fs-3 badge bg-" + color}>{answer}</span>;
    };
    return renderPhrase(totalUsers);
};

export default SearchStatus;
