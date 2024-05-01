import EventHistoryWidget from "./EventHistoryWidget";
import EventDetailsWidget from "./EventDetailsWidget";
import React, {useState} from "react";
import Event from "../Interfaces/Event";

interface PropTypes {
    selectedProductID: number | null;
}

const EventsWidget = (props: PropTypes) => {
    const [eventDetails, setEventDetails] = useState<Event>({});

    return <div className="TP-events-wrapper">
        <EventHistoryWidget
            setEventDetails={setEventDetails}
            selectedProductID={props.selectedProductID}
        />
        <EventDetailsWidget eventDetails={eventDetails} />
    </div>
}

export default EventsWidget;