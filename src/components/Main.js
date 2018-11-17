import React, { Component } from "react";
import { ShotChart } from "./ShotChart.js";
import { Profile } from "./Profile.js";

export class Main extends Component {
    render() {
        return (
            <div className="main">
                <Profile />
                <ShotChart playerId={2544} />
            </div>
        );
    }
}
