import React, { useContext, useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import Mycontext from '../../Context';
import profile from '../assests/undraw_male_avatar_g98d.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faPowerOff } from '@fortawesome/free-solid-svg-icons';



function Navbar(props) {
     const{userdata}=useContext(Mycontext)
     const[dropdown,setdropdown]=useState(false)
     const dropclose=()=>{
        setdropdown(!dropdown)
     }
     const logout=()=>{
        window.localStorage.clear();
        window.location.href='/'
     }

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to='/'><span className="logo">Travelog</span></Link>
              { !userdata.email ? <div className="navitems">
                   <Link to='/registration'><button className="navbutton">Register</button></Link> 
                   <Link to='/login'><button className="navbutton">Login</button></Link> 
                </div>: 
                <div className='profilearea'>
                    <span className='useremail'>{userdata.email}</span>
                    <img className='profileimage' src={profile} onClick={dropclose} alt='...' width={"25px"} height={"25px"}></img>
                    <ul  className={  dropdown ? 'dropdown': 'dropdownclose'}>
                      { userdata.role==="admin" ?  <Link to='/admin/hotels'><li><FontAwesomeIcon icon={faDashboard}/><span>Dasboard</span></li></Link>
                       : <li onClick={logout}><FontAwesomeIcon icon={faPowerOff}/><span>Logout</span></li>}
                    </ul>
                    </div>}
            </div>
        </div>
            
    
    );
}

export default Navbar;