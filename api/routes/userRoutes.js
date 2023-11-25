import express from 'express';
import { getUserById, getUserByEmail, checkUserExist } from '../modules/userModule.js';
import {ObjectId} from "mongodb";

const router = express.Router();

// Handler to get a user by ID
const getUserByIdHandler = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);
        // If a user is found, return it in the response
        if (user) {
            res.json(user);
        } else {
            // If no user is found, return a 404 (Not Found) status code
            res.status(404).send('User not found');
        }
    } catch (error) {
        // If there's an error (e.g., invalid ObjectId format), return a 500 (Internal Server Error) status code
        res.status(500).send('Error retrieving user: ' + error.message);
    }
};

// Handler to get a user by Email
const getUserByEmailHandler = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await getUserByEmail(email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handler to check if a user exists and return the user if they exist
const checkUserExistHandler = async (req, res) => {
    try {
        const identifier = req.body; // Assuming you pass either { _id: userId } or { email: userEmail }
        const user = await checkUserExist(identifier);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User does not exist');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Define routes
router.get('/:id', getUserByIdHandler);
router.get('/email/:email', getUserByEmailHandler);
router.post('/check-existence', checkUserExistHandler);

// Export the router
export default router;
