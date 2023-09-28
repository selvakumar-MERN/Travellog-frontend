import React from 'react';
import './Header.css'
import {faBed, faCar, faLocationDot, faPlane} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'



function Header(props) {
    return (
        <div className="header">
            <div className="headercontainer">
                <div className="headerlist">
                    <div className="headerlistitem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stay</span>
                        </div>
                        <div className="headerlistitem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                        </div>
                        <div className="headerlistitem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                        </div>
                        <div className="headerlistitem">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Attraction</span>
                        </div>
                    

                </div>
                <h1 className="headertitle">Best place for your vaccation plan</h1>
                <p className="headerdes">Get register and get life time discount on all deals - save your expenses
                for another vaccation</p>
                <button className="headerbtn">Sign up / Register</button>
                <div className="searcharea">
                    <div className='searchitem'>
                        <FontAwesomeIcon icon={faBed} className='searchicon'/>
                        <input type='text' placeholder='where are you going?' className='searchinput'></input>
                    </div>
                    
                    <button className='headerbtn'>Search</button>
                </div>
            </div>
            
        </div>
    );
}

export default Header;
