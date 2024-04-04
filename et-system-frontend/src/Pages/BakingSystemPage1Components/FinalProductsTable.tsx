import {useMemo} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";

const FinalProductsTable = ({finalProducts}) => {

    const columns = useMemo(() => [
        {
            header: "Final product",
            accessorKey: "finalProduct",
        },
        {
            header: "Quantity",
            accessorKey: "quantity"
        },
        {
            header: "Associated order",
            accessorKey: "associatedOrder"
        },
        {
            header: "Add or Delete",
            accessorKey: "addOrDelete"
        }
    ], [finalProducts])

    const table = useReactTable({
        data: finalProducts,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div>
            <table>
                <thead>

                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )

}

export default  FinalProductsTable