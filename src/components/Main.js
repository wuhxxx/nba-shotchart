import React from "react";
import nba from "nba";
import { Profile } from "./Profile";
import { DataViewContainer } from "./DataViewContainer";

export class Main extends React.Component {
    state = {
        playerId: nba.findPlayer("Stephen Curry").playerId,
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
                console.log("playerInfo", playerInfo);
                this.setState({ playerInfo });
            })
            .catch(e => console.log(e));

        // const pid = nba.findPlayer("Rudy Gay").playerId;
        // setTimeout(() => {
        //     this.setState({ playerId: pid });
        // }, 10000);
    }

    render() {
        return (
            <div className="main">
                {this.state.playerInfo ? (
                    <Profile playerInfo={this.state.playerInfo} />
                ) : null}
                <DataViewContainer playerId={this.state.playerId} />
            </div>
        );
    }
}
