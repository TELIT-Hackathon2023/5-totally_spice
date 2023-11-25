import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f8c48f409f2a25",
      pass: "aa6f345304b12a"
    }
  });



export const registrationConfirm = async (email,password) => {
    
    var mailOptions = {
        from: 'parking.app@tsystems.sk',
        to: email,
        subject: 'Parking LogIn password',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Приветственное сообщение</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: rgb(226, 0, 116); /* Розовый фон */
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: rgb(255, 255, 255); 
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                }
        
                h1 {
                    color: rgb(226, 0, 116); 
                    font-size: 28px;
                    
                }
        
                p {
                    
                    font-size: 16px;
                    line-height: 1.6;
                }
        
                a {
                    color: #007BFF;
                    text-decoration: none;
                    font-weight: bold;
                }
        
                a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
        <div class="container">
            <h1>Thanks for registering!</h1>
            <p>You can now go to the site and register: <a href="https://www.telekomParking.sk/">telekomParking.sk</a></p>
            <p>Your password is :<h4>`+password+`<h4/></p>
        </div></body></html>`
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};