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
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });
    console.log(data);
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});

    function objectToArray(object) {
        let arr = [];
        if (!Array.isArray(object)) {
            arr = Object.keys(object).map((key) => object[key]);
        } else {
            arr = object;
        }
        return arr;
    }

    useEffect(() => {
        api.users.getById(userId).then((data) => setData(data));
        api.professions
            .fetchAll()
            .then((data) => setProfession(objectToArray(data)));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    console.log(data.qualities);
    const validate = () => {
        const errors = validator(data, validatorConfig);
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
    console.log("data", data);
    console.log("userId", userId);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
        api.users.update(userId, data);
        history.replace(`/users/${userId}`);
    };

    if (data.sex !== "") {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                defaultOption="Выбрать..."
                                name="profession"
                                options={professions}
                                value={data.profession}
                                onChange={handleChange}
                            />
                            <RadioField
                                options={[
                                    { name: "Мужчина", value: "male" },
                                    { name: "Женщина", value: "female" },
                                    { name: "Другое", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
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
        );
    }

    return <Loader />;
};

export default UserEditPage;
