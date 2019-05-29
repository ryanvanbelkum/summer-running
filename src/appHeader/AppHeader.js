import React from "react";
import classNames from "classnames";
import { Statistic } from "semantic-ui-react";
import PropTypes from "prop-types";

import Weather from "../weather/Weather";
import "./AppHeader.scss";

const AppHeader = ({ teams, currentTeam }) => {
  if (!teams.length) {
    return null;
  }

  const ranks = teams.map(team => ({
    pts: Object.values(team.events).reduce((total, num) => total + num, 0),
    ...team
  }));
  const leaderPts = Math.max(...ranks.map(team => team.pts));
  const leaderName = ranks.find(team => team.pts === leaderPts).teamName;
  const time = new Date().getHours();
  const nightTime = time <= 6 || time >= 21;
  const currentTeamRank = ranks.find(rank => rank.id === currentTeam.id);
  return (
    <div
      className={classNames("app-header", { "app-header--night": nightTime })}
    >
      <Statistic size="small">
        <Statistic.Value>{leaderPts}</Statistic.Value>
        <Statistic.Label>Leader points</Statistic.Label>
        <Statistic.Label>({leaderName})</Statistic.Label>
      </Statistic>
      <Weather />
      <Statistic size="small">
        <Statistic.Value>{currentTeamRank.pts}</Statistic.Value>
        <Statistic.Label>Team points</Statistic.Label>
      </Statistic>
    </div>
  );
};

AppHeader.propTypes = {
  teamPts: PropTypes.number,
  winnerPts: PropTypes.number
};

export default AppHeader;
