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

class SidebarHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Segment basic inverted>
                <Popup
                    trigger={
                        <Header as="h3" inverted style={{ cursor: "pointer" }}>
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
        );
    }
}

export default SidebarHeader;
