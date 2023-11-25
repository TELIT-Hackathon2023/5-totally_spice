import {ObjectId} from 'mongodb';
import {connectToDatabase} from './db.js';

export const getUserById = async (userId) => {
    const db = await connectToDatabase();
    const users = db.collection('users');
    return users.findOne({ id: userId });
};

export const getUserByEmail = async (email) => {
    const db = await connectToDatabase();
    const users = db.collection('users');
    return users.findOne({ email: email }); // Directly use the email parameter in the query
};


export const checkUserExist = async (identifier) => {
    const db = await connectToDatabase();
    const users = db.collection('users');
    const query = {};
    if (identifier.id) query.id = identifier.id;
    if (identifier.email) query.email = identifier.email;

    return await users.findOne(query);
};
