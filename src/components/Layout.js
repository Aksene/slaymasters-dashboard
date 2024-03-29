import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Auth/auth';
import { supabase } from '../database/Database'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaTwitter, FaInstagram } from "react-icons/fa";

import '../App.css'
import logo from '../Assets/pg-slay-masters-logo-final-stacked-_1_.jpg'



const Layout = ({children}) => {
    const auth = useAuth();
    const [showMenu, setShowMenu] = useState(false)
    const [userInfo, setUserInfo] = useState([])
    const [userRole, setUserRole] = useState()
    const closeMobileMenu = () => setShowMenu(false);


    useEffect(() => {

        getUserInfo()
       
    },[auth.user])

    const getUserInfo = async() => {
            const {data, error} = await supabase
                .from("slaymastersProfiles")
                .select()
                .match({user_id: supabase.auth.user().id})
            if(error){
                console.log(error)
            }
            if(data){
                setUserInfo(data)
                const userRole = data.map(({isAdmin}) => isAdmin);
                let r = ""
                userRole.forEach(role => r = role)
                setUserRole(r)
            }
    }

    const showAdminTabs = () => {        
            return (
                userRole ?
                    <>
                        {
                            userRole ?
                            <div>
                                {/* {console.log("Navbar check passed", userRole)} */}
                                <li className="nav-item">
                                    <Link className={showMenu ? 'nav-links active' : 'nav-links'} to={"/manage-assignments"} onClick={closeMobileMenu}>
                                        Manage Assignments
                                    </Link>
                                </li> 
                            </div>
                            : ""
                        }
                        {
                            userRole ?
                            <div>
                                {/* {console.log("Navbar check passed", userRole)} */}
                                <li className="nav-item">
                                    <Link className={showMenu ? 'nav-links active' : 'nav-links'} to={"/playground"} onClick={closeMobileMenu}>
                                        Dev Playground
                                    </Link>
                                </li>
                            </div>
                            : ""
                        }

                        <li className="nav-item">
                            <Link className={showMenu ? 'nav-links active' : 'nav-links'} to={"/testing"} onClick={closeMobileMenu}>
                                Chat
                            </Link>
                        </li>
                    </>
            : ""
            )
        
        
    }

    
    // console.log(supabase.auth.user().id)
    // console.log("User role isAdmin:", userRole)


        return (
            <div>
                <header className="header">
                    <div className="header-image-container">
                        <Link to={"/"}><img className="header-image" src={logo} alt="Slaymasters" /></Link>
                    </div>
    
                    <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
                        {
                                showMenu ?
                                <FontAwesomeIcon
                                icon={faXmark}
                                onClick={() => setShowMenu(!showMenu)}
                                /> 
                                :                    
                                <FontAwesomeIcon
                                icon={faBars}
                                onClick={() => setShowMenu(!showMenu)}
                                />
                        }
                    </div>
    
    
    
                    <div className="header-links">
                        <ul className={showMenu ? 'nav-menu active' : 'nav-menu'}>
                            <li className="nav-item" >
                                <Link className={showMenu ? 'nav-links active' : 'nav-links'} onClick={closeMobileMenu} to={"/"}>
                                    Home
                                </Link>
                            </li>
                            {/* Logic to display Sign-in when user is signed out &a vice-versa */}
                            {auth.user ? 
                                <>
                                    <li className="nav-item">
                                        <Link className={showMenu ? 'nav-links active' : 'nav-links'} to={"/dashboard"} onClick={closeMobileMenu}>
                                            Creator Dashboard
                                        </Link>
                                    </li>

                                    {showAdminTabs()}

                                    <li onClick={closeMobileMenu} className="nav-item">
                                        <button className='nav-btn' onClick={auth.Logout} to={"/log-out"}>Log-out</button>
                                    </li>
                                </>
                                :
                                <li className="nav-item">
                                    <Link className={showMenu ? 'nav-links active' : 'nav-links'} onClick={closeMobileMenu} to={"/sign-in"}>
                                        Sign-in
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
    
                </header>
    
                <main>
                    {children}
                </main>
    
                <footer>
                    <div className="slaymaster-logo-bottom-container">
                            <img className="slaymaster-logo-bottom" src={logo} alt="SlaymasterLogoBottom" />
                    </div>
                    <div className="footer-info">
                        <div className="footer-copyright">
                            <p className="footer-copyright-text">© 2022 SLAYMASTERS, ALL RIGHTS RESERVED.</p>
                        </div>
                        <div className="footer-icon-group">
                            <ul>
                                <li>
                                    <Link to="//google.com" target='_blank'>
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link to="//instagram.com/goslaymasters/" target='_blank'>
                                        <FaTwitter/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="//instagram.com/goslaymasters/" target='_blank'>
                                        <FaInstagram/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
                
            </div>
        )
}


export default Layout
