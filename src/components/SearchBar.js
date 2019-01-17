import React from "react";
import { AutoComplete, Icon, Input } from "antd";
import nba from "nba";
import { PROFILE_PIC_URL_PREFIX } from "../constants.js";

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: []
    };

    handleSearch = value => {
        // nba.searchPlayers() does not really call any api from nba to search
        // it just search the local players record of npm package!
        this.setState({
            dataSource: !value
                ? []
                : nba.searchPlayers(value).map(({ fullName, playerId }) => (
                      <Option key={playerId} value={fullName}>
                          <img
                              className="player-option-img"
                              src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                              alt="playerImage"
                          />
                          <span className="player-option-label">
                              {fullName}
                          </span>
                      </Option>
                  ))
        });
    };

    onSelect = playerName => {
        this.props.loadPlayerInfo(playerName);
    };

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                dataSource={dataSource}
                className="search-bar"
                size="large"
                onSelect={this.onSelect}
                onSearch={this.handleSearch}
                placeholder="Search NBA player"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" />} />
            </AutoComplete>
        );
    }
}
