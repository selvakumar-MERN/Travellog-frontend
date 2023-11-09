import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Hotellist.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLeaf, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { addfav, allhotel } from '../Utilis/Apis';
import Footer from '../Footer/Footer';
import Mycontext from '../../Context';



function Hotellist(props) {
    const{userdata,fav}=useContext(Mycontext)
    const[data,setdata]=useState("")
    const{place}=useParams();
    console.log(fav)
    useEffect(()=>{
        axios.get(`${allhotel}/${place}`)
        .then((res)=>{
            const sort= res.data.sort((a,b)=>{
                return b.rating-a.rating;
            })
            setdata(sort)
        })
        .catch((error)=>{
            return error
        })
    },[place])

    const favorite=(item)=>{
          axios.post(`${addfav}/${userdata._id}`,item)
          .then((res)=>{
            return(res)
            
          })
          .catch((error)=>{
            return(error)
          })
    }
    return (
        <div>
            <Navbar />
            <div className="hotellist-container">
                <div className='searchsection'>

                </div>
               { data.length>0 ? <div className="listsection">
                  { data.map((items,i)=> <div className="card">
                        <img className='cardimage' src={items.image} width={'200px'} height={"200px"} alt='Hotel'></img>
                        { fav.map(item=> item.hotelId !== items._id ? console.log("i"): console.log("g"))} <FontAwesomeIcon className='imageicon' onClick={()=>{favorite(items)}} icon={faHeart}/>
                       

                         
                        <div className="card--body">
                            <Link to={`/booking/${items._id}`}
                             className='cardtitle' href='/' onClick={()=>{props.booking(items)}}>{items.name}</Link>{ i===0 ? <span className='top-rated'>Top Rated <FontAwesomeIcon style={{color:'gold'}} icon={faStar}/></span>: null}
                            <div className='tags'>
                                    <span>{items.place}</span>
                                    <span>km</span>
                            </div>
                            <div className='choice'>
                            { i===0 ? <span >Travellog Choice <FontAwesomeIcon style={{color:'green'}} icon={faLeaf}/></span>: null}
                            </div>
                            <div className='carddesc'>
                                <span>{items.description}</span>
                            </div>
                        </div>
                        <div className='review'>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <span className='rating'>{items.rating}</span>
                            </div>
                            <span className='review-count'>reviews({items.review})</span>
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