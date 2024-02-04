import './DeliveryPageComponents/DPStylesheet.css'
import DPSearchBar from "./DeliveryPageComponents/DPSearchBar";
import DPTable from "./DeliveryPageComponents/DPTable";


const DeliveriesPage = () => {
    return (
        <div className='deliveries-page'>
            <h1>Deliveries</h1>
            <div className={'dp-region'}>
                <div className={"dp-region1"}>
                    <DPSearchBar/>
                    <DPTable/>
                </div>
                <div className={"dp-region2"}>
                    <div className={"dp-summary-buttons-div"}>
                        <div className={"dp-summary-div"}>summary</div>
                        <div className={"dp-buttons-div"}>buttons</div>
                    </div>
                    <div className={"dp-table-div-2"}>table</div>
                </div>

            </div>
        </div>
    )
}

export default DeliveriesPage
