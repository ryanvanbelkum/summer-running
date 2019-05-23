import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from 'semantic-ui-react';

import TeamCardRow from './row/TeamCardRow';

const TeamCard = ({team, items, isAuthed}) => {
    return (
        <div>
            <Grid>
                <Grid.Row>
                    {isAuthed && <Grid.Column width={3} textAlign="center">remove</Grid.Column>}
                    <Grid.Column width={isAuthed ? 6 : 12}>name</Grid.Column>
                    <Grid.Column width={2} textAlign="right">worth</Grid.Column>
                    <Grid.Column width={2} textAlign="right">total</Grid.Column>
                    {isAuthed && <Grid.Column width={3} textAlign="center">add</Grid.Column>}
                </Grid.Row>
                {items.map(item => <TeamCardRow key={item.name} item={item} team={team} isAuthed={isAuthed} />)}
            </Grid>
        </div>
    );
};

TeamCard.propTypes = {
    team: PropTypes.object,
    items: PropTypes.array,
    isAuthed: PropTypes.bool
};

export default TeamCard;
