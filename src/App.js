import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Loader from "./components/loader";

const App = () => {
    return (
        <BrowserRouter>
            <React.StrictMode>
                <NavBar />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/users/:userId?" component={Users} />
                    <Route path="/" exact component={Main} />
                    <Route path="/404" component={Loader} />
                    <Redirect to="/404" />
                </Switch>
            </React.StrictMode>
        </BrowserRouter>
    );
};

export default App;
