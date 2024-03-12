import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from "react";
import {Link} from "react-router-dom";
import OrderDeliveriesModal from "./OrderDeliveriesModal";
const CustomerOrdersTable = () => {
    const [data, setData] = useState<CustomerOrder[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [plannedDeliveries, setPlannedDeliveries] = useState<PlannedDelivery[]>([]);
    const [currentOrder, setCurrentOrder] = useState<CustomerOrder | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: ({getValue}) => {
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
            header: 'DeliveryDate',
            accessorKey: "deliveryDate",
        },

        {
            header: 'Order Size',
            accessorFn: (row: {
                finalProducts: any[];
            }) => row.finalProducts.reduce((total, product) => total + product.quantity, 0),
            id: 'finalProductsQuantityTotal',
        },
        {
            header: 'Generate',
            id: 'generate',
            cell: ({row}) => (
                isLoading
                    ? <p>Loading...</p>
                    : <button onClick={() => handleGenerateClick(row.original)}></button>
            ),

        },
    ], []);

    const handleGenerateClick = async (order: CustomerOrder) => {
        setCurrentOrder(order);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auto-order/auto-gen-orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(order),
            });
            if (!response.ok) {
                throw new Error('AutoOrderAPI Gen call was not okay')
            }
            const deliveries = await response.json();
            setPlannedDeliveries(deliveries);
            setShowModal(true);
        } catch (error) {
            console.error(error);
        } finally{
            setIsLoading(false);

        }
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auto-order/auto-gen-orders/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
            })

            if(!response.ok) {
                throw new Error('AutoGen confirm call was not ok');
            }

            const result = await response.json();
            console.log("Confirm successful", result);

            setShowModal(false);
        } catch(error) {
            console.error(error);
        }

    };

    const handleCancel = async () => {
        try{
            const response = await fetch('http://localhost:8080/api/auto-order/auto-gen-orders/cancel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(!response.ok) {
                throw new Error('AutoGen cancel call was not okay');
            }

            const result = await response.json()
            console.log("Cancel successful", result);

            setShowModal(false);
        } catch(error) {
            console.error(error);
        }
    };


    type PlannedDelivery = {
      id: number;
      name: string;
      description: string;

    };

    type FinalProduct = {
        id: number;
        label: string;
        cost: number;
        quantity: number;
    };

    type CustomerOrder = {
        id: number;
        client: string;
        date: string;
        deliveryDate: string;
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
            {showModal && currentOrder && (
                <OrderDeliveriesModal
                    plannedDeliveries={plannedDeliveries}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    />
            )}
        </div>
    );
};

export default CustomerOrdersTable;