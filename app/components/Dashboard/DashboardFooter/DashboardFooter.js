"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { Container, Divider, Segment } from "semantic-ui-react";

class DashboardFooter extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Segment basic textAlign="right">
                <Divider></Divider>
                <NavLink to="/">Home</NavLink> •{" "}
                <NavLink to="/">Documentation</NavLink>
            </Segment>
        );
    }
}

export default DashboardFooter;
