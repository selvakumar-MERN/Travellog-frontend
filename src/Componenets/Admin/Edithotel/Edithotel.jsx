import React from 'react';
import '../Addhotel/Addhotel.css'
import Adminnavbar from '../Adminnavbar/Adminnavbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updatehotel } from '../../Utilis/Apis';
import axios from 'axios';

function Edithotel(props) {
    const[item,setitems]= useState(props.editabledata)
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
        setitems({...item,[name]:value})
         
    }
    const cancel =()=>{
        window.location.href='/admin/hotels'
    }
    const submit=(e)=>{
        e.preventDefault()
        const checkboxaminities= checkbox.aminities;
        const apidata={
            item,checkboxaminities
        }
        axios.post(`${updatehotel}/${item._id}`,apidata)
        .then((res)=>{
            console.log(res)
            if(res){
                toast.success(res.data,toastsuccess)
                window.location.href='/admin/hotels'
            }
        })
        .catch((error)=>{
            console.log(error)
            toast.error(error.response.data,toasterror)
        })
    }
    
    return (
        <div className='admin-container'>
        <Adminnavbar/>
        <div className='content'>
                         <h3>Edit Hotel</h3>
                         <div className="addhotel-container">
                            <form className='hotelform-container'>
                                <div>
                                    <div className='formgroup'>
                                <label>Name</label>
                                <input placeholder='Hotel name' value={item.name} onChange={handler} name='name' type='text'/>
                                   </div>
                                   <div className='formgroup'>
                                <label>Place</label>
                                <input placeholder='Place' name='place' value={item.place}  onChange={handler} type='text'/>
                                   </div>
                                   <div className='formgroup'>
                                <label>Description</label>
                                <textarea rows={3} placeholder='Hotel Description' value={item.description}  onChange={handler} name='description' type='text'/>
                                </div>
                                </div>
                                <div>
                                    <div className='checkbox' >
                                        <label>Aminities</label>
                                        <div className='checkboxlist'>
                                       <input value='Breakfast' type='checkbox' onChange={checkhandler}></input>Breakfast
                                        <input value='Room service' type='checkbox' onChange={checkhandler}></input>Room service
                                        <input value='Parking' type='checkbox' onChange={checkhandler}></input>Parking
                                        <input value='Wifi' type='checkbox' onChange={checkhandler}></input>Wifi
                                        </div>
                                    </div>
                                    <div className='formgroup'>
                                <label>Total Rooms</label>
                                <input placeholder='Total rooms' name='totalRooms' value={item.totalRooms}  onChange={handler} type='number'/>
                                </div>
                                <div className='formgroup'>
                                <label>Single Bed</label>
                                <input placeholder='Single Bed count' name='singleBed' value={item.singleBed}  onChange={handler} type='number'/>
                                </div>
                                <div className='formgroup'>
                                <label>Single Bed Price</label>
                                <input placeholder='Single Bed price' name='singlebedPrice' value={item.singlebedPrice}  type='number' onChange={handler}/>
                                </div>
                                </div>
                                <div>
                                <div className='formgroup'>
                                <label>Double Bed</label>
                                <input placeholder='Double Bed count' name='doubleBed' value={item.doubleBed}  onChange={handler} type='number'/>
                                </div>
                                <div className='formgroup'>
                                <label>Double Bed Price</label>
                                <input placeholder='Double Bed price' name='doublebedPrice'  value={item.doublebedPrice} type='number' onChange={handler}/>
                                </div>
                                <div className='formgroup'>
                                <label>Hotel Image</label>
                                <input placeholder='Hotel Image Link'  onChange={handler} value={item.image} name='image' type='text'/>
                                </div>
                              
                                </div>
                            </form>
                            <div className='form-buttons'>
                            <button style={{backgroundColor:'#198754'}} onClick={submit}>Update</button>
                            <Link to='/admin/hotels'><button style={{backgroundColor:'#dc3545'}} onClick={cancel}>Cancel</button></Link>
                            </div>
                           
                         </div>
                </div>
                <ToastContainer/>
        </div>
    );
}

export default Edithotel;