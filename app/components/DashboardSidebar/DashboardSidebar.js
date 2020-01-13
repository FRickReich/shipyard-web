"use strict";

import { NavLink } from "react-router-dom";
import React, { Component } from "react";

import { Grid, Menu } from "semantic-ui-react";

class DashboardSidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid.Column
                width={2}
                style={{ position: "fixed", height: "100vh" }}
                color="violet"
            >
                <Menu vertical borderless inverted fluid text>
                    <Menu.Item name="Overview" />
                    <Menu.Item name="Reports" />
                    <Menu.Item name="Analytics" />
                    <Menu.Item name="Export" />
                </Menu>
            </Grid.Column>
        );
    }
}

export default DashboardSidebar;
