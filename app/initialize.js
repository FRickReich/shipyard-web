import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";

import Test from "./scenes/Other/Test/Test";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/test" component={Test} />
            </Switch>
        </App>
    </Router>,
    document.querySelector("#root")
);
