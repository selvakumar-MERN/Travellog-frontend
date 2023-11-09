import React, { useState } from 'react';
import './Addhotel.css'
import Adminnavbar from '../Adminnavbar/Adminnavbar';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { createhotel } from '../../Utilis/Apis';

function Addhotel(props) {
       const[data,setdata]=useState({})
       const[checkbox,setcheckbox]=useState({aminities:[]})

       const toastsuccess={
        position:'top-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark',
      }
      const toasterror={
        position:'top-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark',
      }

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
            if(res){
                toast.success(res.data,toastsuccess)
                window.location.href='/admin/hotels'
            }
        })
        .catch((error)=>{
            toast.error(error.response.data,toasterror)
        })
    }

    const cancel =()=>{
        window.location.href='/admin/hotels'
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
                                        <input type='checkbox' value='Tv' name='aminities' onChange={checkhandler}></input>Tv
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
                            <button style={{backgroundColor:'#dc3545'}} onClick={cancel}>Cancel</button>
                            </div>
                           
                         </div>
                </div>
                <ToastContainer/>
        </div>
    );
}

export default Addhotel;