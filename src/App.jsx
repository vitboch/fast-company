import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UserEditPage from "./components/page/userEditPage";
import Loader from "./components/common/loader";

const App = () => {
    return (
        <BrowserRouter>
            <React.StrictMode>
                <NavBar />
                <Switch>
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/users/:userId?" exact component={Users} />
                    <Route
                        path="/users/:userId?/edit"
                        component={UserEditPage}
                    />
                    <Route path="/fast-company" component={Main} />
                    <Route path="https://vitboch.github.io/" component={Main} />
                    <Route path="/" exact component={Main} />
                    <Route path="/404" component={Loader} />
                    <Redirect to="/404" />
                </Switch>
            </React.StrictMode>
        </BrowserRouter>
    );
};

export default App;
