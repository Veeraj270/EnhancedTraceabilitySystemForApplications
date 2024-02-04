import { FaWarehouse } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { PiTreeStructure } from "react-icons/pi";
import { IoMdHelp } from "react-icons/io";

export const SideBarData = [
    {
        title: ' Home ',
        path: '/',
        icon: <FaHome/>,
        cName: 'nav-text'
    },
    {
        title: ' Products ',
        path: '/products',
        icon: <FaWarehouse/>,
        cName: 'nav-text'
    },
    {
        title: ' Add Products ',
        path: '/add',
        icon: <FaPlus/>,
        cName: 'nav-text'
    },
    {
        title: ' Traceability ',
        path: '/traceability',
        icon: <PiTreeStructure/>,
        cName: 'nav-text'
    },
    {
        title: ' Take Delivery ',
        path: '/take-delivery',
        icon: <FaWarehouse/>,
        cName: 'nav-text'
    },
    {
        title: ' Help ',
        path: '/help',
        icon: <IoMdHelp/>,
        cName: 'nav-text'
    },
]

export default SideBarData