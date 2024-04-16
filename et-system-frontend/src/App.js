import './index.css';
import Sidebar from './components/Sidebar'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductsPage from "./Pages/ProductsPage";
import TraceabilityPage from "./Pages/TraceabilityPage";
import AddProductsPage from "./Pages/AddProductsPage";
import EditProductPage from "./Pages/EditProductPage";

import TakeDeliveryPage from "./Pages/TakeDeliveryPage";
import CustomerOrdersPage from "./Pages/CustomerOrdersPage";
import DeliveriesOverviewPage from "./Pages/DeliveriesOverviewPage";
import FinalProductPage from "./Pages/FinalProductPage";
import RecipesPage from "./Pages/RecipesPage";
import AddRecipePage from "./Pages/AddRecipePage";
import BakingSystemPage1 from "./Pages/BakingSystemPage1";
import BakingSystemPage2 from "./Pages/BakingSystemPage2";

function App() {
    return (
        <Router>
            <div className="container">
                <Sidebar/>
                <Routes>
                    <Route path={"/products"} element={<ProductsPage/>} >

                    </Route>
                    <Route path={"/traceability"} element={<TraceabilityPage/>}>

                    </Route>
                    <Route path={"/take-delivery"} element={<TakeDeliveryPage/>}>

                    </Route>
                    <Route path={"/deliveries"} element={<DeliveriesOverviewPage/>}>
                    </Route>

                    <Route path={"/recipes"} element={<RecipesPage/>}>
                    </Route>

                    <Route path={"/add-recipe"} element={<AddRecipePage/>}>
                    </Route>

                    <Route path={"/add"} element={<AddProductsPage/>}>
                    </Route>

                    <Route path={"/edit-product/:id"} element={<EditProductPage/>}>
                    </Route>

                    <Route path={"/customer-orders"} element={<CustomerOrdersPage/>}>
                    </Route>

                    <Route path={"/customerorderdetails/:orderId"} element={<FinalProductPage/>}>
                    </Route>

                    <Route path={"baking-system-1"} element={<BakingSystemPage1/>}>
                    </Route>

                    <Route path={"baking-system-page-2"} element={<BakingSystemPage2/>}>
                    </Route>

                </Routes>
            </div>
        </Router>
    )
}

export default App