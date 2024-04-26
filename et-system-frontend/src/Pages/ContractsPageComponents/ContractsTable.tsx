import {useEffect, useMemo, useState} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";
import ContractsModal from "./ContractsModal";

type Contract = {
    id: number;
    client: string;
    duration: string;
    frequency: string;
    finalProducts: FinalProduct[];
    dates: Date[];

};

type FinalProduct = {
    id: number;
    label: string;
    cost: number;
    quantity: number;
};

const ContractsTable = () => {
    const [data, setData] = useState<Contract[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentContract, setCurrentContract] = useState<Contract | null>(null);
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
        },
        {
            header: 'Dates',
            id: 'dates',
            cell: ({row}) => (
                isLoading
                    ? <p>Loading...</p>
                    : <button onClick={() => handleGenerateClick(row.original)}> "Handle Orders" </button>
            ),

        },
    ], [])

    const handleGenerateClick = async (contract: Contract) => {
        setCurrentContract(contract);
        setIsLoading(true);

        try {
            setCurrentContract(contract);
            setShowModal(true);
        } catch (error) {
            console.error(error);
        } finally{
            setIsLoading(false);
        }
    };

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
            {showModal && currentContract && (
                <ContractsModal
                    contract = {currentContract}
                />
            )}
        </div>
    )
};
export default ContractsTable;