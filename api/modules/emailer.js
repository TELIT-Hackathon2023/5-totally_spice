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
        html: '<b>Thank you for registering on our parking app  </b><br> Your password is :'+password
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};