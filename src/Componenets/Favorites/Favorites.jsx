import React, { useContext } from 'react';
import './Favorites.css'
import Navbar from '../Navbar/Navbar';
import Mycontext from '../../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deletefav } from '../Utilis/Apis';
import Footer from '../Footer/Footer';
import axios from 'axios';


function Favorites(props) {
   const{userdata,fav,setfav}=useContext(Mycontext)

   const deletefavorite=(id)=>{
         axios.post(`${deletefav}/${userdata._id}`,{id:id})
         .then((res)=>{
             if(res){
                const del= fav.filter(item=>item._id!==id)
                setfav(del)
             }
         })
         .catch((error)=>{
            return(error)
         })
   }
    return (
        <div className='page-container'>
            <Navbar/>
            <div className='favorite-container'>
                   <h2>My Favorites</h2>
                  { fav.map(item=> <div className="card">
                    <img src={item.image} className='fav-image' width={'150px'} height={"150px"} alt='...'></img>
                    <div className='card-body'>
                        <div>
                        <span style={{color:'royalblue',fontWeight:'bold',marginRight:'0.5rem'}}>{item.hotelName}</span>{Array(item.rating).fill().map((_)=>
                             <FontAwesomeIcon style={{color:'gold'}} icon={faStar}/>)}({item.review})
                        </div>
                        <span>{item.place}</span>
                        <span>{item.description}</span>

                    </div>
                    <div className='delete-button'>
                        <button><FontAwesomeIcon onClick={()=>{deletefavorite(item._id)}}  icon={faTrash}/></button>
                    </div>
                   </div>)}
            </div>
            
            <Footer/>
            
        </div>
    );
}

export default Favorites;