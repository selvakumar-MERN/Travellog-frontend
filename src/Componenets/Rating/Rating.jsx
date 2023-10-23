import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Rating.css'
import '../Admin/Hotels/Showbutton.css'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import Mycontext from '../../Context';
import { postreview } from '../Utilis/Apis';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

function Rating({id}) {
    const{userdata}=useContext(Mycontext)
    const[data,setdata]=useState({hotelId:id,user:userdata.userName})
    const [show, setshow] = useState(false)
    const [rate,setrate]= useState(0)

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

    const Show = () => {
        if (window.localStorage.getItem('siteadmin-token')) {
            setshow(!show)
        }
        else {
            alert('please login as user to review')
        }

    }
    const review = (i) => {
        setrate(Number(i + 1))
        const rating="rating";
        setdata({...data,[rating]:rate})
        console.log(data)
    }
    const handler=(e)=>{
       const{name,value}=e.target;
        setdata({...data,[name]:value})
        
    }

    const submit =()=>{
          
            axios.post(`${postreview}/${id}`,data)
            .then((res)=>{
                toast.success(res.data,toastsuccess)
                setshow(!show)
            })
            .catch((error)=>{
                toast.error(error.response.data,toasterror)
            })
            
    }
    return (
        <div>
            <span id="ratebutton" onClick={Show}><FontAwesomeIcon style={{ fontSize: '1.2rem',marginRight :'0.5rem' }} icon={faPenSquare} />Write review</span>
            <div id="myModal" class={show ? "modal" : "modal-hidden"}>
            <ToastContainer/>


                <div class="modal-content">
                    <div className='modal-header'>
                        <span>Review</span>
                    </div>
                    <hr />
                    <div className='modal-body'>
                        <div className='rating-container'>
                            <div><span style={{ fontWeight: 'bold' }}>Rate </span>
                                {Array(5).fill().map((_, i) =>
                                    <FontAwesomeIcon className={ rate>0 && i<rate ? 'star' : 'starnull'} name='rating' onClick={() => review(i)} icon={faStar} border />)}
                            </div>
                            <div>
                                <textarea rows={6} cols={40} style={{ outline: 'none', fontSize: '1rem' }} name='review' onChange={handler} placeholder='write a review'></textarea>
                            </div>

                        </div>
                    </div>
                    <div className='modal-button'>
                        <button style={{backgroundColor:'#dc3545',color:'white'}} onClick={submit} >Submit</button>
                        <button style={{ backgroundColor: '#dc3545', color: 'white' }} onClick={Show}>Close</button>
                    </div>
                   
                </div>

            </div>
        </div>

    );
}

export default Rating;