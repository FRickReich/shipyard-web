"use strict";

import { withRouter, NavLink } from "react-router-dom";
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

import { getFromStorage } from "./../../../utils/storage";

class AccountMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    logout() {
        const obj = getFromStorage("botany-bay");

        if (obj && obj.token) {
            const { token } = obj;

            // Verify token
            fetch("/api/account/logout?token=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        localStorage.removeItem("botany-bay");

                        this.setState({
                            token: "",
                            signInError: ""
                        });

                        this.props.history.push("/");
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <Menu vertical text>
                    <Menu.Item>
                        <Menu.Header>Account</Menu.Header>

                        <Menu.Menu>
                            <Menu.Item
                                name="Manage Profile"
                                as={NavLink}
                                exact
                                to="/dashboard/profile/manage"
                            />
                            <Menu.Item name="Settings" />
                            <Menu.Item
                                name="Sign Out"
                                onClick={this.logout.bind(this)}
                            />
                        </Menu.Menu>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default withRouter(AccountMenu);
