
import './index.css';
import Sidebar from './components/Sidebar'
import HomePage from './Pages/HomePage'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductsPage from "./Pages/ProductsPage";
import TraceabilityPage from "./Pages/TraceabilityPage";
import HelpPage from "./Pages/HelpPage";
import AddProduct from "./components/TraceabilityComponents/AddProduct";
import AddProductsPage from "./Pages/AddProductsPage";


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
                    <Route path={"/help"} element={<HelpPage/>}>

                    </Route>
                    <Route path={"/add"} element={<AddProductsPage/>}>

                    </Route>
                </Routes>

            </div>
        </Router>
    )
}

export default App
