import express from 'express';
import { getCarById, getCarByNumber, checkCarByCarID, createCar } from '../modules/carsModule.js';
import {deleteUserById} from "../modules/userModule.js";

const router = express.Router();

// Handler to get a user by ID
const getCarByIdHandler = async (req, res) => {
    try {
        const carID = req.params.id;
        const car = await getCarById(carID);
        // If a user is found, return it in the response
        if (car) {
            res.json(car);
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
const getCarByNumberHandler = async (req, res) => {
    try {
        const number = req.params.number;
        const car = await getCarByNumber(number);
        if (car) {
            res.json(car);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Handler to check if a user exists and return the user if they exist
const checkCarExistHandler = async (req, res) => {
    try {
        const identifier = req.body; // Assuming you pass either { _id: userId } or { email: userEmail }
        const car = await checkCarByCarID(identifier);
        if (car) {
            res.json(car);
        } else {
            res.status(404).send('User does not exist');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createCarHandler = async (req, res) => {
    try {
        const carData = req.body;
        const carID = await createCar(carData);
        res.status(201).json({ _id: carID, ...carData });
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
};

const deleteCarHandler = async (req, res) => {
    try {
        const carID = req.params.id;
        const result = await deleteUserById(carID);
        res.send(result);
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
};

// Define routes
router.get('/:id', getCarByIdHandler);
router.get('/number/:number', getCarByNumberHandler);
router.post('/check-existence', checkCarExistHandler);
router.post('/create', createCarHandler);
router.delete('delete/:id', deleteCarHandler);


// Export the router
export default router;
