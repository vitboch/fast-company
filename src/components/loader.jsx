import React from "react";

const Loader = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary m-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <span>Loading...</span>
            </div>
        </>
    );
};

export default Loader;
