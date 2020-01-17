"use strict";

import { Link } from "react-router-dom";
import React, { Component } from "react";

import DashboardLayout from "./../../../components/Layout/DashboardLayout/DashboardLayout";
import DashboardSegment from "./../../../components/Dashboard/DashboardSegment/DashboardSegment";

class Overview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: null
        };
    }

    callbackData(data) {
        this.setState({ userData: data });
    }

    render() {
        const { userData } = this.state;
        return (
            <DashboardLayout
                title="Overview"
                subtitle="View useful informations and statistics about your Account"
                dataCallback={this.callbackData.bind(this)}
            >
                <DashboardSegment
                    title="Statistics"
                    loading={userData === null}
                >
                    Overview
                </DashboardSegment>
            </DashboardLayout>
        );
    }
}

export default Overview;
