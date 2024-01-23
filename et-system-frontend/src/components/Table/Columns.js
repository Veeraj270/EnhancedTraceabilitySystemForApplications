import {Link} from "react-router-dom";

const Columns = [
    {
        Header: 'Id',
        accessor: 'id',
        Cell: ({ value }) => <Link to={`/edit-product/${value}`}>{value}</Link>
    },
    {
        Header: 'Product',
        accessor: 'label'
    },
    {
        Header: 'Current Quantity',
        accessor: 'currentQuantity'
    },
    {
        Header: 'Max Quantity',
        accessor: 'maxQuantity'
    },
    {
        Header: 'Intermediaries',
        accessor: 'intermediariesId'
    },
]

export default Columns