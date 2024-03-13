import TanTable from "./ProductPageComponents/TanStackTable/TanTable";
import './ProductPageComponents/PDPStylesheet.css'
import SearchBarWidget from "./ProductPageComponents/SearchBarWidget";

const ProductsPage = () => {
    const onChange = () => {

    }
    return (
        <div className='product-database-page'>
            <h1 className={'PDP-title'}>Product Database</h1>
            <div className={"PDP-upper-container"}>
                <SearchBarWidget
                    onChange={onChange}
                />
            </div>
            <div className={"PDP-lower-container"}> </div>
        </div>
    )
}

export default ProductsPage