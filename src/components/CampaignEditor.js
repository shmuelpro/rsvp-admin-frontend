import React, { useState, useRef, useEffect } from 'react';

export default function CampaignEditor(props) {

    const [inputName, setInputName] = useState(props.name);
    const [inputDate, setInputDate] = useState(props.date);
    const [inputDescription, setInputDescription] = useState(props.description);
    const [buttonText, setButtonText] = useState();
    const [displayNotification,setDisplayNotification] = useState(false)


    const buttonAccept = useRef();
    const buttonMaybe = useRef();
    const buttonDecline = useRef();

    useEffect(() => {

        if (props.state === "NEW") {
            setButtonText("Create")
        }
        else {
            setButtonText("Update")
        }
        console.log(props)

        setDisplayNotification(false)

    }, [])


    function prepareButtons() {

        var value = 0;
        value += buttonAccept.current.checked ? 1 : 0;
        value += buttonMaybe.current.checked ? 2 : 0;
        value += buttonDecline.current.checked ? 4 : 0;
        return value;
    }

    useEffect(() => {
        console.log(props.notification)
        if(props.notification !== ""){
            setDisplayNotification(true)
        }
       

        setTimeout(() => {
            setDisplayNotification(false)
        }, 10000)

    }, [props.notification])

    function aggregateCampaign() {


        setButtonText("Working...")

        props.edit({ name: inputName, date: inputDate, description: inputDescription, buttonsNum: prepareButtons() })


    }


    return (<div>
        <h1 className="is-size-1">Create Campaign</h1>
        <div className={`floating-notification notification is-success ${displayNotification?"":"is-hidden"}`}>
            <button className="delete" onClick={()=>{setDisplayNotification(false)}}></button>
            {props.notification}

        </div>
        <div className="columns">
            <div className="column">Name:  <input onChange={(e) => { setInputName(e.target.value) }} value={inputName} className="input is-medium" type="text" ></input></div>
            <div className="column">Date:  <input onChange={(e) => { setInputDate(e.target.value) }} className="input is-medium" type="text" ></input></div>
        </div>
        <div className="columns">
            <div className="column has-background-success has-text-white">
                <label className="checkbox ">
                    <input ref={buttonAccept} type="checkbox" />
                    Accept
                </label>
            </div>
            <div className="column has-background-warning">
                <label className="checkbox ">
                    <input ref={buttonMaybe} type="checkbox" />
                    Maybe
                </label>
            </div>
            <div className="column has-background-danger has-text-white">
                <label className="checkbox">
                    <input ref={buttonDecline} type="checkbox" />
                    Decline
                </label>
            </div>
        </div>
        <div>
            <div className="columns">
                <div className="column">
                    <textarea onChange={(e) => { setInputDescription(e.target.value) }} className="textarea" placeholder="Description" rows="10"></textarea>
                </div>
            </div>
            <div className="columns">

                {props.state === 'EDITING' && (
                    <div className="column">
                        <button onClick={aggregateCampaign} className="button is-warning">{buttonText}</button>
                    </div>
                )}
                {props.state === 'NEW' && (
                    <div className="column">
                        <button onClick={aggregateCampaign} className="button is-success">{buttonText}</button>
                    </div>
                )}
            </div>



        </div>

    </div>)
}

CampaignEditor.defaultProps = { name: "", date: "", description: "" }