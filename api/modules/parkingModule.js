import {ObjectId} from 'mongodb';
import {connectToDatabase} from './db.js';

export const getParkingById = async (parkingId) => {
    const db = await connectToDatabase();
    const cars = db.collection('parking');
    const id = ObjectId.isValid(parkingId) ? new ObjectId(parkingId) : null;
    return cars.findOne({ _id: id });
};


export const getReservationsByPlace = async (place) => {
    const db = await connectToDatabase();
    const reservations = db.collection('reservations');
    return await reservations.find({ place }).toArray();
};

export const getReservationStatus = async (place, currentTime) => {
    const db = await connectToDatabase();
    const reservations = db.collection('reservations');
    
    const currentReservations = await reservations.find({ place, startTime: { $lte: currentTime }, endTime: { $gte: currentTime } }).toArray();
    
    if (currentReservations.length === 0) {
        return 1; // No reservations for this time
    } else {
        const occupiedReservations = currentReservations.filter(reservation => reservation.car_on_place);
        if (occupiedReservations.length > 0) {
            return 2; // Occupied
        } else {
            return 3; // Waiting
        }
    }
};

export const checkParkingByTime = async (timestamp) => {
    const db = await connectToDatabase();
    const cars = db.collection('parking');
    const query = {};
    if (userID.id) query.id = userID.id;

    return await cars.findOne(query);
};

export const createParking = async (parkingData) => {
    const db = await connectToDatabase();
    const cars = db.collection('parking');
    const result = await cars.insertOne(parkingData);
    if (result.acknowledged) {
        return result.insertedId;
    } else {
        return false;
    }
};

export const deleteParkingById = async (parkingID) => {
    const db = await connectToDatabase();
    const users = db.collection('parking');

    // Ensure the userId is valid, if not, return a message or null
    if (!ObjectId.isValid(parkingID)) {
        throw new Error('Invalid parking ID format');
    }

    const result = await users.deleteOne({ _id: new ObjectId(parkingID) });

    // The result object contains a property 'deletedCount' which is 1 if a document was deleted
    if (result.deletedCount === 1) {
        return { message: 'parking successfully deleted' };
    } else {
        throw new Error('parking not found');
    }
};