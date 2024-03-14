import PDPTable from "./ProductPageComponents/TanStackTable/PDPTable";
import './ProductPageComponents/PDPStylesheet.css'
import SearchBarWidget from "./ProductPageComponents/SearchBarWidget";
import {useEffect, useState} from "react";
import PDPDetailsView from "./ProductPageComponents/PDPDetailsView";
import Product from "./Interfaces/Product"
import {Event} from "./Interfaces/Event";


const ProductsPage = () => {
    //State variables
    const nullProduct: Product = {id: -1, currentQuantity: 0, maxQuantity: 0}
    const [selected, setSelected] = useState(null);

    //Related to scroll animations
    const setScrollVar = () => {
        const detailsView = document.querySelector('.PDP-details-view') as HTMLElement;

        if (detailsView) {
            detailsView.style.position = 'absolute'; // Ensure the position is set to absolute
            detailsView.style.top = `${window.scrollY}px`;
        }
    }


    useEffect(() => {
        //Update details
        console.log(selected)

        //Update history
        if (selected !== null){
            console.log(selected);
            fetchHistory(selected.id).then((history) => {
                console.log(history);
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

    //Functions passed to child components
    const onChange = () => {

    }

    //Temp variables
    const label = "self-raising-flour-25.0-kg"

    return (
        <div className='product-database-page'>
            <h1 className={'PDP-title'}>Product Database</h1>
            <div className={"PDP-upper-container"}>
                <SearchBarWidget
                    onChange={onChange}
                />
            </div>
            <div className={"PDP-lower-container"}>
                <PDPTable
                    setSelected={setSelected}
                    selected={selected}
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