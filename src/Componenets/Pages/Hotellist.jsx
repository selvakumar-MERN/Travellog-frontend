import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Hotellist.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Hotellist(props) {
    const[data,setdata]=useState("")
     const place= "ooty"

    useEffect(()=>{
        axios.get(`https://travel-log-8b5m.onrender.com/user/gethotel/${place}`)
        .then((res)=>{
            setdata(res.data)
        })
        .catch((error)=>{
            return error
        })
    })
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className='searchsection'>

                </div>
               { data.length>0 ? <div className="listsection">
                  { data.map(items=> <div className="card">
                        <img className='cardimage' src={items.image} width={'200px'} height={"200px"} alt='Hotel'></img>
                        <FontAwesomeIcon className='imageicon' icon={faHeart}></FontAwesomeIcon>
                        <div className="cardbody">
                            <Link to={`/booking/${items._id}`}
                             className='cardtitle' href='/' onClick={()=>{props.booking(items)}}>{items.name}</Link>
                            <div className='tags'>
                                    <span>{items.place}</span>
                                    <span>km</span>
                            </div>
                            <div className='carddesc'>
                                <span>{items.description}</span>
                            </div>
                        </div>
                        <div className='review'>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <FontAwesomeIcon icon={faStar} className='staricon' />
                                <span className='rating'>5</span>
                            </div>
                            <button className='pricebtn'>2200/night</button>

                        </div>
                    </div>)}

                </div> : <h3>...Loading</h3>}
            </div>

        </div>
    );
}

export default Hotellist;