import { FaWarehouse } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { PiTreeStructure } from "react-icons/pi";
import { IoMdHelp } from "react-icons/io";
import { FaBirthdayCake } from "react-icons/fa";
import {GiWoodenCrate} from "react-icons/gi";

export const SideBarData = [
    {
        title: 'Customer Orders',
        path: '/customer-orders',
        icon: <FaBookOpen/>,
        cName: 'nav-text'
    },
    {
        title: 'Inventory',
        path: '/products',
        icon: <GiWoodenCrate/>,
        cName: 'nav-text'
    },
    {
        title: 'Deliveries ',
        path: '/deliveries',
        icon: <FaWarehouse/>,
        cName: 'nav-text'
    },
    {
        title: 'Recipes',
        path: '/recipes',
        icon: <FaBirthdayCake/>,
        cName: 'nav-text'
    },
    {
        title: 'Add Products',
        path: '/add',
        icon: <FaPlus/>,
        cName: 'nav-text'
    },
    {
        title: 'Traceability',
        path: '/traceability',
        icon: <PiTreeStructure/>,
        cName: 'nav-text'
    },
]

export default SideBarData