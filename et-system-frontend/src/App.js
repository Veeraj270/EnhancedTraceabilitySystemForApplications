import './index.css';
import Sidebar from './components/Sidebar'
import HomePage from './Pages/HomePage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductsPage from "./Pages/ProductsPage";
import TraceabilityPage from "./Pages/TraceabilityPage";
import HelpPage from "./Pages/HelpPage";
import AddProductsPage from "./Pages/AddProductsPage";
import EditProductPage from "./Pages/EditProductPage";

import TakeDeliveryPage from "./Pages/TakeDeliveryPage";
import DeliveriesOverviewPage from "./Pages/DeliveriesOverviewPage";

function App() {
    return (
        <Router>
            <div className="container">
                <Sidebar/>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}>

                    </Route>
                    <Route path={"/products"} element={<ProductsPage/>} >

                    </Route>
                    <Route path={"/traceability"} element={<TraceabilityPage/>}>

                    </Route>
                    <Route path={"deliveries/take-delivery"} element={<TakeDeliveryPage/>}>

                    </Route>
                    <Route path={"/deliveries"} element={<DeliveriesOverviewPage/>}>

                    </Route>
                    <Route path={"/help"} element={<HelpPage/>}>

                    </Route>
                    <Route path={"/add"} element={<AddProductsPage/>}>

                    </Route>
                    <Route path={"/edit-product/:id"} element={<EditProductPage/>}>
                    </Route>

                </Routes>
            </div>
        </Router>
    )
}

export default App