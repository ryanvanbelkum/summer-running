import React, {useEffect, useState} from 'react';
import {Tab} from 'semantic-ui-react'

import AppHeader from './appHeader/AppHeader';
import Login from './login/Login';
import TeamCard from './teamCard/TeamCard';
import firestore, {auth} from './firebase';
import '../node_modules/semantic-ui-css/semantic.css';
import './App.scss';

function App() {
    const [teams, setTeams] = useState([]);
    const [items, setItems] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        firestore.collection("teams").onSnapshot((snapshot) => {
            setTeams(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})));
        });
        firestore.collection("items").onSnapshot((snapshot) => {
            setItems(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})));
        });
    }, []);

    auth.onAuthStateChanged(function(user) {
        setLoggedIn(!!user);
    });

    const handleTabChange = (e, {activeIndex}) => setCurrentTab(activeIndex);
    const panes = teams.map(team => (
        {
            menuItem: team.teamName,
            render: () => <Tab.Pane attached={false}><TeamCard isAuthed={loggedIn} team={team} items={items}/></Tab.Pane>
        })
    );
    return (
        <div className="app-container">
            <AppHeader teams={teams} currentTeamIndex={currentTab} />
            <Tab className="app-container__panes" menu={{secondary: true, pointing: true}} panes={panes} activeIndex={currentTab}
                 onTabChange={handleTabChange}/>
            <Login isAuthed={loggedIn} />
        </div>
    );
}

export default App;
