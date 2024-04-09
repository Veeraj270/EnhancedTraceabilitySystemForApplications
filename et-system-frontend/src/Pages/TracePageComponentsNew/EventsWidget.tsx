import EventHistoryWidget from "./EventHistoryWidget";
import EventDetailsWidget from "./EventDetailsWidget";
import React, {useState} from "react";
import {EventDetails} from "./Interfaces";

const EventsWidget = () => {
    const [ eventDetails, setEventDetails] = useState<EventDetails>({});

    return(
        <div className={"TP-events-wrapper"}>
            <EventHistoryWidget setEventDetails={setEventDetails}/>
            <EventDetailsWidget eventDetails={eventDetails} />
        </div>
    )
}

export default EventsWidget;