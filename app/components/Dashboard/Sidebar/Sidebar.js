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

import SidebarHeader from "./../SidebarHeader/SidebarHeader";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Grid.Column width={4} className="page-sidebar" color="black">
                {/* Account Header */}
                <SidebarHeader />
                {/* Sidebar Menu */}
                <Segment basic inverted>
                    wewewew
                </Segment>
            </Grid.Column>
        );
    }
}

export default Sidebar;
