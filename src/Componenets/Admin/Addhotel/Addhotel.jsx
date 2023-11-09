import React, { useState } from 'react';
import './Addhotel.css'
import Adminnavbar from '../Adminnavbar/Adminnavbar';
import axios from 'axios';
import { createhotel } from '../../Utilis/Apis';

function Addhotel(props) {
       const[data,setdata]=useState({})
       const[checkbox,setcheckbox]=useState({aminities:[]})

    const checkhandler=(e)=>{
        const{value,checked}=e.target;
        const{aminities}=checkbox;
        if(checked){
            setcheckbox({aminities:[...aminities,value]})
        }
        else{
            setcheckbox({aminities: aminities.filter((e)=> e !==value)})
        }
        
    }  
    console.log(checkbox.aminities) 
    const handler=(e)=>{
        const{name,value}= e.target;
         setdata({...data,[name]:value})
         
    }

    const submit=(e)=>{
        e.preventDefault()
        const checkboxaminities= checkbox.aminities;
        const apidata={
            data,checkboxaminities
        }
        axios.post(createhotel,apidata)
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
    return (
        <div className='admin-container'>
        <Adminnavbar/>
        <div className='content'>
                         <h3>Add Hotel</h3>
                         <div className="addhotel-container">
                            <form className='hotelform-container'>
                                <div>
                                    <div className='formgroup'>
                                <label>Name</label>
                                <input placeholder='Hotel name' name='name' type='text' onChange={handler}/>
                                   </div>
                                   <div className='formgroup'>
                                <label>Place</label>
                                <input placeholder='Place' name='place' type='text' onChange={handler}/>
                                   </div>
                                   <div className='formgroup'>
                                <label>Description</label>
                                <textarea rows={3} placeholder='Hotel Description' name='description' type='text' onChange={handler}/>
                                </div>
                                </div>
                                <div>
                                    <div className='checkbox' >
                                        <label>Aminities</label>
                                        <div className='checkboxlist'>
                                       <input type='checkbox'  value='Breakfast' name='aminities' onChange={checkhandler}></input>Breakfast
                                        <input type='checkbox' value='Room service' name='aminities' onChange={checkhandler}></input>Room service
                                        <input type='checkbox' value='Parking' name='aminities'onChange={checkhandler}></input>Parking
                                        <input type='checkbox' value='Wifi' name='aminities' onChange={checkhandler}></input>Wifi
                                        </div>
                                    </div>
                                    <div className='formgroup'>
                                <label>Total Rooms</label>
                                <input placeholder='Total rooms' name='totalRooms' type='number' onChange={handler}/>
                                </div>
                                <div className='formgroup'>
                                <label>Single Bed</label>
                                <input placeholder='Single Bed count' name='singleBed' type='number' onChange={handler}/>
                                </div>
                                <div className='formgroup'>
                                <label>Single Bed Price</label>
                                <input placeholder='Single Bed price' name='singlebedPrice' type='number' onChange={handler}/>
                                </div>
                                </div>
                                <div>
                                <div className='formgroup'>
                                <label>Double Bed</label>
                                <input placeholder='Double Bed count' name='doubleBed' type='number' onChange={handler}/>
                                </div>
                                <div className='formgroup'>
                                <label>Double Bed Price</label>
                                <input placeholder='Double Bed price' name='doublebedPrice' type='number' onChange={handler}/>
                                </div>
                                <div className='formgroup'>
                                <label>Hotel Image</label>
                                <input placeholder='Hotel Image Link' name='image' type='text' onChange={handler}/>
                                </div>
                              
                                </div>
                            </form>
                            <div className='form-buttons'>
                            <button style={{backgroundColor:'#198754'}} onClick={submit}>Create</button>
                            <button style={{backgroundColor:'#dc3545'}}>Cancel</button>
                            </div>
                           
                         </div>
                </div>
            
        </div>
    );
}

export default Addhotel;