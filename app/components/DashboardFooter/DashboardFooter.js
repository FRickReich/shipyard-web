"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { Container, Segment, Divider } from "semantic-ui-react";

class DashboardFooter extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Container fluid textAlign="right">
                <Divider></Divider>
                <NavLink to="/">Home</NavLink> •{" "}
                <NavLink to="/">Documentation</NavLink>
            </Container>
        );
    }
}

export default DashboardFooter;
