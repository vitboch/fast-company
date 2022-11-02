import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import api from "../../../api";
import Pagination from "../../common/pagination";
import paginate from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import Loader from "../../common/loader";
import UsersTable from "../../ui/usersTable";
import SearchBar from "../../common/searchBar";

const UsersListPage = () => {
    const pageSize = 8;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState(undefined);
    const [selectedProf, setSelectedProf] = useState();
    const [selectedName, setSelectedName] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedName("");
        setSelectedProf(item);
    };
    const handleNameSelect = ({ target }) => {
        setSelectedProf();
        setSelectedName(target.value);
    };
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    const handleSort = (item) => {
        setSortBy(item);
    };
    const filterUsers = (users) => {
        if (selectedProf) {
            return users.filter((user) =>
                _.isEqual(user.profession, selectedProf)
            );
        } else if (selectedName) {
            return users.filter((user) =>
                user.name.toLowerCase().includes(selectedName.toLowerCase())
            );
        } else return users;
    };
    if (users) {
        const filteredUsers = filterUsers(users);
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => setSelectedProf(undefined);

        return (
            <>
                {!professions && <Loader />}
                <div className="d-flex justify-content-center">
                    {professions && (
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
                    )}
                    <div className="d-flex flex-column">
                        {professions && (
                            <>
                                <SearchStatus totalUsers={count} />
                                <SearchBar
                                    searchNameValue={selectedName}
                                    handleNameSelect={handleNameSelect}
                                />
                            </>
                        )}
                        {count > 0 && (
                            <UsersTable
                                users={userCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookmark={handleToggleBookmark}
                            />
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
            </>
        );
    }
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
