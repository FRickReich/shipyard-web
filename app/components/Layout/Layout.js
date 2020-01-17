"use strict";

import { Link } from "react-router-dom";
import React, { Component } from "react";

import { Grid, Icon, Header, Button } from "semantic-ui-react";

import PageLayout from "./PageLayout/PageLayout";
import DashboardLayout from "./DashboardLayout/DashboardLayout";

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { loggedIn } = this.props;

        if (loggedIn) {
            return <DashboardLayout>{this.props.children}</DashboardLayout>;
        } else {
            return <PageLayout>{this.props.children}</PageLayout>;
        }
    }
}

export default Layout;
