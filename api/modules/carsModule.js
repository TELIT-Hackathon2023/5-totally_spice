import {ObjectId} from 'mongodb';
import {connectToDatabase} from './db.js';

export const getCarById = async (carId) => {
    const db = await connectToDatabase();
    const cars = db.collection('cars');
    const id = ObjectId.isValid(carId) ? new ObjectId(carId) : null;
    return cars.findOne({ _id: id });
};

export const getCarByNumber = async (number) => {
    const db = await connectToDatabase();
    const cars = db.collection('cars');
    return cars.findOne({ number: number }); // Directly use the email parameter in the query
};


export const checkCarByCarID = async (userID) => {
    const db = await connectToDatabase();
    const cars = db.collection('cars');
    const query = {};
    if (userID.id) query.id = userID.id;

    return await cars.findOne(query);
};

export const createCar = async (carData) => {
    const db = await connectToDatabase();
    const cars = db.collection('cars');
    const result = await cars.insertOne(carData);
    if (result.acknowledged) {
        return result.insertedId;
    } else {
        return false;
    }
};

export const deleteCarById = async (carID) => {
    const db = await connectToDatabase();
    const users = db.collection('cars');

    // Ensure the userId is valid, if not, return a message or null
    if (!ObjectId.isValid(carID)) {
        throw new Error('Invalid user ID format');
    }

    const result = await users.deleteOne({ _id: new ObjectId(carID) });

    // The result object contains a property 'deletedCount' which is 1 if a document was deleted
    if (result.deletedCount === 1) {
        return { message: 'User successfully deleted' };
    } else {
        throw new Error('User not found');
    }
};