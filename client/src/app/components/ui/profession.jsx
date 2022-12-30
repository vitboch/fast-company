import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions";
import Loader from "../common/loader";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const profession = useSelector(getProfessionById(id));
    if (!isLoading) {
        return <p>{profession.name}</p>;
    } else return <Loader />;
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
