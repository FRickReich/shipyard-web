"use strict";

import { Link } from "react-router-dom";
import React, { Component } from "react";

import { Grid, Icon, Header, Button } from "semantic-ui-react";

import Layout from "./../../../components/Layout/Layout";

class NotFound extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        return <Layout>Not Found</Layout>;
    }
}

export default NotFound;
