import EventHistoryWidget from "./EventHistoryWidget";
import EventDetailsWidget from "./EventDetailsWidget";
import React, {useState} from "react";
import {EventDetails} from "./Interfaces";

interface PropTypes {
    selectedProductID: number | null;
}

const EventsWidget = (props : PropTypes) => {
    //Event
    const [ eventDetails, setEventDetails] = useState<EventDetails>({});

    return(
        <div className={"TP-events-wrapper"}>
            <EventHistoryWidget
                setEventDetails={setEventDetails}
                selectedProductID = {props.selectedProductID}
            />
            <EventDetailsWidget eventDetails={eventDetails} />
        </div>
    )
}

export default EventsWidget;