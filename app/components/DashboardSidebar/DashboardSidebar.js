"use strict";

import { NavLink } from "react-router-dom";
import React, { Component } from "react";

import { Grid, Menu, Divider, Accordion, MenuHeader } from "semantic-ui-react";

class DashboardSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0
        };
    }

    handleClick(e, titleProps) {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        return (
            <Grid.Column
                width={3}
                style={{ position: "fixed", marginTop: 110 }}
            >
                <Menu vertical fluid>
                    <Menu.Item>
                        <Menu.Header>Account</Menu.Header>
                        <Menu.Menu>
                            <Menu.Item name="Overview" />
                            <Menu.Item name="Settings" />
                            <Menu.Item name="Profile" />
                        </Menu.Menu>
                    </Menu.Item>
                    <Menu.Item>
                        <Accordion>
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={this.handleClick.bind(this)}
                            >
                                TestProject
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <Menu.Menu>
                                    <Menu.Item name="Overview" />
                                    <Menu.Item name="Settings" />
                                    <Menu.Item name="Profile" />
                                </Menu.Menu>
                            </Accordion.Content>

                            <Accordion.Title
                                active={activeIndex === 1}
                                index={1}
                                onClick={this.handleClick.bind(this)}
                            >
                                TestProject2
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                                <Menu.Menu>
                                    <Menu.Item name="Overview" />
                                    <Menu.Item name="Settings" />
                                    <Menu.Item name="Team" />
                                    <Divider></Divider>
                                    <Menu.Item name="Characters" />
                                </Menu.Menu>
                            </Accordion.Content>
                        </Accordion>
                    </Menu.Item>
                </Menu>
            </Grid.Column>
        );
    }
}

export default DashboardSidebar;
