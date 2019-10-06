import React from 'react'


export default function Campaigns(props) {





    return (

        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th>Date Created</th>
                        <th> Status </th>

                    </tr>

                </thead>
                <tbody>

                    {props.campaigns.map((campaign, i) => {
                        return (<tr key={campaign.id}>
                            <td>{campaign.id}</td>
                            <td>{campaign.name}</td>
                            <td >{campaign.date}</td>
                            <td >{campaign.state}</td>

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