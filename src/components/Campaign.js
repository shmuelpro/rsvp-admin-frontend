import React, { useState, useEffect, useRef } from 'react'
import { numberSortAscending, numberSortDescending, checkSortSelection } from './Sort';
import { createCampaignURL } from '../helpers'


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


export default function Campaign(props) {


    const [guests, setGuests] = useState(props.guests);
    const [sortType, setSortType] = useState("none");
    const prevSortType = usePrevious(sortType);
    const [sortDirectionBool, setSortDirectionBool] = useState(false);



    useEffect(() => {


        setGuests(selectSort(sortType,sortDirectionBool, props.guests))

    }, [props.guests])


    useEffect(() => {


        var x = selectSort(sortType, sortDirectionBool, guests);
        console.log(x);
        setGuests(x)

    }, [sortType, sortDirectionBool])


    function sort(type) {
        var direction =  checkSortSelection(prevSortType, type, sortDirectionBool);
        console.log(type);
        console.log(direction)
        setSortDirectionBool(direction);
        setSortType(type)
    }




    function selectSort(type, direction, array) {

        console.log(array)

        var newArray = [...array];
        var directionName = direction ? "ascending" : "descending";

        switch (`${type}-${directionName}`) {
            case "state-descending":
                return newArray.sort((guesta, guestb) => { return numberSortDescending(guesta.state, guestb.state) });
            case "state-ascending":
                return newArray.sort((guesta, guestb) => { return numberSortAscending(guesta.state, guestb.state) });
            case "none-ascending":
                return array;
            case "none-descending":
                return array;
            default:
                return array;
        }


    }




    function getState(state) {
        var style = { padding: "3px", borderRadius: "4px" };
        switch (parseInt(state)) {
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
            <h1 className="is-size-1">{props.name}</h1>
            <h1 className="is-size-3">mailchimp URL: {createCampaignURL(props)}/</h1>
            <div>Total Count {props.guests.length}</div>
            <table className="table">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Email </th>
                        <th> Name </th>
                        <th onClick={() => { sort("state") }}>  Status</th>
                        <th>Responded On</th>

                    </tr>

                </thead>
                <tbody>

                    {guests.map((guest, i) => {
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

Campaign.defaultProps = {
    guests: [],
    name: ""
}