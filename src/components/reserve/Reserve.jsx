import React, { useContext, useState } from 'react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './reserve.css';
import useFetch from './../../hook/useFetch';
import { SearchContext } from './../../context/SearchContext';
import { AuthContext } from './../../context/AuthContext';

const Reserve = ({ setOpen, hotelId }) => {
    const [payment, setPayment] = useState('');
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error, reFetch } = useFetch(`/hotels/room/${hotelId}`);
    console.log(data);
    const { dates } = useContext(SearchContext);
    const { user } = useContext(AuthContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        let list = [];

        while (date <= end) {
            list.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return list;
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    };

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => allDates.includes(new Date(date).getTime()));
        return !isFound;
    };

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const roomPrice = data.map((item) => item.price);
                    let totalRoomPrice = 0;
                    let totalPrice = 0;
                    roomPrice.forEach((price) => (totalRoomPrice += price));
                    totalPrice = totalRoomPrice * (allDates.length - 1) * selectedRooms.length;
                    console.log({
                        roomPrice: roomPrice,
                        cost: totalPrice,
                        dates: allDates.length,
                        selectedRooms: selectedRooms.length,
                    });
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: allDates,
                        hotelId: hotelId,
                        price: totalPrice,
                        payment: payment,
                        user: user,
                    });
                    return res.data;
                }),
            );
            setOpen(false);

            navigate('/');
        } catch (err) {}
    };

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
                <span>Select your rooms:</span>
                {data.map((item) => {
                    return (
                        <>
                            <div className="rItem">
                                <div className="rItemInfo">
                                    <div className="rTitle">{item.title}</div>
                                    <div className="rDesc">{item.desc}</div>
                                    <div className="rMax">
                                        Max people: <b>{item.maxPeople}</b>
                                    </div>
                                    <div className="rPrice">{item.price}</div>
                                    <div className="rSelected">
                                        {item.roomNumbers.map((roomNumber) => (
                                            <div className="room">
                                                <label>{roomNumber.number}</label>
                                                <input
                                                    type="checkbox"
                                                    value={roomNumber._id}
                                                    onChange={handleSelect}
                                                    disable={!isAvailable(roomNumber)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="rPayment">
                                    <label>Choose your payment: </label>
                                    <select
                                        id="payment"
                                        onChange={(e) => {
                                            setPayment(e.target.value);
                                        }}
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="credit">Credit Card</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    );
                })}
                <button onClick={handleClick} className="rButton">
                    Reserve
                </button>
            </div>
        </div>
    );
};

export default Reserve;
