// AdminPanel.js
import React, {useEffect, useState} from 'react';
import Table from './Table';

const AdminPanel = () => {
    const [reservationsData, setReservationsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'your-endpoint-url' with the actual endpoint URL
                const response = await fetch('http://localhost:8000/api/auth/registration/add');
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                setReservationsData(data);
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        };

        fetchData();
    }, []); // The empty array causes this effect to only run on mount

    return (
        <div className="admin-panel">
            <Table data={reservationsData} />
            {/* You can add more admin features here */}
        </div>
    );
};

export default AdminPanel;
