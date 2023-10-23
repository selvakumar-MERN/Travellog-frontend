import React, { useState } from 'react';
import './Header.css'
import {faBed} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';



function Header(props) {
    const[search,setsearch]=useState("")
    const handler=(e)=>{
            setsearch(e.target.value)
    }
    return (
        <div className="header">
            <div className="headercontainer">
                <div className="headerlist">
                    <div className="headerlistitem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stay</span>
                        </div>
                    

                </div>
                <h1 className="headertitle">Best place for your vaccation plan</h1>
                <p className="headerdes">Get register and get life time discount on all deals - save your expenses
                for another vaccation</p>
                <button className="headerbtn">Sign up / Register</button>
                <div className="searcharea">
                    <div className='searchitem'>
                        <FontAwesomeIcon icon={faBed} className='searchicon'/>
                        <select type='text' className='searchinput' id='searchinput' onChange={handler}>
                            <option>where are you going?</option>
                            <option >ooty</option>
                            <option >kodaikanal</option>
                        </select>
                    </div>
                    
                    <Link to={`/hotellist/${search}`} className='headerbtn' >Search</Link>
                </div>
            </div>
            
        </div>
    );
}

export default Header;
