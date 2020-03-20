"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";
import "whatwg-fetch";

import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
    Divider
} from "semantic-ui-react";

import { setInStorage } from "./../../../utils/storage";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: "",
            isLoading: false,
            signInError: "",
            email: "",
            password: ""
        };
    }

    onTextboxChangeSignInEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    onTextboxChangeSignInPassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    onSignIn() {
        const { email, password } = this.state;

        this.setState({
            isLoading: true
        });

        fetch("/api/account/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    setInStorage("botany-bay", { token: json.token });

                    this.props.history.push("/dashboard");

                    this.setState({
                        signInError: json.message,
                        email: "",
                        password: "",
                        token: json.token
                    });
                } else {
                    this.setState({
                        signInError: json.message
                    });
                }
            });
    }

    render() {
        const { signInError, isLoading, email, password } = this.state;

        let search = new URLSearchParams(this.props.location.search);

        return (
            <Grid textAlign="center" style={{ height: "100vh" }} stretched>
                <Grid.Column width={4}>
                    <Divider hidden></Divider>
                    <Form>
                        <Header as="h2" color="black" textAlign="center">
                            Log-in
                        </Header>
                        <Segment loading={isLoading}>
                            <Form.Input
                                type="email"
                                fluid
                                icon="user"
                                iconPosition="left"
                                value={email}
                                onChange={this.onTextboxChangeSignInEmail.bind(
                                    this
                                )}
                                placeholder="E-mail address"
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={this.onTextboxChangeSignInPassword.bind(
                                    this
                                )}
                            />
                            <Button
                                color="teal"
                                fluid
                                size="large"
                                onClick={this.onSignIn.bind(this)}
                            >
                                Login
                            </Button>
                        </Segment>
                        {signInError ? (
                            <Message color="red">{signInError}</Message>
                        ) : null}
                        {search.get("verified") ? (
                            <Message color="green">
                                Account verified, You can log in now!
                            </Message>
                        ) : (
                            <Message>
                                Dont have an account yet?&nbsp;
                                <NavLink exact to="/register">
                                    Create one now!
                                </NavLink>
                            </Message>
                        )}
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default withRouter(Login);
