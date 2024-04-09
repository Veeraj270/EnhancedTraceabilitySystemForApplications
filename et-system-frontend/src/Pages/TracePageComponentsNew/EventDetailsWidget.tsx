import React, {useState} from "react";
import {EventDetails} from "./Interfaces";

interface PropTypes {
    eventDetails: EventDetails;
}

const EventDetailsWidget = (props: PropTypes) => {
    const eventDetails = props.eventDetails;

    return (
        <div className={"TP-event-details-widget"}>
            <h3>Event Details</h3>
            <p><b>Timestamp:&nbsp;</b> {eventDetails.timestamp ? eventDetails.timestamp : "N/A"}</p>
            <p><b>Event Type:&nbsp;</b> {eventDetails.type ? eventDetails.type : "N/A"}</p>
            <p><b>Author:&nbsp;</b> {eventDetails.author ? eventDetails.author : "N/A"}</p>
        </div>
    )
}

export default EventDetailsWidget;