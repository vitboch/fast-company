import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import Loader from "./loader";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleUsers = () => {
        history.push("/users");
    };

    if (user !== undefined) {
        return (
            <div className="card text-center">
                <div className="card-body p-3 mb-2 bg-light text-dark">
                    <h1>{user.name}</h1>
                    <div>Профессия: {user.profession.name}</div>
                    <QualitiesList qualities={user.qualities} />
                    <div>Встретился(ась): {user.completedMeetings} раз</div>
                    <div>Рейтинг: {user.rate}</div>
                    <br />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={handleUsers}
                    >
                        Все пользователи
                    </button>
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
