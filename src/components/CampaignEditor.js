import React, { useState } from 'react';

export default function CampaignEditor(props) {

    const [inputName, setInputName] = useState(props.name);
    const [inputDate, setInputDate] = useState(props.date);
    const [inputDescription, setInputDescription] = useState(props.description);



    function aggrigateCampaign() {


        props.edit({ name: inputName, date: inputDate, description: inputDescription })

    }


    return (<div>
        <h1 className="is-size-1">Create Campaign</h1>
        <div className="columns">
            <div className="column">Name:  <input onChange={(e) => { setInputName(e.target.value) }} value={inputName} className="input is-medium" type="text" ></input></div>
            <div className="column">Date:  <input onChange={(e) => { setInputDate(e.target.value) }} className="input is-medium" type="text" ></input></div>
        </div>
        <div>
            <div className="columns">
                <div className="column">
                    <textarea onChange={(e) => { setInputDescription(e.target.value) }} className="textarea" placeholder="Description" rows="10"></textarea>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <button onClick={aggrigateCampaign} className="button is-success">Create</button>
                </div>
            </div>

        </div>
        <div class="is-hidden notification is-success">
            <button class="delete"></button>
            {props.notification}

        </div>
    </div>)
}

CampaignEditor.defaultProps = { name: "", date: "", description: "" }