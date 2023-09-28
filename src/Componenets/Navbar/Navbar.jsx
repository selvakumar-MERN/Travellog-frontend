import React, { useContext } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import Mycontext from '../../Context';



function Navbar(props) {
     const{userdata}=useContext(Mycontext)
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
                    <img className='profileimage' src='profile.png' alt='...' width={"25px"} height={"25px"}></img>
                    </div>}
            </div>
        </div>
            
    
    );
}

export default Navbar;