import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import Loader from "../../common/loader";

const EditUserPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const { currentUser, updateUserData } = useAuth();
    const { professions, isLoading: professionLoading } = useProfessions();
    const professionsList = professions.map((profession) => ({
        label: profession.name,
        value: profession._id
    }));
    const { qualities, isLoading: qualitiesLoading } = useQualities();
    const qualitiesList = qualities.map((quality) => ({
        label: quality.name,
        value: quality._id
    }));
    const [errors, setErrors] = useState({});

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const element of elements) {
            for (const quality of qualities) {
                if (quality._id === element) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateUserData({
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        });
        history.push(`/users/${currentUser._id}`);
    };
    const transformData = (data) => {
        return getQualities(data).map((quality) => ({
            label: quality.name,
            value: quality._id
        }));
    };

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "?????????????????????? ?????????? ?????????????????????? ?????? ????????????????????"
            },
            isEmail: {
                message: "Email ???????????? ??????????????????????"
            }
        },
        name: {
            isRequired: {
                message: "?????????????? ???????? ??????"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="??????"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="?????????????????????? ??????????"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="???????????? ???????? ??????????????????"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="???????????????? ?????? ??????"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="???????????????? ???????? ????????????????"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                ????????????????
                            </button>
                        </form>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
