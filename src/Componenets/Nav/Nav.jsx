import React from 'react';
import './Nav.css'
import { Link } from 'react-router-dom';

function Nav(props) {
    return (
        <div className='navbar'>
            <div className='navcontainer'>
               <Link to='/'><span className="logo">travellog</span></Link> 

            </div>
            
        </div>
    );
}

export default Nav;