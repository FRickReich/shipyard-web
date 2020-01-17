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
    Message,
    Button,
    Image,
    Label,
    Grid,
    Container,
    Divider
} from "semantic-ui-react";

class DashboardMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideMessage: false
        };
    }

    render() {
        const { message, messagetype, showmessage } = this.props;
        const { hideMessage } = this.state;

        return (
            <Segment basic hidden={!showmessage}>
                <Message
                    hidden={hideMessage}
                    success={messagetype === "success" ? true : false}
                    negative={messagetype === "failure" ? true : false}
                    info={messagetype === "info" ? true : false}
                    onDismiss={() => this.setState({ hideMessage: true })}
                >
                    {message || "test-message"}
                </Message>
            </Segment>
        );
    }
}

export default DashboardMessage;
