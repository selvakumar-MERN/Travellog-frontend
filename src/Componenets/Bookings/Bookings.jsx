import React, { useContext, useEffect, useState } from 'react';
import './Bookings.css'
import Navbar from '../Navbar/Navbar';
import { getbook } from '../Utilis/Apis';
import Mycontext from '../../Context';
import axios from 'axios';
import QRCode from 'react-qr-code';
import Footer from '../Footer/Footer';

function Bookings(props) {
    
    const[booking,setbooking]=useState([])
    const{userdata}=useContext(Mycontext)

    useEffect(()=>{
        axios.get(`${getbook}/${userdata._id}`)
        .then((res)=>{
            const {data}=res
            const newdata=  data.map((item)=>{
                return {...item, bookedOn: new Date( item.bookedOn).toLocaleString(),
                        fromDate:new Date( item.fromDate).toLocaleDateString(),toDate:new Date( item.toDate).toLocaleDateString(),
                        }})
              setbooking(newdata)
              
        })
        .catch((error)=>{
            return error
        })
    },[userdata._id])


    return (
        <div className='page-container'>
            <Navbar/>
            <div className='book-container'>
                  <h2>My Bookings</h2>
                { booking.map(items=>  <div className='card'>
                      <img src={items.image} className='book-image' width={"150px"} height={"150px"} alt='...'></img>
                      <div className='card-body'>
                        <span style={{color:'royalblue',fontWeight:'bold'}}>{items.hotelName}</span>
                        <div className='card-body-area'>
                            <div className='card-items'>
                                 <label> booked On</label><span> {items.bookedOn}</span>
                            </div>
                            <div className='card-items'>
                               <label>No of rooms</label><span> {items.totalRooms}</span>
                            </div>
                            <div className='card-items'>
                                <label>Room type</label> <span> {items.type}</span>
                        </div>
                        <div className='card-items bookingId'>
                                <label >Booking Id</label> <span> {items.bookingId}</span>
                        </div>
                       
                        </div>
                        <div className='card-body-area'>
                        <div className='card-items'>
                                <label>From</label> <span> {items.fromDate}</span>
                        </div>
                        <div className='card-items'>
                                <label>To</label> <span> {items.toDate}</span>
                        </div>
                        </div>

                      </div>
                      <div className='card-items' style={{textAlign:'center'}}>
                        <span  >scan code</span>
                        <div>
                        <QRCode className='qr-code' value={`Hotel name: ${items.hotelName}--Name: ${items.username}--Email:${items.email}--Rooms:${items.totalRooms}--Room type: ${items.type}--From:${items.fromDate}--To:${items.toDate}--BookingId:${items.bookingId}`} 
                        style={{ height: "auto", maxWidth: "100%", width: "5rem" }}/>
                        </div>
                      </div>
                  </div>)}
            </div>
            <Footer/>
        </div>
    );
}

export default Bookings;