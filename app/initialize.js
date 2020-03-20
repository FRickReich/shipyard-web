import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";

import Test from "./scenes/Other/Test/Test";

import Home from "./scenes/Page/Home/Home";
import Login from "./scenes/Other/Login/Login";
import Register from "./scenes/Other/Register/Register";
import Overview from "./scenes/Dashboard/Overview/Overview";
import NotFound from "./scenes/Other/NotFound/NotFound";
import ProfileManager from "./scenes/Dashboard/ProfileManager/ProfileManager";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/test" component={Test} />

                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard/login" component={Login} />
                <Route
                    exact
                    path="/dashboard/profile/manage"
                    component={ProfileManager}
                />
                <Route exact path="/dashboard" component={Overview} />
                <Route exact path="/register" component={Register} />

                <Route component={NotFound} />
            </Switch>
        </App>
    </Router>,
    document.querySelector("#root")
);
