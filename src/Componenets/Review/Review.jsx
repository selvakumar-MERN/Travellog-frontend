import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { useContext } from 'react';
import Mycontext from '../../Context';
import { postreview } from '../Utilis/Apis';
import './Review.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { getreview } from '../Utilis/Apis';
import axios from 'axios';

function Review({id}) {
    const{userdata}=useContext(Mycontext)
    const[data,setdata]=useState({hotelId:id,user:userdata.userName,rating:0,review:""})
    const[rating,setrating]=useState([])
    const[error,seterror]=useState("")

   
    useEffect(()=>{
        axios.get(`${getreview}/${id}`)
        .then((res)=>{
              setrating(res.data)
        })
        .catch((error)=>{
            return(error)
        })
},[id])

    const handler=(e)=>{
        const{name,value}=e.target;
         setdata({...data,[name]:value})
         
     }

    const review = (i) => {
        if (window.localStorage.getItem('sitetoken')) {
            data.rating=Number(i+1);
            setdata({...data}) 
        }
        else{
            seterror("Please login to review")
        }
         
    }

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



    const submit =()=>{
        if(data.rating<=0 || data.review===""){
           return seterror("Rating and review field cannot be empty")
        }
        else{
          
        axios.post(`${postreview}/${id}`,data)
        .then((res)=>{
           
           setrating(res.data.data)
           seterror("")
            toast.success(res.data.message,toastsuccess)
            
        })
        .catch((error)=>{
            toast.error(error.response.data,toasterror)
        })}
        
}
    return (
        <div className='review-container'>
             <div className='rating-area'>
                <h4>Write review</h4>
                            <div className='star-rate'>
                                {Array(5).fill().map((_, i) =>
                                    <FontAwesomeIcon className={ data.rating>0 && i<data.rating ? 'star' : 'starnull'} name='rating' onClick={() => review(i)} icon={faStar} border />)}
                            </div>
                            <div >
                                <textarea className='text-area' rows={6} cols={40} style={{ outline: 'none', fontSize: '1rem' }} name='review' onChange={handler} placeholder='write a review'></textarea>
                            </div>
                            <span style={{color:'red', fontWeight:'bold'}}>{error}</span>
                            <div className='rating-button'>
                            
                               <button  onClick={submit} >Submit</button>
                               <ToastContainer/>
                           </div>

            </div>
            <div className='review-area'>
                <h4>User Reviews</h4>
            <div className='review-content'>
            { rating.map(item => <div className='card'>
                <div className='card-rating'>
                    <div className='rate'>
                      <span>{item.rating}</span>
                    </div>
                </div>
                <div className='card-review'>
                    <div className='review-name'>
                         <span >{item.user}</span>
                    </div>
                    <div>
                        <span>{item.review}</span>
                    </div>

                </div>

            </div>)}
            </div>
            </div>
            
        </div>
    );
}

export default Review;