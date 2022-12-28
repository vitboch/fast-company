import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import Loader from "../../common/loader";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    if (isLoading) return <Loader />;

    return (
        <>
            {qualitiesList.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
