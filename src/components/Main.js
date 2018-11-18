import React, { Component } from "react";
import { ShotChart } from "./ShotChart.js";
import { Profile } from "./Profile.js";
import nba from "nba";

export class Main extends Component {
    state = {
        playerId: 201939,
        playerInfo: {}
    };

    componentDidMount() {
        nba.stats
            .playerInfo({ PlayerID: this.state.playerId })
            .then(info => {
                const playerInfo = Object.assign(
                    info.commonPlayerInfo[0],
                    info.playerHeadlineStats[0]
                );
                this.setState({ playerInfo });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="main">
                <Profile playerInfo={this.state.playerInfo} />
                <ShotChart playerId={this.state.playerId} />
            </div>
        );
    }
}
