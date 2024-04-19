import PDPTable from "./ProductPageComponents/TanStackTable/PDPTable";
import './ProductPageComponents/PDPStylesheet.css'
import SearchBarWidget from "./ProductPageComponents/SearchBarWidget";
import {useEffect, useState} from "react";
import PDPDetailsView from "./ProductPageComponents/PDPDetailsView";
import Product from "./Interfaces/Product"
import React from "react";


const ProductsPage = () => {
    //State variables
    const [selected, setSelected] = useState<Product | undefined>();
    const [filterBy, setFilterBy] = useState("");

    //Search bar contents
    const [input, setInput] = useState("");

    //Related to scroll animations
    const setScrollVar = () => {
        const detailsView = document.querySelector('.PDP-details-view') as HTMLElement;
        if (detailsView) {
            detailsView.style.top = `${window.scrollY}px`;
        }
    }

    useEffect(() => {
        //Update history
        if (selected){
            console.log(selected)
            fetchHistory(selected.id).then((history) => {
            }).catch((err) => {
                console.log("Error occurred within fetchHistory(): " + err)
            })
        }
    }, [selected]);

    const fetchHistory = async (id: number) => {
        const res = await fetch(`http://localhost:8080/api/products/fetch-product-history/${id}`);
        if (!res.ok){
            throw new Error("fetch-product-history response was not ok")
        }
        return await res.json()
    }

    window.addEventListener("scroll", setScrollVar)

    return (
        <div className='product-database-page'>
            <h1 className={'PDP-title'}>Product Database</h1>
            <div className={"PDP-upper-container"}>
                <SearchBarWidget
                    input={input}
                    setInput={setInput}
                    setFilter={setFilterBy}
                />
            </div>
            <div className={"PDP-lower-container"}>
                <PDPTable
                    setSelected={setSelected}
                    selected={selected}
                    searchBarContents={input}
                    filter={filterBy}
                />
                <div className={"PDP-r-column"}>
                    <PDPDetailsView
                        product={selected}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductsPage;