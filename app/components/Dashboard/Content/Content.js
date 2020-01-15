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
import { NavLink } from "react-router-dom";
import ContentHeader from "../ContentHeader/ContentHeader";

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Grid.Column width={12} className="page-content">
                {/* Content Header */}
                <ContentHeader />

                <Segment basic>
                    <Message floating>test</Message>
                </Segment>

                {/* Content Page */}
                <Segment basic>
                    <Grid columns={3} padded="horizontally">
                        <Grid.Row>
                            <Grid.Column>A</Grid.Column>
                            <Grid.Column>B</Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>1</Grid.Column>
                            <Grid.Column>2</Grid.Column>
                            <Grid.Column>3</Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Grid.Column>
        );
    }
}

export default Content;
