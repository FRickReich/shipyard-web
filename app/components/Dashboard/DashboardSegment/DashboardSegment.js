"use strict";

import React, { Component } from "react";

import {
    Statistic,
    Icon,
    Card,
    Button,
    Message,
    Grid,
    Divider,
    Header,
    Segment,
    Dimmer,
    Loader
} from "semantic-ui-react";

class DashboardSegment extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { title, loading } = this.props;

        return (
            <div>
                <Divider horizontal>
                    <Header as="h4">{title}</Header>
                </Divider>

                <Segment basic loading={loading}>
                    {loading === false && this.props.children}
                </Segment>
            </div>
        );
    }
}

export default DashboardSegment;
