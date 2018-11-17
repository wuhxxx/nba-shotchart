import React, { Component } from "react";
import { ShotChart } from "./ShotChart.js";

export class Main extends Component {
    render() {
        return (
            <div>
                <ShotChart playerId={2544} />
            </div>
        );
    }
}
