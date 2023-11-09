import React from 'react';
import './Footer.css'
import { FaInstagramSquare, FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

function Footer(props) {
    return (
        <div className='footer-container'>
            <div className='footer-area'>
                <div className='footer-items'>
                    <ul>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Our services</li>
                        <li>Partners</li>
                    </ul>
                </div >
                <div className='footer-items'>
                <ul>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Our services</li>
                        <li>Partners</li>
                    </ul>
                </div>
                <div className='footer-social'>
                <ul className='social'>
                        <li><FaFacebookSquare /></li>
                        <li><FaInstagramSquare/></li>
                        <li><FaTwitterSquare/></li>
                    </ul>
                </div>

            </div>
            <div style={{textAlign:'center',margin:'1rem 0',color:'white'}}>
            <span>2023 All copyrights reserved-Travellog</span>
            </div>

        </div>
    );
}

export default Footer;