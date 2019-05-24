import React, {useEffect, useState} from 'react';
import {Menu} from 'semantic-ui-react'

import AppHeader from './appHeader/AppHeader';
import Loader from './loader/Loader';
import Login from './login/Login';
import TeamCard from './teamCard/TeamCard';
import firestore, {auth} from './firebase';
import '../node_modules/semantic-ui-css/semantic.css';
import './App.scss';

function App() {
    const [teams, setTeams] = useState([]);
    const [items, setItems] = useState([]);
    const [currentTab, setCurrentTab] = useState(teams);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        firestore.collection("teams").onSnapshot((snapshot) => {
            const teams = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
            setTeams(teams);
            setCurrentTab(teams[0].teamName)
        });
        firestore.collection("items").onSnapshot((snapshot) => {
            setItems(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})));
        });
    }, []);

    auth.onAuthStateChanged(function (user) {
        setLoggedIn(!!user);
    });

    const handleTabChange = (e, {name}) => setCurrentTab(name);
    const currentTeam = teams.find(team => team.teamName === currentTab);
    return (
        <div className="app-container">
            {!teams.length && <Loader />}
            <header>
                <AppHeader teams={teams} currentTeamIndex={teams.findIndex(team => team.teamName === currentTab) || 0}/>
                <Menu pointing secondary>
                    {teams.map(team => (
                            <Menu.Item
                                key={team.teamName}
                                name={team.teamName}
                                active={currentTab === team.teamName}
                                onClick={handleTabChange}
                            />
                        )
                    )}
                </Menu>
            </header>
            <TeamCard isAuthed={loggedIn} team={currentTeam} items={items}/>
            <Login isAuthed={loggedIn}/>
        </div>
    );
}

export default App;
