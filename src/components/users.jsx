import React, { useState } from "react";
import User from "./user";
import Headers from "./headers";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users, onDelete, onToggleBookmark }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            {count > 0 && (
                <table className="table">
                    <thead>
                        <Headers />
                    </thead>
                    <tbody>
                        {userCrop.map((user) => {
                            return (
                                <User
                                    key={user._id}
                                    {...user}
                                    onDelete={onDelete}
                                    onToggleBookmark={onToggleBookmark}
                                />
                            );
                        })}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default Users;
