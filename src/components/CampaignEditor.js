import React, { useState, useRef, useEffect } from 'react';

export default function CampaignEditor(props) {

    const [inputName, setInputName] = useState(props.campaign.name);
    const [inputDate, setInputDate] = useState(props.campaign.date);
    const [inputDescription, setInputDescription] = useState(props.campaign.description);
    const [buttonText, setButtonText] = useState("Loading");
    const [title, setTitle] = useState("Loading");
    const [displayNotification,setDisplayNotification] = useState(false)


    const [buttonAccept,setButtonAccept] = useState(false);
    const [buttonMaybe,setButtonMaybe] = useState(false);
    const [buttonDecline,setButtonDecline] = useState(false);

    useEffect(() => {


        if (props.state === "NEW") {
            setButtonText("Create")
            setTitle("Create Campaign")
        }
        else {
            setButtonText("Update")
            setTitle("Edit Campaign")
        }

        var buttonNum = props.campaign.buttonsNum;
        if(!buttonNum ){
            buttonNum= 0;
          }
          var accept = buttonNum & 1;
          var maybe = buttonNum & 2;
          var decline = buttonNum & 4;

          setButtonAccept(accept > 0);
          setButtonMaybe(maybe > 0);
          setButtonDecline(decline > 0);
      
       

        setDisplayNotification(false)

    }, [])


    function prepareButtons() {

        var value = 0;
        value += buttonAccept ? 1 : 0;
        value += buttonMaybe ? 2 : 0;
        value += buttonDecline ? 4 : 0;
        return value;
    }

    useEffect(() => {
        
        if(props.notification !== ""){
            setDisplayNotification(true)
        }else{
            setDisplayNotification(false)
        }
       

       const to =  setTimeout(() => {
          props.clearNotification();
        }, 10000)

        return (()=>{clearTimeout(to)})
    }, [props.notification])

    function aggregateCampaign() {


        setButtonText("Working...")
        var campaign = {...props.campaign};
        Object.assign(campaign,{ name: inputName, date: inputDate, description: inputDescription, buttonsNum: prepareButtons() })

        props.edit(campaign)


    }


    return (<div>
        <h1 className="is-size-1">{title}</h1>
        <div className={`floating-notification notification is-success ${displayNotification?"":"is-hidden"}`}>
            <button className="delete" onClick={()=>{props.clearNotification()}}></button>
            {props.notification}

        </div>
        <div className="columns">
            <div className="column">Name:  <input onChange={(e) => { setInputName(e.target.value) }} value={inputName} className="input is-medium" type="text" ></input></div>
            <div className="column">Date:  <input onChange={(e) => { setInputDate(e.target.value) }} className="input is-medium" type="text" ></input></div>
        </div>
        <div className="columns">
            <div className="column has-background-success has-text-white">
                <label className="checkbox ">
                    <input onChange={(e) => { setButtonAccept(e.target.checked) }} checked={buttonAccept} type="checkbox" />
                    Accept
                </label>
            </div>
            <div className="column has-background-warning">
                <label className="checkbox ">
                    <input onChange={(e) => { setButtonMaybe(e.target.checked) }} checked={buttonMaybe}  type="checkbox" />
                    Maybe
                </label>
            </div>
            <div className="column has-background-danger has-text-white">
                <label className="checkbox">
                    <input onChange={(e) => { setButtonDecline(e.target.checked) }} checked={buttonDecline}  type="checkbox" />
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