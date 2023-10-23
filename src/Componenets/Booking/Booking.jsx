import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Booking.css'
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faCalendar, faParking, faStar, faTv, faWifi } from '@fortawesome/free-solid-svg-icons';
import { getonehotel, orderpayment, verifypayment } from '../Utilis/Apis';
import Footer from '../Footer/Footer';
import Rating from '../Rating/Rating';
import Review from '../Review/Review';
import Mycontext from '../../Context';



function Booking(props) {
    const{userdata}=useContext (Mycontext)
    const [book, setdata] = useState("")
    const [type, settype] = useState("")
    const [room, setroom] = useState("")
    const [roomdata, setroomdata] = useState([])
    const [finaldata, setfinal] = useState({
        totalDays: 0,
        totalRooms: "",
        price: 0,
    })
    const [date, setdate] = useState({ startdate: "", enddate: "" });
    const { id } = useParams()
    useEffect(() => {

        axios.get(`${getonehotel}/${id}`)
            .then((res) => {
                setdata(res.data)

            })
            .catch((error) => {
                return error
            })
    }, [id])

    const pricehandler = (e) => {
        const value = (e.target.value).split("-₹")
        const totalRooms = "totalRooms";
        const price = "price";
        setfinal({ ...finaldata, [totalRooms]: value[0], [price]: value[1] * finaldata.totalDays })

    }
    const handler = (e) => {
        const { name, value } = e.target;
        const filter = roomdata.filter(item => item.type === value)
        const price = "price"
        setroom(filter)
        setfinal({ ...finaldata, [name]: value, [price]: filter[0].price * finaldata.totalDays })

    }

    const handledate = (e) => {
        const { name, value } = e.target
        const price = "price"
        setdate({ ...date, [name]: value })
        setfinal({ ...finaldata, [name]: value, [price]: 0 })
    }

    const submitdate = () => {
        axios.post(`http://localhost:3030/user/getdate/${id}`, date)
            .then((res) => {
                console.log(res)
                const value = res.data.data.map((item) => {
                    return item.type
                })
                const order = [...new Set(value)]
                const days = "totalDays"
                const totalday = res.data.days
                setroomdata(res.data.data)
                settype(order)
                setfinal({ ...finaldata, [days]: totalday })
            })
            .catch((error) => {
                console.log(error)
            })
        
    }
    const payment=(order)=>{
        const options={
            key:"rzp_test_gXkfVOK0D8Ct2S",
            amount:order.amount,
            currency:order.currency,
            name:book.name,
            description:"Room Booking",
            image:book.image,
            order_id:order.id,
            handler: async (response)=>{
              await axios.post(verifypayment,response)
                .then((res)=>{
                    if(res){
                    const booking="bookingId";
                     setfinal({...finaldata,[booking]:order.id})
                    console.log(finaldata)
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            },
            prefill: {
                name: userdata.userName,
                email: userdata.email,
                
            },
            theme:{
                color:'#3399cc'
            }
        };
        const rzp1= new window.Razorpay(options);
        rzp1.open();
    }

    const handlepayment=()=>{
        
        axios.post(orderpayment,{amount:finaldata.price})
        .then((res)=>{
            const{order}=res.data
            payment(order)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div>
            <Navbar />
            <div className='container'>
                {book ? <div>
                    <div className='card'>
                        <div className='cardimage'>
                            <img src={book.image} alt='...' width={"300px"} height={"300px"}></img>

                        </div>
                        <div className='cardbody'>
                            <h2>{book.name}</h2>
                            <div>
                                <FontAwesomeIcon style={{ color: 'gold' }} icon={faStar} /><span>{book.rating}({book.review})</span>
                            </div>
                            <div className='time'>
                                <div className='card'>
                                    <FontAwesomeIcon icon={faCalendar} /><span>11:00 PM</span>
                                </div>
                                <div className='card'>
                                    <FontAwesomeIcon icon={faCalendar} /><span>12:00 AM</span>
                                </div>

                            </div>
                            <div className='aminities'>
                                {book.aminities.map(item =>
                                    <div className='card'>
                                        {item === 'Breakfast' ? <FontAwesomeIcon className='icon' icon={faBowlFood} /> : item === 'Wifi' ? <FontAwesomeIcon className='icon' icon={faWifi} />
                                            : item === 'Parking' ? <FontAwesomeIcon className='icon' icon={faParking} /> : <FontAwesomeIcon className='icon' icon={faTv} />}<span>{item}</span>
                                    </div>
                                )}


                            </div>
                            <div className='date-area'>
                                <div>
                                    <input type='date' id='startdate' name='startdate' onChange={handledate}></input>
                                </div>
                                <div>
                                    <input type='date' id='enddate' name='enddate' onChange={handledate}></input>
                                </div>
                                <div>
                                    <button className='check-button' onClick={submitdate}>Check</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='table'>
                        <table>
                            <thead>
                                <tr style={{ backgroundColor: 'royalblue', textAlign: 'center', color: 'white' }}>
                                    <td >Room type</td>
                                    <td >No. of Rooms</td>
                                    <td >No. of Days</td>
                                    <td >Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='tablebody' style={{ textAlign: "center" }}>
                                    <td><select style={{ width: '50%' }} name='type' onChange={handler}>
                                        <option>...choose</option>
                                        {type.length > 0 ? type.map(item => <option>{item}</option>) : null}
                                    </select></td>
                                    <td><select style={{ width: '50%' }} onChange={pricehandler}>
                                        <option>...choose</option>
                                        {room.length > 0 ? room.map((_, i) => <option>{i + 1}-₹{_.price * (i + 1)}</option>) : null}
                                    </select></td>
                                    <td>{finaldata.totalDays}</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>₹{finaldata.price}</td>
                                </tr>
                            </tbody>

                        </table>
                        <div className='confirm-btn'>
                            <div>
                            <button onClick={handlepayment}>Confirm Booking</button>
                            <div style={{textAlign:'center',marginTop:'0.5rem'}} >
                            <a href="https://razorpay.com/" target="blank"> <img referrerpolicy="origin" src = "https://badges.razorpay.com/badge-light.png " height={'45px'} width={'113px'}  alt = "Razorpay | Payment Gateway | Neobank"/></a>
                            </div>
                            </div>
                        </div>
                       
                        <div>
                            <h2>Reviews</h2>
                            <div className='review-container'>
                                <div style={{margin:'1rem'}}>
                                <Rating id={id}/>
                                </div>
                                <div className='reviewarea1'>
                                    <Review id={id}/>
                                </div>



                            </div>
                        </div>
                    </div>
                </div> : <Loading />}
            </div>
            <Footer />
        </div>
    );
}

export default Booking;