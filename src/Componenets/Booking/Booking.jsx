import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Booking.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Booking(props) {
   const[book,setdata]= useState("")
   const [type,settype]=useState("")
   const [room,setroom]=useState("")
   const{id}=useParams()
    useEffect(()=>{
        
        axios.get(`http://localhost:3030/user/getone/${id}`)
        .then((res)=>{
           const value= res.data.room.map((item)=>{
              return item.type})
              const order= [...new Set(value)]
              setdata(res.data)
              settype(order)
        })
        .catch((error)=>{
            return error
        })
    },[id])

    const handler=(e)=>{
        const value= e.target.value
        const filter= book.room.filter(item=>item.type===value)
        setroom(filter)
    }
    
    return (
        <div>
            <Navbar/>
            <div className='container'>
                <div className='card'>
                    <div className='cardimage'>
                        <img src={book.image} alt='...' width={"300px"} height={"300px"}></img>

                    </div>
                    <div className='cardbody'>
                        <h2>{book.name}</h2>
                        <div style={{display:'flex'}}>
                            <input type='date' placeholder='startdate'></input>
                            <input type='date'></input>
                        </div>
                    </div>

                </div>
                <div className='table'>
                <table>
                    <thead>
                        <tr style={{backgroundColor:'royalblue',textAlign:'center',color:'white'}}>
                            <td >Room type</td>
                            <td >No. of Rooms</td>
                            <td >Select</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='tablebody' style={{textAlign:"center"}}>
                            <td><select style={{width:'50%'}} onChange={handler}>
                                <option>...choose</option>
                               { type.length>0 ? type.map(item=><option>{item}</option>) : null}
                                </select></td>
                            <td><select style={{width:'50%'}}>
                                <option>...choose</option>
                                { room.length>0 ? room.map((_,i)=><option>{i+1}</option>) : null}
                                </select></td>
                            <td><select style={{width:'50%'}}>
                                <option>...choose</option>
                                </select></td>
                        </tr>
                    </tbody>

                </table>
                </div>

            </div>
            
        </div>
    );
}

export default Booking;