import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHotel, faPlus} from '@fortawesome/free-solid-svg-icons';



 export const Sidebar =[
   
{
    title:'Hotel',
    path:'/admin/hotels',
    icon: <FontAwesomeIcon icon={faHotel}/>,
    cName:'nav-text'
},
{
    title:'Add Hotel',
    path:'/admin/addhotels',
    icon: <FontAwesomeIcon icon={faPlus}/>,
    cName:'nav-text'
},

] 
    
    