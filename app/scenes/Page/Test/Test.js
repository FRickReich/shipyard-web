"use strict";

import React, { Component } from "react";

import {
    Menu,
    Input,
    Dropdown,
    Table,
    Segment,
    Header,
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

    componentDidMount() {}

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state;

        const columnItems = ["A", "B", "C", "D"];

        return (
            <div>
                <Menu inverted borderless fixed="top">
                    <Menu.Item header as={NavLink} to="/test">
                        [PROJECT NAME]
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input icon="search" placeholder="Search..." />
                        </Menu.Item>
                        <Dropdown item text="USERNAME">
                            <Dropdown.Menu>
                                <Dropdown.Item>Electronics</Dropdown.Item>
                                <Dropdown.Item>Automotive</Dropdown.Item>
                                <Dropdown.Item>Home</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
                <Grid columns={2} padded>
                    <Grid.Column
                        width={2}
                        style={{ position: "fixed", height: "100vh" }}
                        color="violet"
                    >
                        <Menu vertical borderless inverted fluid text>
                            <Menu.Item
                                name="Overview"
                                active={activeItem === "editorials"}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name="Reports"
                                active={activeItem === "editorials"}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name="Analytics"
                                active={activeItem === "editorials"}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name="Export"
                                active={activeItem === "editorials"}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={14} floated="right">
                        <Grid padded>
                            <Grid.Row>
                                <Header
                                    size="huge"
                                    dividing
                                    style={{ width: "100%" }}
                                >
                                    Dashboard header
                                </Header>
                            </Grid.Row>
                            <Grid.Row textAlign="center">
                                {columnItems.map((item, i) => {
                                    return (
                                        <Grid.Column key={i} width={4}>
                                            <Image
                                                style={{
                                                    marginTop: "14px",
                                                    marginBottom: "14px"
                                                }}
                                                centered
                                                size="small"
                                                circular
                                                src="https://semantic-ui-forest.com/rootstatic/templates/bootstrap/dashboard/static/images/wireframe/square-image.png"
                                            />
                                            <Label size="large" basic>
                                                {item}
                                            </Label>
                                            <p>text</p>
                                        </Grid.Column>
                                    );
                                })}
                            </Grid.Row>
                            <Divider hidden />
                            <Grid.Row>
                                <Header
                                    size="huge"
                                    dividing
                                    style={{ width: "100%" }}
                                >
                                    Section header
                                </Header>
                            </Grid.Row>
                            <Grid.Row>
                                <Table
                                    singleLine
                                    striped
                                    selectable
                                    unstackable
                                >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                                #
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                Header
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                Header
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                Header
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                Header
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                            <Table.Cell>Cell</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Grid.Row>
                            <Grid.Row>
                                <Container fluid textAlign="right">
                                    <NavLink to="/">Home</NavLink> •{" "}
                                    <NavLink to="/">Documentation</NavLink>
                                </Container>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Test;
