import { FaWarehouse } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { PiTreeStructure } from "react-icons/pi";
import {GiWoodenCrate} from "react-icons/gi";
import React from "react";
import { FaFileContract } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";


export const SideBarData = [
    {
        title: 'Contracts',
        path: '/contracts',
        icon: <FaFileContract/>,
        cName: 'nav-text'
    },
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
        icon: <GrNotes/>,
        cName: 'nav-text'
    },
    {
        title: 'Traceability',
        path: '/traceability',
        icon: <PiTreeStructure/>,
        cName: 'nav-text'
    },
    {
        title: 'Baking System',
        path: '/baking-system',
        icon: <FaPlus/>,
        cName: 'nav-text'
    }
]

export default SideBarData