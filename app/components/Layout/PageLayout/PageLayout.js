"use strict";

import React, { Component } from "react";

import { Container, Divider } from "semantic-ui-react";

import PageHeader from "./../../Page/PageHeader/PageHeader";
import PageFooter from "./../../Page/PageFooter/PageFooter";

class PageLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <PageHeader />
                <Divider hidden />
                <Container>{this.props.children}</Container>
                <PageFooter />
            </div>
        );
    }
}

export default PageLayout;
