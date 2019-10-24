import React,{useEffect} from 'react'
import {numberSortAscending} from './Sort';

export default function Campaigns(props) {


    useEffect(()=>{
console.log(props)
    },[])




    return (

        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th>Date Created</th>
                        <th> Status </th>
                        <th> Responses </th>
                        <th>  </th>

                    </tr>

                </thead>
                <tbody>

                    {props.campaigns.map((campaign, i) => {
                        return (<tr key={campaign.id}>
                            <td>{campaign.id}</td>
                            <td>{campaign.name}</td>
                            <td >{campaign.date}</td>
                            <td >{campaign.state}</td>
                            <td >{campaign.guests.length}</td>
                            <td >   <button onClick={()=>{props.history.push("/createcampaign/"+campaign.id)}} className="button is-success">Edit</button></td>

                        </tr>)
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )


}

Campaigns.defaultProps = {
    campaigns: []
}