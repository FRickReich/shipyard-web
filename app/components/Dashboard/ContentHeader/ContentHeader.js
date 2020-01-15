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
    Message,
    Image,
    Label,
    Grid,
    Container,
    Divider
} from "semantic-ui-react";

class ContentHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { title, subtitle } = this.props;

        return (
            <Segment basic inverted color="blue">
                <Header as="h3" inverted>
                    <Header.Content>
                        {title || "title"}
                        <Header.Subheader>
                            {subtitle || "subtitle"}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            </Segment>
        );
    }
}

export default ContentHeader;
