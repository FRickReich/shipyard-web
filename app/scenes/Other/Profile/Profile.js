"use strict";

import { Link } from "react-router-dom";
import React, { Component } from "react";

import { getFromStorage } from "./../../../utils/storage";

class Profile extends Component {
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
                title="XXXX Profile"
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

export default Profile;
