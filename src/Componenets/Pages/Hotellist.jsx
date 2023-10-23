import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Hotellist.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { allhotel } from '../Utilis/Apis';
import Footer from '../Footer/Footer';


function Hotellist(props) {
    const[data,setdata]=useState("")
    const{place}=useParams();

    useEffect(()=>{
        axios.get(`${allhotel}/${place}`)
        .then((res)=>{
            setdata(res.data)
        })
        .catch((error)=>{
            return error
        })
    },[place])
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
                        <div className="card--body">
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
                            <button className='pricebtn'>{items.singlebedPrice}/night</button>

                        </div>
                    </div>)}

                </div> : <Loading/>}
            </div>
            <Footer/>
        </div>
    );
}

export default Hotellist;