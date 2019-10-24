import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import SideNAV from './components/SideNAV'
import Guests from './components/Guests';
import Campaigns from './components/Campaigns';
import Campaign from './components/Campaign';
import CampaignEditor from './components/CampaignEditor'
import { createCampaignURL } from './helpers'
import Store from './Store'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";




function App() {
  const guestsStore = useRef(new Store("guests"));
  const campaignsStore = useRef(new Store("campaigns", { inJSON: true, JSONTable: "campaigns" }));
  const [guests, setGuests] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {

    campaignsStore.current.Init({ load: "/campaigns", create: "/campaigns", update: "/campaigns" })
    guestsStore.current.Init({ load: "/guests" })

    campaignsStore.current.load().then(() => {
      var data = campaignsStore.current.getData();

      setCampaigns(data);
    })


    guestsStore.current.load().then(() => {
      var data = guestsStore.current.getData();
      console.log("data")
      console.log(data)
      setGuests(data)
    })
  }, [])





  function getCampaign(id) {
    console.log(id)
    return campaignsStore.current.get(id)
  }

  function editCampaign(data) {





    if (data.id) {
      campaignsStore.current.update(data);
    } else {
      campaignsStore.current.create(data).then((da) => {

        setNotification("Your Campaign was created successfully. Your URL is " + createCampaignURL(da))

      }).catch((error) => {
        setNotification("Failed");
      })
    }
  }


  return (
    <div className="App">
      <Router>
        <div className="columns">
          <div className="column is-one-fifth">
            <SideNAV campaigns={campaigns} />
          </div>
          <div className="column">
            <Switch>
              <Route exact path="/">
                <div>
                  Welcome to RSVP Admin. Select a menu option
              </div>

              </Route>
              <Route exact path="/createcampaign">
                <CampaignEditor notification={notification} state="NEW" edit={editCampaign.bind(this)} />
              </Route>
              <Route path="/createcampaign/:campaign" component={(props) => {

                var campaign = getCampaign(props.match.params.campaign);
                console.log("Creating cam  p")
                console.log(campaign)
                return <CampaignEditor {...props} {...campaign} notification={notification} state="EDITING" edit={editCampaign.bind(this)} />

              }} />

              <Route path="/campaigns" component={(props) => {

         
                return <Campaigns {...props}  campaigns={campaigns} />

              }} />
        
              <Route path="/guests">
                <Guests guests={guests} />
              </Route>
              <Route path="/campaign/:campaign" component={(props) => {

                var campaign = getCampaign(props.match.params.campaign);
                console.log(campaign)
                return <Campaign {...props} {...campaign} />

              }} />


            </Switch>

          </div>

        </div>
      </Router>
    </div>
  );
}

export default App;
