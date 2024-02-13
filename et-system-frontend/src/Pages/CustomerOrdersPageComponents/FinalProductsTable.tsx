import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from "react";
const FinalProductsTable = () => {
    const [data, setData] = useState([]);



    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: ({ getValue }) => {
                const value = getValue();
            },
        },
        {
            header: 'Label',
            accessorKey: 'label',
        },
        {
            header: 'Cost',
            accessorKey: 'cost',
        },
        {
            header: 'Recipe',
            accessorKey: 'recipe',
        },
    ], []);

    type FinalProduct = {
        id: number;
        label: string;
        cost: number;
        recipe: string;
    };

    const fetchData = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8080/api/finalproducts/fetch');
            console.log("Fetch Request!")
            if (!response.ok) {
                throw new Error("Fetch finalproducts request was not ok");
            }
            const finalProducts: FinalProduct[] = await response.json();
            setData(finalProducts);
            console.log(finalProducts)
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
                <p>No data available</p>
            )}
        </div>
    );
};

export default FinalProductsTable;