import {Link} from "react-router-dom";
import SideBarData from "./SideBarData";
import './SideBar.css'
import React from "react";

const Sidebar = () => {
    return (
        <nav className='side-bar-menu'>
            <h2>Cakesmiths</h2>
            <h3>Enhanced Traceability System</h3>

            {SideBarData.map((item, index) => {
                return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <b>&nbsp;{item.title}</b>

                        </Link>
                    </li>
                )
            })}
        </nav>
    )
}

export default Sidebar