import express from 'express';
import { getUserById, getUserByEmail, checkUserExist } from '../modules/userModule.js';

const router = express.Router();

const CarAdd = async (req, res) => {

}

const CarRemove = async (req, res) => {

}

const CarGet = async (req, res) => {

}

const GetUserByCarNummber =  async (req, res) => {

}

router.get('/add', CarAdd);
router.get('/remove', CarRemove);
router.get('/get', CarGet);
router.get('/getbyNumber', GetUserByCarNummber);
// Export the router
export default router;
