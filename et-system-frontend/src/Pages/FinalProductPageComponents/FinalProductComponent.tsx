import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from "react";
import { useParams} from "react-router-dom";
const FinalProductTable = () => {
    const {orderId} = useParams<{ orderId : string}>();
    const [data, setData] = useState([]);



    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Product',
            accessorKey: 'label',
        },

        {
            header: 'Quantity',
            accessorKey: "quantity",
        },

        {
            header: 'Cost',
            accessorKey: 'cost',
        },
    ], []);

    type FinalProduct = {
        id: number;
        label: string;
        cost: number;
        quantity: number;
    }



    const fetchData = async (): Promise<void> => {
        try {
            const response = await fetch(`http://localhost:8080/api/customerorders/fetch-by-id/${orderId}`);
            console.log("Fetch Request!")
            if (!response.ok) {
                throw new Error("Fetch customerOrders request was not ok");
            }
            const {finalProducts}: {finalProducts:FinalProduct[]} = await response.json();
            setData(finalProducts);
            console.log(finalProducts)
        } catch (error) {
            console.error("Error occurred within fetchData(): ", error);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, [orderId]);

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

export default FinalProductTable;