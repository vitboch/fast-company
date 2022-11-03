import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Loader from "../../common/loader";
import Qualities from "../../ui/qualities";
import { Link } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user !== undefined) {
        return (
            <div className="card text-center">
                <div className="card-body p-3 mb-2 bg-light text-dark">
                    <h1>{user.name}</h1>
                    <div>Профессия: {user.profession.name}</div>
                    <Qualities qualities={user.qualities} />
                    <div>Встретился(ась): {user.completedMeetings} раз</div>
                    <div>Рейтинг: {user.rate}</div>
                    <br />
                    <Link to={`/users/${userId}/edit`}>
                        <button
                            className="btn btn-secondary mt-2"
                            // onClick={handleUsers}
                        >
                            Изменить
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return <Loader />;
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
