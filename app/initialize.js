import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";

import Home from "./scenes/Page/Home/Home";
import NotFound from "./scenes/Page/NotFound/NotFound";
import Test from "./scenes/Page/Test/Test";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/test" component={Test} />
                <Route component={NotFound} />
            </Switch>
        </App>
    </Router>,
    document.querySelector("#root")
);
