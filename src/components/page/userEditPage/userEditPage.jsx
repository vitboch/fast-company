import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import Loader from "../../common/loader";
import { useHistory, useParams } from "react-router-dom";

const UserEditPage = () => {
    const history = useHistory();
    const { userId } = useParams();
    const [formData, setFormData] = useState(undefined);
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState({});

    const objectToArray = (object) => {
        let arr = [];
        if (!Array.isArray(object)) {
            arr = Object.keys(object).map((key) => object[key]);
        } else {
            arr = object;
        }
        return arr;
    };

    const getLabelValue = (qualities) =>
        qualities.map((quality) => ({
            label: quality.name,
            value: quality._id
        }));

    useEffect(() => {
        api.users.getById(userId).then((data) => setFormData(data));
        api.professions
            .fetchAll()
            .then((data) => setProfessions(objectToArray(data)));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        validate();
    }, [formData]);

    const handleChange = ({ name, value }) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validate = () => {
        const errors = validator(formData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена не корректно"
            }
        }
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        if (typeof formData.profession === "string") {
            professions.forEach((prof) => {
                if (prof._id === formData.profession) {
                    formData.profession = { _id: prof._id, name: prof.name };
                }
            });
        }

        const arrayOfQualities = [];
        if (Object.keys(formData.qualities[0]).includes("label")) {
            Object.values(qualities).forEach((qual) => {
                formData.qualities.forEach((q) => {
                    if (qual._id === q.value) {
                        arrayOfQualities.push({
                            _id: qual._id,
                            name: qual.name,
                            color: qual.color
                        });
                    }
                });
            });
        }

        formData.qualities = arrayOfQualities;

        api.users.update(userId, formData);
        history.replace(`/users/${userId}`);
    };

    return (
        <>
            {formData ? (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выберите вашу профессию"
                                    defaultOption="Выбрать..."
                                    name="profession"
                                    options={professions}
                                    value={formData.profession}
                                    onChange={handleChange}
                                />
                                <RadioField
                                    options={[
                                        { name: "Мужчина", value: "male" },
                                        { name: "Женщина", value: "female" },
                                        { name: "Другое", value: "other" }
                                    ]}
                                    value={formData.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={getLabelValue(
                                        formData.qualities
                                    )}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default UserEditPage;
