import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Componenets/Home/Home';
import Registration from './Componenets/Registeration/Registration';
import Login from './Componenets/Login/Login';
import Hotellist from './Componenets/Pages/Hotellist';
import UserProvider from './Userprovider';
import Booking from './Componenets/Booking/Booking';
import { useState } from 'react';


function App() {
  const[book,setbook]=useState("")
  const booking=(items)=>{
     setbook(items)
     
  }
  return (
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/hotellist' element={<Hotellist booking={booking}/>}/>
        <Route path='/booking/:id' element={<Booking book={book} />}/>
        

       
        


        
      </Routes>
      </BrowserRouter>
      </UserProvider>
  );
}

export default App;
