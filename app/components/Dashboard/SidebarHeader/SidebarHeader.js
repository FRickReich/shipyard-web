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
    Modal,
    Loader,
    Grid,
    Container,
    Divider
} from "semantic-ui-react";

import AccountMenu from "../AccountMenu/AccountMenu";

class SidebarHeader extends Component {
    constructor(props) {
        super(props);

        this.state = { logoutModalOpen: false };
    }

    render() {
        const { userData, isLoading } = this.props;
        return (
            <Segment basic inverted>
                {isLoading ? (
                    <Segment basic padded>
                        <Loader active></Loader>
                    </Segment>
                ) : (
                    <Popup
                        trigger={
                            <Header
                                as="h3"
                                inverted
                                style={{ cursor: "pointer" }}
                            >
                                {userData.image ? (
                                    <Image circular src={userData.image} />
                                ) : (
                                    <Icon
                                        circular
                                        inverted
                                        color="blue"
                                        name="user"
                                    />
                                )}
                                <Header.Content>
                                    ExampleTeam
                                    <Header.Subheader>
                                        {userData && userData.username}
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        }
                        flowing
                        hoverable
                    >
                        {/* Account Menu */}
                        <AccountMenu />
                    </Popup>
                )}
            </Segment>
        );
    }
}

export default SidebarHeader;

/*
 */
