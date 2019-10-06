import React from 'react'


export default function DisplayGuests(props) {



    function getState(state) {
        var style = { padding: "3px", borderRadius: "4px" };
        switch (state) {
            case 0:
                return <span style={style} className="has-background-info has-text-white"> Not Selected</span>;
            case 1:
                return <span style={style} className="has-background-success"> Coming</span>;
            case 2:
                return <span style={style} className="has-background-warning"> Maybe</span>;
            case 3:
                return <span style={style} className="has-background-danger">Not Coming</span>;
        }

    }

    return (

        <React.Fragment>
            <h1 className="is-size-1">Campaign Name</h1>
            <div>Total Count {props.guests.length}</div>
            <table className="table">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Email </th>
                        <th> Name </th>
                        <th> Status</th>
                        <th>Responded On</th>

                    </tr>

                </thead>
                <tbody>

                    {props.guests.map((guest, i) => {
                        return (<tr key={guest.id}>
                            <td>{i + 1}</td>
                            <td>{guest.email}</td>
                            <td>{guest.name}</td>
                            <td >{getState(guest.state)}</td>
                            <td >{guest.date}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}

DisplayGuests.defaultProps = {
    guests: []
}