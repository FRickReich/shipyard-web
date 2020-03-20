"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { getFromStorage } from "./../../../utils/storage";

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

import Content from "./../../Dashboard/Content/Content";
import Sidebar from "./../../Dashboard/Sidebar/Sidebar";

class DashboardLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: "",
            userData: []
        };
    }

    componentDidMount() {
        const obj = getFromStorage("botany-bay");

        if (obj && obj.token !== "") {
        } else {
            return this.props.history.push("/dashboard/login");
        }

        if (obj && obj.token) {
            const { token } = obj;

            // Verify token
            fetch("/api/account/verify?token=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.getUserInfo();

                        this.setState({
                            token,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                            userData: []
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    getUserInfo() {
        const obj = getFromStorage("botany-bay");

        if (obj && obj.token) {
            const { token } = obj;

            // Verify token
            fetch("/api/account/?id=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState(
                            {
                                isLoading: false,
                                userData: json.data
                            },
                            () => {
                                this.props.dataCallback(this.state.userData);
                            }
                        );
                    }
                });
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const { title, subtitle } = this.props;
        const { userData, isLoading } = this.state;

        return (
            <Container fluid>
                <Grid>
                    {/* Sidebar */}
                    <Sidebar isLoading={isLoading} userData={userData} />

                    {/* Content */}
                    <Content title={title} subtitle={subtitle}>
                        {this.props.children}
                    </Content>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(DashboardLayout);
