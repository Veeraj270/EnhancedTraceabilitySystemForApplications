import './index.css';
import Sidebar from './components/Sidebar'
import HomePage from './Pages/HomePage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductsPage from "./Pages/ProductsPage";

import HelpPage from "./Pages/HelpPage";
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
import TracePage from "./Pages/TracePage";
import BakingSystemPage3 from "./Pages/BakingSystemPage3";
import BakingSystem from "./Pages/BakingSystem";
import ContractsPage from "./Pages/ContractsPage";

function App() {
    return (
        <Router>
            <div className="container">
                <Sidebar/>
                <Routes>
                    <Route path={"/products"} element={<ProductsPage/>} >
                    </Route>
                    <Route path={"/traceability"} element={<TracePage/>}>
                    </Route>
                    <Route path={"/take-delivery"} element={<TakeDeliveryPage/>}>
                    </Route>
                    <Route path={"/deliveries"} element={<DeliveriesOverviewPage/>}>
                    </Route>
                    <Route path={"/recipes"} element={<RecipesPage/>}>
                    </Route>
                    <Route path={"/add-recipe"} element={<AddRecipePage/>}>
                    </Route>
                    <Route path={"/customer-orders"} element={<CustomerOrdersPage/>}>
                    </Route>
                    <Route path={"/customerorderdetails/:orderId"} element={<FinalProductPage/>}>
                    </Route>
                    <Route path={"/baking-system"} element={<BakingSystem/>}></Route>
                    <Route path={"/contracts"} element={<ContractsPage/>}>
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App