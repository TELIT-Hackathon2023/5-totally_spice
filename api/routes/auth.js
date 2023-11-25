import express from 'express';
import { getUserById, getUserByEmail, checkUserExist } from '../modules/userModule.js';

const router = express.Router();

const RegistrationHandler = async (req, res) => {
    var name = req.query.name ;
    var surname = req.query.surname;
    var email = req.query.email;
    var car_number = req.query.car_number;
    var car_name = req.query.car_name;
    var password = generateRandomPassword();
    var data = {
        name: name,
        surname: surname,
        is_admin: false,
        social_score: 100,
        email: email,
        password: password,
    };
    

    if (name && surname && email && car_number && car_name) {
        // All variables exist and are not null
        const emailValid = endsWith(email, 'tsystems.sk');
        if (emailValid) {
            res.status(200).json({ data: req.query, status: 'success' });
        } else {
            res.status(400).json({ status: 'error' , message : 'Invalid email host must be tsystems.sk' });
        }
    } else {
        res.status(400).json({ status: 'error', message : 'On of the fields are empty' });
    }
};
const generateRandomPassword = () => {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
};



const LoginHandler = async (req, res) => {
    var email = req.query.email;
    var password = req.query.password;
    if (email && password) {
        // All variables exist and are not null
        const emailValid = endsWith(email, 'tsystems.sk');
        if (emailValid) {

            var user = await getUserByEmail(email);
            
            if(user){
                if(user.password == password){
                    res.status(200).json({ data: user, status: 'success' });
                }else{
                    res.status(400).json({ status: 'error' , message: 'wrong password' });
                    
                }
                
            }else{
                res.status(400).json({ status: 'error' , message: 'user not found' });
            }
            
        } else {
            res.status(400).json({ status: 'error' , message: 'wrong email host' });
        }
    } else {
        res.status(400).json({ status: 'error' });
    }
}

const RegistrationEmailCheckHandler = async (req, res) => {
    const email = req.query.email;
    if(email != null){
        if (endsWith(email,'tsystems.sk')) {
            res.status(200).json({ valid: 1 });
        } else {
            res.status(200).json({ valid: 0 });
        }
    }else{
        res.status(200).json({ valid: 0 });
    }
    
};

function endsWith(email, host) {
    // Get the domain from the email
    var domain = email.split('@')[1];

    // Check if the domain matches the host
    if (domain === host) {
        return true;
    } else {
        return false;
    }
}

router.get('/login', LoginHandler);
router.get('/registration/emailCheck', RegistrationEmailCheckHandler);
router.get('/registration/add', RegistrationHandler);

// Export the router
export default router;
