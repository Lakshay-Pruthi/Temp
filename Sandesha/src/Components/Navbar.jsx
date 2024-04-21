import { NavLink } from "react-router-dom";
import logo from '../assets/Logo.jpg'
import { useContext } from "react";
import { MainContext } from "../Pages/Main";

function Navbar(props) {
    const { userAccount } = useContext(MainContext);
    return (
        <>
            <nav>
                <ul>
                    <li><img src={logo} alt="" /></li>
                    <li><NavLink className="primaryBtnDesign" to='/Sandesha/'>Home</NavLink></li>
                    <li><NavLink className="primaryBtnDesign" to='/Sandesha/Rooms'>Rooms</NavLink></li>
                    <li><NavLink className="primaryBtnDesign" to='/Sandesha/About'>About</NavLink></li>
                </ul>
                <p className="primaryBtnDesign">Account: {userAccount} </p>
            </nav>
        </>
    )
}
export default Navbar;