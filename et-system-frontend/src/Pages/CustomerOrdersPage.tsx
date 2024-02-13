import FinalProductsTable from "./CustomerOrdersPageComponents/FinalProductsTable";


const CustomerOrdersPage = () => {
    return (
        <div className='customer-orders-page'>
            <h1>Customer Orders</h1>
            <h3>All Orders:</h3>
            <FinalProductsTable/>
        </div>
    )
}

export default CustomerOrdersPage