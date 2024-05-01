import React, {ReactElement} from "react";
import Event from "../Interfaces/Event";

interface PropTypes{
    eventDetails: Event;
}

const renderEventSpecificDetails = (event: Event): ReactElement | undefined => {
    if (event.data == undefined)
        return undefined
    if (event.type == "CreateEvent")
        return <div>
            <p><b>Creation Method:&nbsp;</b> {event.data.createType == "DELIVERED" ? "Delivery" : event.data.createType == "BAKED" ? "Baking" : "N/A"}</p>
            <p><b>Location:&nbsp;</b> {event.data.location ?? "N/A"}</p>
        </div>
    if (event.type == "MoveEvent")
        return <p><b>Destination:&nbsp;</b> {event.data.destination ?? "N/A"}</p>
    if (event.type == "UseEvent")
        return <div>
            <p><b>Location:&nbsp;</b> {event.data.location ?? "N/A"}</p>
            <p><b>Quantity Used:&nbsp;</b> {event.data.quantityUsed ?? "N/A"}</p>
        </div>
    return undefined
}

const EventDetailsWidget = (props: PropTypes): ReactElement => {
    const event = props.eventDetails;

    return <div className={"TP-event-details-widget"}>
        <h3>Event Details</h3>
        <p><b>Timestamp:&nbsp;</b> {event.timestamp ?? "N/A"}</p>
        <p><b>Event Type:&nbsp;</b> {event.type ?? "N/A"}</p>
        <p><b>Author:&nbsp;</b> {event.userResponsible ?? "N/A"}</p>
        {renderEventSpecificDetails(event)}
    </div>
}

export default EventDetailsWidget;