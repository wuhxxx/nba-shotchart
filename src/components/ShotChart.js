import React from "react";
import nba from "nba";
import * as d3 from "d3";
import { hexbin } from "d3-hexbin";
import { court, shots } from "d3-shotchart";
import PropTypes from "prop-types";

window.d3_hexbin = { hexbin: hexbin }; // workaround library problem

export class ShotChart extends React.Component {
    static propTypes = {
        playerId: PropTypes.number.isRequired,
        minCount: PropTypes.number.isRequired,
        chartType: PropTypes.string.isRequired,
        displayTooltip: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            ShotData: {},
            playerId: this.props.playerId
        };
    }

    loadPlayerShotData = playerId => {
        return nba.stats
            .shots({
                PlayerID: playerId,
                Season: "2016-17"
            })
            .then(response => {
                const final_shots = response.shot_Chart_Detail.map(shot => ({
                    x: (shot.locX + 250) / 10,
                    y: (shot.locY + 50) / 10,
                    action_type: shot.actionType,
                    shot_distance: shot.shotDistance,
                    shot_made_flag: shot.shotMadeFlag
                }));
                this.setState({ ShotData: final_shots, playerId });
            });
    };

    displayShotChart = () => {
        if (this.state.ShotData) {
            const courtSelection = d3.select("#shot-chart");
            courtSelection.html("");
            const chart_court = court().width(500);
            const chart_shots = shots()
                .shotRenderThreshold(this.props.minCount)
                .displayToolTips(this.props.displayTooltip)
                .displayType(this.props.chartType);
            courtSelection.call(chart_court);
            courtSelection.datum(this.state.ShotData).call(chart_shots);
        }
    };

    componentDidMount() {
        this.loadPlayerShotData(this.props.playerId);
    }

    componentDidUpdate() {
        if (this.props.playerId !== this.state.playerId) {
            this.loadPlayerShotData(this.props.playerId);
        } else {
            this.displayShotChart();
        }
    }

    render() {
        return <div id="shot-chart" />;
    }
}
