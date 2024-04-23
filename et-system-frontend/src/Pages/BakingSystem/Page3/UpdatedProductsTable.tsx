import React, {useMemo} from "react"
import {flexRender, getCoreRowModel, HeaderGroup, useReactTable} from "@tanstack/react-table";

interface Table2Row{
    id: number,
    label:string,
    oldWeight: number
    newWeight: number
}

interface PropTypes{
    products: Table2Row[]
    removeProduct: (id : number) => void;
}

const UpdatedProductsTable = (props : PropTypes) => {
    //Destructure props
    const products = props.products;
    const removeProduct = props.removeProduct;

    //Methods
    const removeFromTable = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        let productId = target.getAttribute("data-id");
        if (productId){
            removeProduct(parseInt(productId, 10));
        }
    }

    //Define Columns
    const columns = useMemo(() =>[
        {
            header: 'ID',
            accessorKey: 'id',
            size: 20,
        },
        {
            header: 'Label',
            accessorKey: 'label',
            size: 50,
        },
        {
            header: 'Old Weight',
            accessorKey: 'oldWeight',
            size: 10,
        },
        {
            header: 'New Weight',
            accessorKey: 'newWeight',
            size: 10,
        },
        {
            header: "",
            accessorKey: 'actions',
            size: 10

        }],[])

    const table = useReactTable({
        data: products,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const getTemplateColumns = (headerGroup : HeaderGroup<Table2Row>): string => {
        let output  = "";
        headerGroup.headers.forEach(header => {
            output += `${header.column.getSize()}fr `
        })
        return output;
    }

    const templateColumnStyle = getTemplateColumns(table.getHeaderGroups()[0]);


    return (
        <div className={'BSP3-products-table-grid'}>
            <div className={'BSP3-table-title'}>
                <p>Updated Items</p>
            </div>
            <div className={'BSP3-products-table-headers'}>
                <table>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}
                            className={'BSP3-tr'}
                            style={{gridTemplateColumns: getTemplateColumns(headerGroup)}}
                        >
                            {headerGroup.headers.map(header =>
                                <th
                                    className={'BSP3-th'}
                                    key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            )
                            }
                        </tr>
                    ))}
                </table>
            </div>
            <div className={'BSP3-products-table-rows'}>
                <table>
                    <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}
                            className={'BSP3-tr'}
                            style={{gridTemplateColumns: templateColumnStyle}}
                        >
                            <td className={'BSP3-td'}>{row.original.id}</td>
                            <td className={'BSP3-td'}>{row.original.label}</td>
                            <td className={'BSP3-td'}>{row.original.oldWeight}</td>
                            <td className={'BSP3-td'}>{row.original.newWeight}</td>
                            <td className={'BSP3-td'}>
                                <button className={'BSP3-remove-button'} onClick={removeFromTable} data-id={row.original.id}>X</button>
                            </td>
                        </tr>))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UpdatedProductsTable