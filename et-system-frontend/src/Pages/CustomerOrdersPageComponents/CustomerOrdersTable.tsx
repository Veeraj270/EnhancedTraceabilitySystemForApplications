import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from "react";
import {Link} from "react-router-dom";
const CustomerOrdersTable = () => {
    const [data, setData] = useState([]);



    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: ({ getValue}) => {
                const value = getValue();
                return <Link to={`/customerorderdetails/${value}`}>{value}</Link>
            },

        },
        {
            header: 'Client',
            accessorKey: 'client',
        },

        {
          header: 'Date',
          accessorKey: "date",
        },

        {
            header:'Order Size',
            accessorFn: (row) => row.finalProducts.reduce((total, product) => total + product.quantity, 0),
            id: 'finalProductsQuantityTotal',
        },
    ], []);

    type FinalProduct = {
        id: number;
        label: string;
        cost: number;
        quantity: number;
    }

    type CustomerOrder = {
        id: number;
        client: string;
        date: string;
        finalProducts: FinalProduct[];
    };

    const fetchData = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8080/api/customerorders/fetch');
            console.log("Fetch Request!")
            if (!response.ok) {
                throw new Error("Fetch customerOrders request was not ok");
            }
            const customerOrders: CustomerOrder[] = await response.json();
            setData(customerOrders);
            console.log(customerOrders)
        } catch (error) {
            console.error("Error occurred within fetchData(): ", error);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            {data.length > 0 ? (
                <table>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
};

export default CustomerOrdersTable;