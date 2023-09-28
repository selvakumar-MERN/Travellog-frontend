import React from 'react';
import './List.css'

function List(props) {
    return (
        <div className='list'>
            <div className="listcontainer">
            <div className='firstlist'>
                <h2>Top pics in Ooty</h2>
                <ul className='hotellist'>
                    <li className='item'>
                        <img src='images\capital o hotel.jpg' alt='...' height={"200px"} width={"200px"}></img>
                        <div className='cardbody'>
                        <h4>Capital O Hotel Hills Palace</h4>
                        <span>Hotel in Ooty</span>
                        </div>
                    </li>
                    <li className='item'>
                    <img src='images\capital o hotel.jpg' alt='...' height={"200px"} width={"200px"}></img>
                    <div className='cardbody'>
                        <h4>Capital O Hotel Hills Palace</h4>
                        <span>Hotel in Ooty</span>
                        </div>
                    </li>
                    <div className='item'>
                    <img src='images\capital o hotel.jpg' alt='...' height={"200px"} width={"200px"}></img>
                        <h4>item2</h4>
                    </div>
                    <div className='item'>
                    <img src='images\capital o hotel.jpg' alt='...' height={"200px"} width={"200px"}></img>
                        <h4>item2</h4>
                    </div>
                    <div className='item'>
                    <img src='images\capital o hotel.jpg' alt='...' height={"200px"} width={"200px"}></img>
                        <h4>item2</h4>
                    </div>
                    </ul>
            </div>
            <div className='secondlist'>
                <h2>Top pics in Kodaikannal</h2>
                <ul className="hotelist">
                <li className='item'>
                       <a href='/'><img src='images\capital o hotel.jpg' alt='...' height={"200px"} width={"200px"}></img>
                        <div className='cardbody'>
                        <h4>Capital O Hotel Hills Palace</h4>
                        <span>Hotel in Ooty</span>
                        </div></a> 
                    </li>

                </ul>
            </div>
            </div>
           
        </div>
    );
}

export default List;