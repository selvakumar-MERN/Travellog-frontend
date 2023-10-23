import React from 'react';
import './Review.css'
import { useEffect } from 'react';
import axios from 'axios';
import { getreview } from '../Utilis/Apis';
import { useState } from 'react';

function Review({id}) {
     const[rating,setrating]=useState([])
   
    useEffect(()=>{
            axios.get(`${getreview}/${id}`)
            .then((res)=>{
                  setrating(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[id])
    return (
            <>
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
            </>
        
    );
}

export default Review;