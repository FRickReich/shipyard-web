"use strict";

import React, { Component } from "react";

import {
    Menu,
    Input,
    Dropdown,
    Table,
    Segment,
    Header,
    Icon,
    Popup,
    Button,
    Image,
    Label,
    Grid,
    Container,
    Divider
} from "semantic-ui-react";

import Content from "./../../../components/Dashboard/Content/Content";
import Sidebar from "./../../../components/Dashboard/Sidebar/Sidebar";

class Test extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid>
                <Grid>
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Content */}
                    <Content />
                </Grid>
            </Container>
        );
    }
}

export default Test;
