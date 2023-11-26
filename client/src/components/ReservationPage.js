import React, {useEffect, useState} from 'react';
import ParkingGrid from './ParkingGrid';

import '../styles/ReservationPage.css';
import {useAuth} from './AuthContext';
import {useNavigate} from "react-router-dom";

function ReservationPage() {
    const navigator = useNavigate();
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [spotDetails, setSpotDetails] = useState('');
    const [spotDetailsData, setSpotDetailsData] = useState('');
    const [userData, setUserData] = useState('');
    const [userDataForUpload, setUserDataForUpload] = useState('');
    const [carDataForUpload, setCarDataForUpload] = useState('');
    const [carData, setSpotDetailsCarData] = useState('');
    const { user } = useAuth(); // Assuming you store the user data in the context after login
    const gridId = "656258d5a2e17935b5651cf9";
    console.log(user);

    const fetchGetUserByEmail = (email) => {
        fetch(`http://localhost:8000/api/user/email/${email}`)
            .then(function(value){

                console.log(value);
                return value;
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    useEffect(() => {
        if (userDataForUpload && userDataForUpload._id) {
            fetchGetCarByUserId(userDataForUpload._id);
        }
    }, [userDataForUpload]); // This effect runs when userDataForUpload changes



    const fetchGetCarByUserId = (userId) => {
        console.log(userId);
        fetch(`http://localhost:8000/api/car/get/user/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(async data => {
                await setCarDataForUpload(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching spot details:', error);
                setSpotDetails('Error fetching details');
            });
    };

    const [formData, setFormData] = useState({

        user_id: '',
        car_id: '',
        from_time: '',
        to_time: '',
        car_on_place: '',
        zone_id: '',
        created_at : '',
        place: ''
    });

    const [times, setTimes] = useState({ from_time: null, to_time: null });
    const [isLoading, setIsLoading] = useState(true);


    const fetchSpotDetails = (index) => {
        fetch(`http://localhost:8000/api/parking/status?place=${index}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(status => {
                // convert 1, 2, 3 to Free, Reserved, Occupied
                let statusText = '';
                switch (status) {
                    case 1: statusText = 'Free'; break;
                    case 2: statusText = 'Reserved'; break;
                    case 3: statusText = 'Occupied'; break;
                    default: statusText = 'Unknown'; break;
                }
                setSpotDetails(statusText);

                // If the spot is not free, fetch user and car data
                if (status !== 1) {
                    fetchSpotSetData(index);
                } else {
                    // If the spot is free, clear previous user and car data
                    setUserData('');
                    setSpotDetailsCarData('');
                }
            })
            .catch(error => {
                console.error('Error fetching spot details:', error);
                setSpotDetails('Error fetching details');
            });
    };


    const fetchSpotSetUserData = (index) => {
        fetch(`http://localhost:8000/api/user/${index}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
                console.log(data, index);
            })
            .catch(error => {
                console.error('Error fetching spot details:', error);
                // setSpotDetails('Error fetching details');
            });
    };


    const fetchSpotSetData = (index) => {
        fetch(`http://localhost:8000/api/parking/all?place=${index}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(async data => {
                setSpotDetailsData(data);
                await fetchSpotSetUserData(data[0].user_id)
                await fetchSpotSetCarData(data[0].car_id);
                console.log(data, index);
                console.log(convertUnixTimeToGMT(parseInt(data[0].to_time, 10)));
            })
            .catch(error => {
                console.error('Error fetching spot details:', error);
                // setSpotDetails('Error fetching details');
            });
    };

    const fetchSpotSetCarData = (index) => {
        fetch(`http://localhost:8000/api/car/${index}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSpotDetailsCarData(data);
                // console.log(data, index);
                // console.log(convertUnixTimeToGMT(parseInt(data[0].to_time, 10)));
            })
            .catch(error => {
                console.error('Error fetching spot details:', error);
                // setSpotDetails('Error fetching details');
            });
    };

    useEffect(() => {
        if (selectedSpot) {
            fetchSpotDetails(selectedSpot.index);
            fetchSpotSetData(selectedSpot.index);

        }
    }, [selectedSpot]);

    function convertUnixTimeToGMT(unixTimestamp) {
        // Log the input for debugging
        console.log('Timestamp input:', unixTimestamp);

        // Parse the timestamp to an integer in case it's a string
        var timestamp = parseInt(unixTimestamp, 10);

        // Check if the parsed timestamp is a number
        if (isNaN(timestamp)) {
            console.error('Invalid timestamp:', unixTimestamp);
            return 'Invalid Date';
        }

        // Create a new Date object from the Unix timestamp
        var date = new Date(timestamp);

        // Convert to UTC date string
        return date.toUTCString();
    }

    const chooseSpot = () => {
        const defaultSpot = { index: 1, details: "Default Spot" };
        setSelectedSpot(defaultSpot);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(e.target.name, (e.target.value));
    };

    function convertTimeToUnix(timeStr) {
        // Create a new Date object for the current day
        const now = new Date();
        const [hours, minutes] = timeStr.split(':').map(Number);

        // Set the time to the values extracted from the time string
        now.setHours(hours);
        now.setMinutes(minutes);
        now.setSeconds(0);
        now.setMilliseconds(0);

        // Get the Unix timestamp in milliseconds and convert to seconds
        return Math.floor(now.getTime());
    }

    function fetchSetDataToPark(selectedSpot, carDataForUpload, userDataForUpload, from_time, to_time, gridId) {
        const createReservationData = {
            user_id: userDataForUpload, // Assuming this is set correctly from previous fetch
            car_id: carDataForUpload, // Assuming this is set correctly from previous fetch// Assuming this converts to the correct format
            place: selectedSpot,
            from_time: from_time,
            to_time: to_time, // Assuming this converts to the correct format
            zone_id: gridId, // Already set as an ObjectId string
            // Include any additional fields your backend expects
        };
        console.log(createReservationData);

        fetch(`http://localhost:8000/api/parking/create?user_id=${createReservationData.user_id}&car_id=${createReservationData.car_id}&place=${selectedSpot + 1}&from_time=${createReservationData.from_time}&to_time=${createReservationData.to_time}&zone_id=${createReservationData.zone_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include other headers like Authorization if needed
            },
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        var userRet = fetchGetUserByEmail(user.email);
        console.log(userRet);
        fetchGetCarByUserId(userRet._id);
        console.log(carDataForUpload);
        fetchSetDataToPark(parseInt(selectedSpot),carDataForUpload._id, userRet._id,convertTimeToUnix(formData.startTime), convertTimeToUnix(formData.endTime),"656258d5a2e17935b5651cf9")
    };


    const handleSpotSelection = (index) => {
        setSelectedSpot({ index });
    };



    return (
        <div className="reservation-page">
            <ParkingGrid onSpotSelect={handleSpotSelection} />
            <div className={`reservation-form ${selectedSpot ? 'active' : ''}`}>
                <h1>Reservation Form</h1>
                <p className="selected-spot">
                    Selected Spot: {selectedSpot ? `Index ${selectedSpot.index}` : 'No spot selected'}
                </p>
                <p className={`spot-status ${spotDetails?.toLowerCase()}`}>{spotDetails || 'No status'}</p>
                <div className="reservation-times">
                    {spotDetailsData && spotDetailsData[0] && (
                        <>
                            <p>From: {convertUnixTimeToGMT(spotDetailsData[0].from_time)}</p>
                            <p>To: {convertUnixTimeToGMT(spotDetailsData[0].to_time)}</p>
                        </>
                    )}
                    {spotDetails !== "Free" && userData && carData && (
                        <>
                            <p>Email: {userData.email}</p>
                            <p>Car Number: {carData.number}</p>
                        </>
                    )}
                </div>
                {selectedSpot ? (
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                        </div>
                        {/* ... Repeat similar blocks for other form fields ... */}
                        {spotDetails === "Occupied" && (
                            <div className="time-range">
                                <label>
                                    Start Time:
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    End Time:
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        )}
                        {spotDetails === "Reserved" && (
                            <div className="time-range">
                                <label>
                                    Start Time:
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    End Time:
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        )}
                        {spotDetails === "Free" && (
                            <div className="time-range">
                                <label>
                                    Start Time:
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    End Time:
                                    <input
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        )}
                        <input
                            type="submit"
                            value="Reserve"
                            className="submit-button"
                        />
                    </form>
                ) : (
                    <button
                        onClick={chooseSpot}
                        className="choose-spot-button"
                    >
                        Choose Spot
                    </button>
                )}
            </div>


        </div>
    );
}

export default ReservationPage;