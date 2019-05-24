import React from 'react';
import firestore from '../../firebase';
import {Button, Table} from 'semantic-ui-react';

import './TeamRowCard.scss';

const TeamCardRow = ({item, team, isAuthed}) => {
    const update = (add) => {
        firestore.collection("teams")
            .doc(team.id)
            .update(add
                ? {[`events.${item.id}`]: (team.events[item.id] || 0) + parseInt(item.rate)}
                : {[`events.${item.id}`]: (team.events[item.id] || 0) - parseInt(item.rate)})
    };

    return (
        <Table.Row>
            {isAuthed && <Table.Cell textAlign="center"><Button circular icon="minus" onClick={() => update(false)} /></Table.Cell>}
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell textAlign="right">{item.rate}</Table.Cell>
            <Table.Cell textAlign="right">{team.events[item.id] || 0}</Table.Cell>
            {isAuthed && <Table.Cell textAlign="center"><Button circular icon="add" onClick={() => update(true)} primary /></Table.Cell>}
        </Table.Row>
    );
};

export default TeamCardRow;
