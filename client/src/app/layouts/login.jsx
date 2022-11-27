import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4 text-center">Зарегистрироваться</h3>
                            <RegisterForm />
                            <p className="mt-4 text-center">
                                Уже есть аккаунт?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Войти
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4 text-center">Войти</h3>
                            <LoginForm />
                            <p className="mt-4 text-center">
                                Нет аккаунта?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Зарегистрироваться
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
