import React, { useState, useEffect } from 'react';
import Table from './Table';
import "../styles/AdminPanel.css";

const AdminPanel = () => {
    const [reservationsData, setReservationsData] = useState([]);
    const places = Array.from({ length: 15 }, (_, i) => i + 1); // Assuming places are numbered 1 to 15

    const handleDelete = async (reservationId) => {
        console.log(reservationsData[reservationId - 1].place);
        // API call to delete the reservation
        const reservations = await fetchReservationsForPlace(reservationsData[reservationId - 1].place);
        console.log('Deleting reservation with ID:', reservations);
        // Example fetch call:
        const response = await fetch(`http://localhost:8000/api/parking/delete/${reservations[0]._id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.status === 'success') {
            // Data deleted successfully, now refetch the reservations
            const fetchUserData = async (userId) => {
                const userResponse = await fetch(`http://localhost:8000/api/user/${userId}`);
                if (!userResponse.ok) {
                    throw new Error('User data fetch failed: ' + userResponse.statusText);
                }
                return await userResponse.json();
            };

            const fetchData = async () => {
                try {
                    let allReservations = [];
                    let orderNumber = 1;

                    for (const place of places) {
                        const reservations = await fetchReservationsForPlace(place);
                        for (const reservation of reservations) {
                            if (reservation.car_on_place === true) {
                                const user = await fetchUserData(reservation.user_id);
                                allReservations.push({
                                    id: orderNumber++,
                                    name: `${user.name} ${user.surname}`,
                                    place: reservation.place,
                                    time: `${new Date(parseInt(reservation.from_time)).toLocaleTimeString()} - ${new Date(parseInt(reservation.to_time)).toLocaleTimeString()}`,
                                    status: reservation.car_on_place ? "Busy" : "Available"
                                });
                            }
                        }
                    }

                    setReservationsData(allReservations);
                } catch (error) {
                    console.error("There was a problem with the fetch operation:", error);
                }
            };

            fetchData();
        } else {
            // Handle the error, maybe the item was not found or there was a server error
            console.error('Deletion was not successful:', data);
        }


    };

    const handleChangeTime = (reservationId) => {
        // Placeholder for changing the time
        console.log('Changing time for reservation with ID:', reservationId);
        // You might need a modal or another component to select the new time
    };

    const fetchReservationsForPlace = async (place) => {
        const placeQuery = encodeURIComponent(place);
        const response = await fetch(`http://localhost:8000/api/parking/all?place=${placeQuery}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return await response.json();
    };

    useEffect(() => {
        const fetchUserData = async (userId) => {
            const userResponse = await fetch(`http://localhost:8000/api/user/${userId}`);
            if (!userResponse.ok) {
                throw new Error('User data fetch failed: ' + userResponse.statusText);
            }
            return await userResponse.json();
        };

        const fetchData = async () => {
            try {
                let allReservations = [];
                let orderNumber = 1;

                for (const place of places) {
                    const reservations = await fetchReservationsForPlace(place);
                    for (const reservation of reservations) {
                        if (reservation.car_on_place === true) {
                            const user = await fetchUserData(reservation.user_id);
                            allReservations.push({
                                id: orderNumber++,
                                name: `${user.name} ${user.surname}`,
                                place: reservation.place,
                                time: `${new Date(parseInt(reservation.from_time)).toLocaleTimeString()} - ${new Date(parseInt(reservation.to_time)).toLocaleTimeString()}`,
                                status: reservation.car_on_place ? "Busy" : "Available"
                            });
                        }
                    }
                }

                setReservationsData(allReservations);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="admin-panel">
            <Table data={reservationsData} onDelete={handleDelete} onChangeTime={handleChangeTime} />
        </div>
    );
};

export default AdminPanel;
