import CustomerOrdersTable from "./CustomerOrdersPageComponents/CustomerOrdersTable";


const CustomerOrdersPage = () => {
    return (
        <div className='customer-orders-page'>
            <h1>Customer Orders</h1>
            <h3>All Orders:</h3>
            <CustomerOrdersTable/>
        </div>
    )
}

export default CustomerOrdersPage