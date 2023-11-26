// Table.js
import React from 'react';
import '../styles/Table.css';

const Table = ({ data, onDelete, onChangeTime }) => {
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
                        <button
                            className="table-button delete-button"
                            onClick={() => onDelete(item.id)}
                        >
                            Delete
                        </button>
                        {/*<button*/}
                        {/*    className="table-button change-time-button"*/}
                        {/*    onClick={() => onChangeTime(item.id)}*/}
                        {/*>*/}
                        {/*    Change Time*/}
                        {/*</button>*/}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
