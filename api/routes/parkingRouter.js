import express from 'express';
import {ObjectId} from 'mongodb';
import {getParkingById,getReservationStatus,getReservationsByPlace,createParking,deleteParkingById} from '../modules/parkingModule.js';

const router = express.Router();


// Define routes
router.get('/:id', getUserByIdHandler);
router.get('/email/:email', getUserByEmailHandler);
router.post('/check-existence', checkUserExistHandler);
router.post('/create', createUserHandler);
router.delete('delete/:id', deleteUserHandler);


// Export the router
export default router;
