import React from 'react';
import {Statistic} from 'semantic-ui-react'
import PropTypes from 'prop-types';

import Weather from '../weather/Weather';
import './AppHeader.scss';

const AppHeader = ({teams, currentTeamIndex}) => {
    if(!teams.length){
        return null
    }

    const teamPoints = teams.map(team => Object.values(team.events).reduce((total, num) => total + num, 0))
    return (
        <div className="app-header">
            <Statistic>
                <Statistic.Value>{Math.max(...teamPoints)}</Statistic.Value>
                <Statistic.Label>Leader points</Statistic.Label>
            </Statistic>
            <Weather />
            <Statistic>
                <Statistic.Value>{teamPoints[currentTeamIndex]}</Statistic.Value>
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
