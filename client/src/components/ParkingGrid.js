import React, { useState, useEffect } from 'react';
import '../styles/ParkingGrid.css';

function ParkingGrid({ onSpotSelect }) {
  const [spots, setSpots] = useState([]);
  const [reservationStatuses, setReservationStatuses] = useState([]);
  const [totalColumns, setTotalColumns] = useState(0);

  // Fetch the parking zone data and initialize spots
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/zone/all');
        const zones = await response.json();
        const { height, width } = zones[0];
        setTotalColumns(width);
        setSpots(Array.from({ length: height }, () =>
          Array.from({ length: width }, () => false)
        ));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch the reservation statuses for all spots
  useEffect(() => {
    if (spots.length === 0 || totalColumns === 0) return;

    const fetchStatuses = async () => {
      // Create an array to hold all the fetch promises
      const fetchPromises = spots.flatMap((row, rowIndex) =>
        row.map((_, columnIndex) =>
          fetch(`http://localhost:8000/api/parking/status?place=${rowIndex * totalColumns + columnIndex}`)
        )
      );

      // Execute all fetch promises
      const responses = await Promise.all(fetchPromises);
      const statuses = await Promise.all(responses.map(res => res.json()));

      // Transform the flat status array into a 2D array matching the spots
      const statusRows = Array.from({ length: spots.length }, (_, rowIndex) =>
        statuses.slice(rowIndex * totalColumns, (rowIndex + 1) * totalColumns)
      );

      setReservationStatuses(statusRows);
    };

    fetchStatuses();
  }, [spots, totalColumns]);

  const handleSpotClick = (rowIndex, columnIndex) => {
    // ... Your existing spot click handler logic
    onSpotSelect(rowIndex * totalColumns + columnIndex);
  };

  return (
    <div className="parking-grid">
      {spots.map((row, rowIndex) => (
        <div key={rowIndex} className="parking-row">
          {row.map((_, columnIndex) => {
            const status = reservationStatuses[rowIndex]?.[columnIndex];
            let className = 'parking-spot free'; // Default to free
            if (status === 2) className = 'parking-spot reserved';
            if (status === 3) className = 'parking-spot occupied';
            return (
              <div
                key={columnIndex}
                className={className}
                onClick={() => handleSpotClick(rowIndex, columnIndex)}
              >
                <div className="parking-spot-inner" />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ParkingGrid;
