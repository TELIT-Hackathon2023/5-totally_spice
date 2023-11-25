import cron from "node-cron" ;
import express from 'express';
import {getAllparking} from './parkingModule.js';
import {getUserById} from './userModule.js';
import {ExpiresSoonNotification} from './emailer.js';
const app = express();

const check = async () => {
    var reservations = await getAllparking();
    for (let i = 0; i < reservations.length; i++) {
        const reservation = reservations[i];

        if(reservation.to_time - Date.now() < -900000){
            var user = await getUserById(reservation.user_id);
            if(user!= null){
              var email = user.email;
              await ExpiresSoonNotification(email);
            }
            continue;
        }
        if(reservation.to_time - Date.now() < 0){
            var user = await getUserById(reservation.user_id);
            if(user!= null){
              var email = user.email;
              await ExpiresSoonNotification(email);
            }
            continue;
        }

        if(reservation.to_time - Date.now() < 900000){
           var user = await getUserById(reservation.user_id);
              if(user!= null){
                var email = user.email;
                await ExpiresSoonNotification(email);
              }
        }
        
    }
}

cron.schedule("*/15 * * * * *", check);

app.listen(3000, () => {
  console.log("Notifications on");
});