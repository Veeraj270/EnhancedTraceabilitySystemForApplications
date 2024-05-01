import {Link} from "react-router-dom";
import SideBarData from "./SideBarData";
import './SideBar.css'
import React from "react";

const Sidebar = () => {
    return (
        <nav className='side-bar-menu'>
            <div className={"SB-title-div"}>
                <p>ENHANCED TRACEABILITY SYSTEM</p>
            </div>

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