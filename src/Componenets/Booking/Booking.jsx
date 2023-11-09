import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Booking.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlFood, faCalendar, faParking, faStar, faTv, faWifi } from '@fortawesome/free-solid-svg-icons';
import Review from '../Review/Review';
import Footer from '../Footer/Footer';
import Mycontext from '../../Context';
import { bookhotel, getdate, getonehotel, orderpayment, verifypayment } from '../Utilis/Apis';

function Booking(props) {
    const { id } = useParams()
    const { userdata } = useContext(Mycontext)
    const [book, setdata] = useState("")
    const [type, settype] = useState("")
    const [room, setroom] = useState("")
    const [roomdata, setroomdata] = useState([])
    const [finaldata, setfinal] = useState({
        userId: userdata._id,
        totalDays: 0,
        hotelId: id,
        totalRooms: "",
        price: 0,
        bookingId: "",
    })
    const [date, setdate] = useState({ startdate: "", enddate: "" });
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
        finaldata.totalRooms = value[0]
        finaldata.price = finaldata.totalDays * value[1]
        setfinal({ ...finaldata })

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
        if (date.startdate === "" || date.enddate === "") {
            alert("please enter valid date")
        }
        else {
            axios.post(`${getdate}/${id}`, date)
                .then((res) => {
                    const value = res.data.data.map((item) => {
                        return item.type
                    })
                    const order = [...new Set(value)]
                    finaldata.totalDays = res.data.days
                    setroomdata(res.data.data)
                    settype(order)
                    setfinal({ ...finaldata })
                })

                .catch((error) => {
                    return (error)
                })
        }

    }

    const payment = (order) => {
        const options = {
            key: "rzp_test_gXkfVOK0D8Ct2S",
            amount: order.amount,
            currency: order.currency,
            name: book.name,
            description: "Room Booking",
            image: book.image,
            order_id: order.id,
            handler: async (response) => {
                await axios.post(verifypayment, response)
                    .then((res) => {
                        if (res) {
                            finaldata.bookingId = res.data.orderid
                            setfinal({ ...finaldata })
                            axios.post(`${bookhotel}/${id}`, finaldata)
                                .then((res) => {
                                    if (res) {
                                        window.location.href = '/user/bookings'
                                    }
                                })
                                .catch((error) => {
                                    return (error)
                                })


                        }
                    })
                    .catch((error) => {
                        return (error)
                    })
            },
            prefill: {
                name: userdata.userName,
                email: userdata.email,

            },
            theme: {
                color: '#3399cc'
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const handlepayment = () => {

        axios.post(orderpayment, { amount: finaldata.price })
            .then((res) => {
                const { order } = res.data
                payment(order)
            })
            .catch((error) => {
                return (error)
            })
    }

    return (
        <div>
            <Navbar />
            <div className='container'>
                {book ? <div>
                    <div className='card1'>
                        <img src={book.image} className='cardimage' alt='...' width={"300px"} height={"300px"}></img>
                        <div className='cardbody'>
                            <span className='card-title'>{book.name}</span>
                            <div className='card-rating'>
                                <FontAwesomeIcon style={{ color: 'gold' }} icon={faStar} /><span>{book.rating}({book.review})</span>
                            </div>
                            <div className='time'>
                                <div className='card2'>
                                    <FontAwesomeIcon icon={faCalendar} /><span>11:00 PM</span>
                                </div>
                                <div className='card2'>
                                    <FontAwesomeIcon icon={faCalendar} /><span>12:00 AM</span>
                                </div>

                            </div>
                            <div className='aminities'>
                                {book.aminities.map(item =>
                                    <div className='card3'>
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
                    <div className='table-area'>
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
                                    <td><select name='type' onChange={handler}>
                                        <option>...choose</option>
                                        {type.length > 0 ? type.map(item => <option>{item}</option>) : null}
                                    </select></td>
                                    <td><select onChange={pricehandler}>
                                        <option>...choose</option>
                                        {room.length > 0 ? room.map((_, i) => <option>{i + 1}-₹{_.price * (i + 1)}</option>) : null}
                                    </select></td>
                                    <td>{finaldata.totalDays}</td>
                                    <td style={{ color: 'green', fontWeight: 'bold' }}>₹{finaldata.price}</td>
                                </tr>
                            </tbody>

                        </table>
                        <div className='confirm-btn'>
                            <div className='payment-container'>
                                <button onClick={handlepayment}>Confirm Booking</button>
                                <div >
                                    <a href="https://razorpay.com/" target="blank"> <img referrerpolicy="origin" className='pay-image' src="https://badges.razorpay.com/badge-light.png " height={'45px'} width={'113px'} alt="Razorpay | Payment Gateway | Neobank" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rating-review'>
                        <Review id={book._id} />
                    </div>
                </div> : <Loading />}
            </div>
            <Footer />
        </div>
    );
}

export default Booking;