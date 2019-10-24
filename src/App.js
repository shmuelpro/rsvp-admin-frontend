import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import SideNAV from './components/SideNAV'
import Guests from './components/Guests';
import Campaigns from './components/Campaigns';
import Campaign from './components/Campaign';
import CampaignEditor from './components/CampaignEditor'
import {createCampaignURL} from './helpers'
import Store from './Store'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";




function App() {
  const guestsStore = useRef(new Store("guests"));
  const campaignsStore = useRef(new Store("campaigns", { inJSON: true,JSONTable:"campaigns" }));
  const [guests, setGuests] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [createButtonText, setCreateButtonText] = useState("Create");
  const [createNotification, setCreateNotification] = useState("Create");

  useEffect(() => {

    campaignsStore.current.Init({ load: "/campaigns",create:"/campaigns" ,update:"/campaigns" })
    guestsStore.current.Init({ load: "/guests" })

    campaignsStore.current.load().then(() => {
      var data = campaignsStore.current.getData();

      setCampaigns(data);
    })


    guestsStore.current.load().then(()=>{
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

  function editCampaign(data){

    setCreateButtonText("Working")

    if(data.id){
      campaignsStore.current.update(data);
    }else{
      campaignsStore.current.create(data).then((da)=>{
        console.log()
        setCreateButtonText("Creation Complete")
        setCreateNotification("Your Campaign was created successfully. Your URL is "+createCampaignURL(da))
        
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
              <Route path="/createcampaign">
              <CampaignEditor notification={createNotification} state="NEW" buttonText={createButtonText} edit={editCampaign.bind(this)}/>
              </Route>
              <Route path="/campaign/:campaign" component={(props) => {
                
                var campaign = getCampaign(props.match.params.campaign);
                console.log(campaign)
                return   <CampaignEditor {...props} {...campaign} notification={createNotification} state="EDITING" buttonText={createButtonText} edit={editCampaign.bind(this)}/>

              }} />
              <Route path="/campaigns">
                <Campaigns campaigns={campaigns} />
              </Route>
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
