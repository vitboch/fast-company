import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import Quality from "./quality";

const User = ({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    _id,
    bookmark,
    onToggleBookmark,
    onDelete
}) => {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>
                    {qualities.map((quality) => {
                        return <Quality key={quality._id} {...quality} />;
                    })}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate + " / 5"}</td>
                <td>
                    <Bookmark
                        id={_id}
                        status={bookmark}
                        onToggleBookmark={onToggleBookmark}
                    />
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(_id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    bookmark: PropTypes.bool,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
