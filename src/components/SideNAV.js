import React,{useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link,useLocation } from "react-router-dom";



export default function SideNAV(props) {

    var location = useLocation();
    console.log(location)

    function isActive(link){

        if(location.pathname === link){

            return "is-active";
        }else{
           return  ""
        }
    }
 

    return (<aside className="menu">
        <p className="menu-label">
            Campaigns</p>
        <ul className="menu-list">
            <li><Link className={isActive("/createcampeign")} to="/createcampeign">Create campaign</Link></li>
           
            <li>
            <Link  className={isActive("/campaigns")} to="/campaigns">All campaigns</Link>
                <ul>
                    <li><a>Members</a></li>
                    <li><a>Plugins</a></li>
                    <li><a>Add a member</a></li>
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