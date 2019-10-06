import React,{useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link,useLocation } from "react-router-dom";



export default function SideNAV(props) {

    var location = useLocation();


    function isActive(link){

        if(location.pathname === link){

            return "is-active";
        }else{
           return  ""
        }
    }
 
    console.log(props.campaigns)

    return (<aside className="menu">
        <p className="menu-label">
            Campaigns</p>
        <ul className="menu-list">
            <li><Link className={isActive("/createcampaign")} to="/createcampaign">Create Campaign</Link></li>
           
            <li>
            <Link  className={isActive("/campaigns")} to="/campaigns">All Campaigns</Link>
                <ul>
                    {
                        props.campaigns.map((campaign)=>{
                          return   <li key={campaign.id}><Link  className={isActive("/campaign/"+campaign.id)} to={"/campaign/"+campaign.id}>{campaign.name}</Link></li>
                        })
                    }                 
                  
                </ul>
            </li>
        </ul>
        <p className="menu-label">
            Guests </p>
        <ul className="menu-list">
        <Link className={isActive("/guests")} to="/guests">Guests</Link>
    

        </ul>

    </aside>)
}