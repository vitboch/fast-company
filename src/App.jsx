import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

const App = () => {
    return (
        <BrowserRouter>
            <React.StrictMode>
                <NavBar />
                <Switch>
                    <Route path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/fast-company" component={Main} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/fast-company" />
                </Switch>
            </React.StrictMode>
        </BrowserRouter>
    );
};

export default App;
