import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import Mycontext from '../../Context';
import profile from '../Assests/user.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faHeart, faPowerOff, faTable } from '@fortawesome/free-solid-svg-icons';
import { getfav } from '../Utilis/Apis';
import axios from 'axios';



function Navbar(props) {
     const{userdata,setfav,fav}=useContext(Mycontext)
     const[dropdown,setdropdown]=useState(false)

     useEffect(()=>{
          axios.get(`${getfav}/${userdata._id}`)
          .then((res)=>{
            setfav(res.data)
          })
          .catch((error)=>{
            return (error)
          })
     },[userdata._id,setfav])

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
                    <span className='useremail'>{userdata.userName}</span>
                    <img className='profileimage' src={profile} onClick={dropclose} alt='...' width={"25px"} height={"25px"}></img>
                    <ul  className={  dropdown ? 'dropdown': 'dropdownclose'}>
                      { userdata.role==="admin" ?  <Link to='/admin/hotels'><li><FontAwesomeIcon icon={faDashboard}/><span>Dasboard</span></li></Link>
                       :<div><Link to='/user/bookings'><li><FontAwesomeIcon icon={faTable}/><span>My Bookings</span></li></Link> 
                       <Link to='/user/favorites'><li><FontAwesomeIcon icon={faHeart}/><span>Favorites ({fav.length})</span></li></Link>
                       <li onClick={logout}><FontAwesomeIcon icon={faPowerOff}/><span>Logout</span></li></div> }
                    </ul>
                    </div>}
            </div>
        </div>
            
    
    );
}

export default Navbar;