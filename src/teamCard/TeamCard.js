import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react';

import TeamCardRow from './row/TeamCardRow';
import './TeamCard.scss';

const TeamCard = ({team, items, isAuthed}) => {
    return (
        <div className="team-card">
            {/*<Grid>*/}
            {/*    <Grid.Row>*/}
            {/*        {isAuthed && <Grid.Column width={3} textAlign="center">remove</Grid.Column>}*/}
            {/*        <Grid.Column width={isAuthed ? 6 : 12}>name</Grid.Column>*/}
            {/*        <Grid.Column width={2} textAlign="right">worth</Grid.Column>*/}
            {/*        <Grid.Column width={2} textAlign="right">total</Grid.Column>*/}
            {/*        {isAuthed && <Grid.Column width={3} textAlign="center">add</Grid.Column>}*/}
            {/*    </Grid.Row>*/}
            {/*    {items.map(item => <TeamCardRow key={item.name} item={item} team={team} isAuthed={isAuthed} />)}*/}
            {/*</Grid>*/}


            <Table basic='very' unstackable>
                <Table.Header>
                    <Table.Row>
                        {isAuthed && <Table.HeaderCell textAlign="center">remove</Table.HeaderCell>}
                        <Table.HeaderCell>name</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">worth</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">total</Table.HeaderCell>
                        {isAuthed && <Table.HeaderCell textAlign="center">add</Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map(item => <TeamCardRow key={item.name} item={item} team={team} isAuthed={isAuthed} />)}
                </Table.Body>
            </Table>
        </div>
    );
};

TeamCard.propTypes = {
    team: PropTypes.object,
    items: PropTypes.array,
    isAuthed: PropTypes.bool
};

export default TeamCard;
