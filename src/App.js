import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import SideNAV from './components/SideNAV'
import DisplayGuests from './components/DisplayGuests';
import Campaigns from './components/Campaigns';
import Store from './Store'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";




function App() {
  const storeContainer = useRef(new Store("admin", { inJSON: true }));
  const [guests, setGuests] = useState([]);

  useEffect(() => {

    storeContainer.current.Init({ load: "/" })

    storeContainer.current.load().then((data) => {

      setGuests(data.guests);


    })



  }, [])



  return (
    <div className="App">
      <Router>
        <div className="columns">
          <div className="column is-one-fifth">
            <SideNAV />
          </div>
          <div className="column">
            <Switch>
              <Route path="/campaigns">
                <Campaigns />
              </Route>
              <Route path="/guests">
                <DisplayGuests guests={guests} />
              </Route>
            </Switch>

          </div>

        </div>
      </Router>
    </div>
  );
}

export default App;
