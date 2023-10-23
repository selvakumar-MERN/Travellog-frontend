import React, { useEffect, useState } from 'react';
import './List.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { gethotelkodai, gethotelooty } from '../Utilis/Apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function List(props) {
    const[data1,setdata1]=useState([]);
     const[data2,setdata2]=useState([]);

    useEffect(()=>{
        axios.get(gethotelooty)
        .then((res)=>{
            const filter= res.data.filter(item=>item.rating>=4)
            setdata1(filter)
        })
        .catch((error)=>{
            return error
        })
    },[])

    useEffect(()=>{
        axios.get(gethotelkodai)
        .then((res)=>{
            const filter= res.data.filter(item=>item.rating>=4)
            setdata2(filter)
        })
        .catch((error)=>{
            return error
        })
    },[])
    return (
        <div className='list'>
            <div className="listcontainer">
            <div className='firstlist'>
                <h2>Top pics in Ooty</h2>
                <ul className='hotellist'>
                   { data1.length>0 ? data1.map(items=> <Link to={`/booking/${items._id}`} ><li className='item'>
                        <img src={items.image} alt='...' height={"200px"} width={"200px"}></img>
                        <div className='cardbody'>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            
                        <span style={{fontWeight:'bold'}}>{items.name}</span>
                        <span>
                              <FontAwesomeIcon style={{color:'gold'}} icon={faStar}/>{items.rating}({items.review})</span>
                        <span style={{color:'green',fontWeight:'bold'}}>{items.place}</span>
                        
                        </div>
                        </div>
                    </li> </Link>):null}
                    </ul>
            </div>
            <div className='secondlist'>
                <h2>Top pics in Kodaikannal</h2>
                <ul className="hotellist">
                { data2.length>0 ? data2.map(items=> <Link to={`/booking/${items._id}`} ><li className='item'>
                       <img src={items.image} alt='...' height={"200px"} width={"200px"}></img>
                        <div className='cardbody'>
                        <div style={{display:'flex',flexDirection:'column'}}>
                            
                        <span style={{fontWeight:'bold'}}>{items.name}</span>
                        <span>
                              <FontAwesomeIcon style={{color:'gold'}} icon={faStar}/>{items.rating}</span>
                        <span style={{color:'green',fontWeight:'bold'}}>{items.place}</span>
                        
                        </div>
                        </div>
                    </li> </Link>):null}

                </ul>
            </div>
            </div>
           
        </div>
    );
}

export default List;