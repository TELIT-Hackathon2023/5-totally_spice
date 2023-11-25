import express from 'express';
import {ObjectId} from 'mongodb';
import {getParkingById,getReservationStatus,getReservationsByPlace,createParking ,carArrived,deleteParkingById,getParkingByCarId} from '../modules/parkingModule.js';
import {getCarById, getCarByNumber, checkCarByCarID, createCar, deleteCarById} from '../modules/carsModule.js';
const router = express.Router();
const getAllCurrentparkingReservations = async (req, res) => {
    var place = req.query.place;
  
    const reservations = await getReservationsByPlace(place);
    if (reservations) {
        res.json(reservations);
    } else {
        res.status(404).send('Reservations not found');
    }
}

const getAllCurrentparkingReservationStatus = async (req, res) => {
    var place = req.query.place;
    var currentTime = Date.now();
    const status = await getReservationStatus(place,currentTime);
    if (status) {
        res.json(status);
    } else {
        res.status(404).send('Reservations not found');
    }
}
const checkifAvaliable = async(from, to, place ,car_id)=> {
    const reservations = await getReservationsByPlace(place);
    
    for (let i = 0; i < reservations.length; i++) {
        const reservation = reservations[i];
        
        if (from < reservation.from_time && to > reservation.to_time) {
            return false;
        }
   
       
        if (from > reservation.from_time && to < reservation.to_time) {
            return false;
        }
    
        if (from == reservation.from_time && to == reservation.to_time) {
            return false;
        }
   
        if (reservation.from_time < from && from < reservation.to_time || reservation.from_time < to && to < reservation.to_time) {
            return false;
        }
        if(reservation.car_id == new ObjectId(car_id)){
            return false;
        }
    }

    return true;
}


const createReservation = async (req, res) => {
    var place = req.query.place;
    var car_id = new ObjectId(req.query.car_id);
    var user_id = new ObjectId(req.query.user_id);
    var from_time = req.query.from_time;
    var to_time = req.query.to_time;
    var car_on_place = false;
    var zone_id = new ObjectId(req.query.zone_id)
    var created_at = Date.now();

    
    if(place && car_id && user_id && from_time && to_time && zone_id){
        if(from_time > to_time){
            res.status(400).json({ status: 'error' , message: 'starting time cant be higher than ending time' });
            return;
        }
        if(from_time - created_at < 3600000){
            res.status(400).json({ status: 'error' , message: 'starting time must be hour before start' });
            return;
        }
        if(to_time - created_at > 86400000){
            res.status(400).json({ status: 'error' , message: 'ending time must be less that in 24 hours' });
            return;
        }
    
        if(to_time - from_time < 3600000){
            res.status(400).json({ status: 'error' , message: 'parking cant be shorter than 1 hour' });
            return;
        }
        if(await checkifAvaliable(from_time,to_time,place,car_id)){
            var data = {
                place: place,
                car_id: car_id,
                user_id: user_id,
                from_time: from_time,
                to_time: to_time,
                car_on_place: car_on_place,
                zone_id: zone_id,
                created_at: created_at,
                notified: false,
                expired :false
            }
            var reservationId = await createParking(data);
    
            if (reservationId) {
                res.status(200).json({ status: 'success' });
            } else {
                res.status(400).json({ status: 'error' });
            }
        }else{
            res.status(400).json({ status: 'error' , message: 'parking place is not avaliable' });
        }
    }
    
}

const deleteReservation = async (req, res) => {
    
    var reservationId = req.params.id;
    const result = await deleteParkingById(new ObjectId(reservationId));
    if (result) {
        res.status(200).json({ status: 'success' });
    } else {
        res.status(400).json({ status: 'error' });
    }
}


const CarArrivedHandler = async (req, res) => {
    
    var number = req.params.number;
    var car = await getCarByNumber(number);
    if(car == null){
        res.status(400).json({ status: 'error' , message: 'no car found' });
        return
    }
    var reservation = await getParkingByCarId(car._id);
    if(reservation == null){
        res.status(400).json({ status: 'error' , message: 'no reservation found' });
        return
    }
    var result = await carArrived(reservation._id);
    if (result != null) {
        res.status(200).json({ status: 'success' });
    } else {
        res.status(400).json({ status: 'error' });
    }
}


router.get('/all', getAllCurrentparkingReservations);
router.get('/arrived/:number', CarArrivedHandler);
router.get('/status', getAllCurrentparkingReservationStatus);
router.post('/create',createReservation );
router.delete('/delete/:id',deleteReservation);


// Export the router
export default router;
