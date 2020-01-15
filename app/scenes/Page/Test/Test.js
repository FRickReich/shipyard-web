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
import { NavLink } from "react-router-dom";

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = { activeItem: "home" };
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state;

        return (
            <Container fluid>
                <Grid>
                    {/* Sidebar */}
                    <Grid.Column
                        width={3}
                        className="page-sidebar"
                        color="black"
                    >
                        {/* Account Header */}
                        <Segment basic inverted>
                            <Popup
                                trigger={
                                    <Header
                                        as="h3"
                                        inverted
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Image
                                            circular
                                            src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
                                        />
                                        <Header.Content>
                                            ExampleTeam
                                            <Header.Subheader>
                                                Max Mustermann
                                            </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                }
                                flowing
                                hoverable
                            >
                                {/* Account Menu */}
                                <Menu vertical text>
                                    <Menu.Item>
                                        <Menu.Header>Products</Menu.Header>

                                        <Menu.Menu>
                                            <Menu.Item name="enterprise" />
                                            <Menu.Item name="consumer" />
                                        </Menu.Menu>
                                    </Menu.Item>
                                </Menu>
                            </Popup>
                        </Segment>

                        {/* Sidebar Menu */}
                        <Segment basic inverted>
                            wewewew
                        </Segment>
                    </Grid.Column>

                    {/* Content */}
                    <Grid.Column width={13} className="page-content">
                        {/* Current Page Header */}
                        <Segment basic inverted color="blue">
                            <Header as="h3" inverted>
                                <Header.Content>
                                    Account Settings
                                    <Header.Subheader>
                                        Manage your preferences
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Segment>

                        {/* Current Page Content */}
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
                </Grid>
            </Container>
        );
    }
}

export default Test;
