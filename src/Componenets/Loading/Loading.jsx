import React from 'react';
import backlogo from '../assests/logo-no-background.svg'
import './Loading.css'

function Loading(props) {
    return (
        <div className='loading-logo'>
                    <img src={backlogo} width={"150px"} height={"150px"}  alt='...Loading'></img>
                    </div>
                    
    );
}

export default Loading;