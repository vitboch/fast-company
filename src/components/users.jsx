import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import api from "../api";
import User from "./user";
import Headers from "./headers";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import Loader from "./loader";

const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 2;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState(undefined);
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    const filteredUsers = selectedProf
        ? allUsers.filter((user) => _.isEqual(user.profession, selectedProf))
        : allUsers;
    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => setSelectedProf(undefined);

    return (
        <div className="d-flex">
            {professions ? (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            ) : (
                <Loader />
            )}
            <div className="d-flex flex-column">
                <SearchStatus totalUsers={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <Headers />
                        </thead>
                        <tbody>
                            {userCrop.map((user) => (
                                <User key={user._id} {...user} {...rest} />
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
