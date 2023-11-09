import React, { useState } from 'react';
import './Adminnavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faPowerOff, faX } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {Sidebar} from '../Sidebar';


function Adminnavbar(props) {
    const [sidebar, setsidebar]=useState(false)

    const sidemenu=()=>{
       setsidebar(!sidebar)
    }
    const logout=()=>{
        window.localStorage.clear()
        window.location.href='/';
    }
    return (
        <div >
            <div className='adminnav-container'>
            <Link to='#' className='menu-bars' id='barbtn' onClick={sidemenu}><FontAwesomeIcon icon={faBars}/> </Link>
            <h3 style={{fontSize:'1.7rem',fontStyle:'italic'}}>Admin Panel</h3>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars' onClick={sidemenu}>
                            <FontAwesomeIcon className='xicon' icon={faX}/>
                        </Link>
                    </li>
                    <li className='nav-text'>
                                <Link to='/'>
                                <FontAwesomeIcon icon={faHome}/>
                                    <span>Home</span>
                                </Link>

                            </li>
                    {Sidebar.map((item,index)=>{
                        return(
                            <li key={index} className={item.cName} onClick={item.click}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>

                            </li>
                            
                        )
                    })}
                      <li className='nav-text' onClick={logout}>
                                <Link to='/'>
                                <FontAwesomeIcon icon={faPowerOff}/>
                                    <span>Logout</span>
                                </Link>

                            </li>
                            

                </ul>

            </nav>
          
            
            
        </div>
    );
}

export default Adminnavbar;