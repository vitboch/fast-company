import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";
import Loader from "./components/loader";

const App = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookmark = (userId) => {
        setUsers(
            users.map((user) =>
                user._id === userId
                    ? { ...user, bookmark: !user.bookmark }
                    : user
            )
        );
    };
    users.length === 0 ? console.log("loader") : console.log("data");

    return (
        <>
            {users.length === 0 ? (
                <Loader />
            ) : (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookmark={handleToggleBookmark}
                />
            )}
        </>
    );
};

export default App;
