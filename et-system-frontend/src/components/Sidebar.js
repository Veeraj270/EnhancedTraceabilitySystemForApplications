import Button from './Button'
import {Link} from "react-router-dom";
import SideBarData from "./SideBarData";
import '../CSS/SideBar.css'

const Sidebar = () => {
    return (
        <div className='container'>
            <nav className='side-bar-menu'>
                <h2>Cakesmiths</h2>
                <h3>Enhanced Traceability System</h3>

                {SideBarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </nav>

        </div>
    )
}

export default Sidebar