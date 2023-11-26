// Table.js
import React from 'react';
import '../styles/Table.css';

const Table = ({ data }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Place</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.place}</td>
                    <td>{item.time}</td>
                    <td>{item.status}</td>
                    <td>
                        {/* Buttons for actions */}
                        <button>Delete</button>
                        <button>Change Time</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
