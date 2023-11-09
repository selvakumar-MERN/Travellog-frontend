import axios from 'axios';
import React from 'react';
import { googleauth, googletoken } from '../Utilis/Apis';
import { useGoogleLogin } from '@react-oauth/google';

function Googleauth(props) {

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {

        axios.get(`${googleauth}${codeResponse.access_token}`, {
            headers: {
                Authorization: `Bearer ${codeResponse.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((res) => {
            axios.post(googletoken,res.data)
            .then((res)=>{
                     window.localStorage.setItem('sitetoken',res.data.token)
                      window.location.href='/'
            })
            .catch((error)=>{
                return (error)
            })
        })
        .catch((err) =>{ return (err)});
}});
    return (
        <button className='signitem' onClick={login}>
                            <img src='images\google-logo-9808.png' height={'30px'} width={'30px'} alt='google'></img>
                        </button>
    );
}

export default Googleauth;