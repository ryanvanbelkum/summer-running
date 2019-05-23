import React from 'react';
import firestore from '../../firebase';
import {Button, Grid} from 'semantic-ui-react';

import './TeamRowCard.scss';

const TeamCardRow = ({item, team, isAuthed}) => {
    const update = (add) => {
        firestore.collection("teams")
            .doc(team.id)
            .update(add
                ? {[`events.${item.id}`]: (team.events[item.id] || 0) + item.rate}
                : {[`events.${item.id}`]: (team.events[item.id] || 0) - item.rate})
    };

    return (
        <Grid.Row className="team-row-card" verticalAlign="middle">
            {isAuthed && <Grid.Column width={3} textAlign="center">
               <Button circular icon="minus" onClick={() => update(false)} />
            </Grid.Column>}
            <Grid.Column width={isAuthed ? 6 : 12}>
                <span>{item.name}</span>
            </Grid.Column>
            <Grid.Column width={2} textAlign="right">
                <span>{item.rate}</span>
            </Grid.Column>
            <Grid.Column width={2} textAlign="right">
                <span>{team.events[item.id] || 0}</span>
            </Grid.Column>
            {isAuthed && <Grid.Column width={3} textAlign="center">
                <Button circular icon="add" onClick={() => update(true)} primary />
            </Grid.Column>}
        </Grid.Row>
    );
};

export default TeamCardRow;
