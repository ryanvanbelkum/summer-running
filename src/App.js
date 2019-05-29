import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { debounce, sortBy } from "lodash";

import AppHeader from "./appHeader/AppHeader";
import Loader from "./loader/Loader";
import Login from "./login/Login";
import TeamCard from "./teamCard/TeamCard";
import firestore, { auth } from "./firebase";
import "../node_modules/semantic-ui-css/semantic.css";
import "./App.scss";

function App() {
  let vh = window.innerHeight * 0.01;
  const resize = debounce(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, 500);
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  window.addEventListener("resize", resize);

  const [teams, setTeams] = useState([]);
  const [items, setItems] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const getCurrentTeam = () => {
    return teams.find(team => team.id === currentTab) || teams[0];
  };
  useEffect(() => {
    firestore.collection("teams").onSnapshot(snapshot => {
      const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeams(teams);
    });
    firestore.collection("items").onSnapshot(snapshot => {
      const incomingItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(sortBy(incomingItems, ["rate", "name"]).reverse());
    });
  }, []);

  auth.onAuthStateChanged(function(user) {
    setLoggedIn(!!user);
    resize();
  });

  const currentTeam = getCurrentTeam();
  return (
    <div className="app-container">
      {teams.length ? (
        <React.Fragment>
          <header>
            <AppHeader teams={teams} currentTeam={currentTeam} />
            <Menu pointing secondary>
              {teams.map(team => (
                <Menu.Item
                  key={team.id}
                  active={currentTeam.id === team.id}
                  onClick={() => setCurrentTab(team.id)}
                  style={{
                    borderColor:
                      currentTeam.id === team.id && team.borderColorHash
                  }}
                >
                  <span
                    className="menu__item"
                    style={{
                      backgroundColor: team.primaryColorHash,
                      border: `2px solid ${team.borderColorHash}`
                    }}
                  />
                </Menu.Item>
              ))}
            </Menu>
          </header>
          <TeamCard isAuthed={loggedIn} team={currentTeam} items={items} />
          <Login isAuthed={loggedIn} />
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
