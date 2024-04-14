import {useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";

type Contract = {
    id: number;
    client: string;
    duration: string;
    frequency: string;

};

const ContractsTable = () => {
    const [data, setData] = useState<Contract[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Client',
            accessorKey: 'client',
        },
        {
            header:'Duration',
            accessorKey: 'duration',
        },
        {
            header: 'Frequency',
            accessorKey: 'frequency',
        }
    ], [])

    const fetchData = async () => {
        setIsLoading(true);
        try{
            const response = await fetch('http://localhost:8080/api/contracts/fetch');
            if (!response.ok) {
                throw new Error("Fetch Contracts not ok");
            }
            const contracts = await response.json();
            setData(contracts);
        } catch (error) {
            console.error("Error fetching contracts: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            {isLoading? (
                <p>Loading...</p>
            ) : data.length > 0 ? (
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
                <p>No contracts found</p>
            )}
        </div>
    )
};
export default ContractsTable;