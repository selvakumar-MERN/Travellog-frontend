import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Componenets/Home/Home';
import Registration from './Componenets/Registeration/Registration';
import Login from './Componenets/Login/Login';
import Hotellist from './Componenets/Pages/Hotellist';
import UserProvider from './Userprovider';
import Booking from './Componenets/Booking/Booking';
import { useState } from 'react';
import Hotels from './Componenets/Admin/Hotels/Hotels';
import Adminroutes from './Componenets/Utilis/Adminroutes';
import Addhotel from './Componenets/Admin/Addhotel/Addhotel';
import Edithotel from './Componenets/Admin/Edithotel/Edithotel';


function App() {
  const[book,setbook]=useState("")
  const[editabledata,seteditdata]=useState("")
  const booking=(items)=>{
     setbook(items)  
  }
  const editdata=(item)=>{
   seteditdata(item)
  }
 
  
  return (
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/hotellist/:place' element={<Hotellist booking={booking} />}/>
        <Route path='/booking/:id' element={<Booking book={book} />}/>


        <Route element={<Adminroutes/>}>
        <Route path='/admin/hotels' element={<Hotels editdata={editdata} />}/>
        <Route path='/admin/addhotels' element={<Addhotel  />}/>
        <Route path='/admin/edithotel' element={<Edithotel editabledata={editabledata} />}/>
        </Route>

        

       
        


        
      </Routes>
      </BrowserRouter>
      </UserProvider>
  );
}

export default App;
