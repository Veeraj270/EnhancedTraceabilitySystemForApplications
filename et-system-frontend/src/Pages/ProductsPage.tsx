import PDPTable from "./ProductPageComponents/TanStackTable/PDPTable";
import './ProductPageComponents/PDPStylesheet.css'
import SearchBarWidget from "./ProductPageComponents/SearchBarWidget";

const ProductsPage = () => {

    //Related to scroll animations
    const setScrollVar = () => {
        const detailsView = document.querySelector('.PDP-details-view') as HTMLElement;

        if (detailsView) {
            detailsView.style.position = 'absolute'; // Ensure the position is set to absolute
            detailsView.style.top = `${window.scrollY}px`;
        }
    }

    window.addEventListener("scroll", setScrollVar)

    //Functions passed to child components
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
            <div className={"PDP-lower-container"}>
                <PDPTable/>
                <div className={"PDP-r-column"}>
                    <div className={"PDP-details-view"}>Details View</div>
                </div>
            </div>

        </div>
    )
}

export default ProductsPage;