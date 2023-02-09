const nodemailer = require('nodemailer');
const dotenvb = require('dotenv').config();
function remove_score(x) {
  const b = x.split('_').join(' ');
  return b;
}

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.PUSER,
    pass: process.env.PASS,
  },
});
let ddate = new Date();
let dates = Date.now();
const vmailer = {
  mail: (username, email, testran, pwrd, birth) => {
    var mailOptions = {
      from: 'hrmeetup@meetup.com',
      to: email,
      subject: 'Account verification',
      // text: `Hi ${incomingName} , verify account below ${testran}`,
      // html: `Hi ${incomingName}, verify account below`,
      html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="shortcut icon" href="/reselabackend/imgv/logo.png" type="image/x-icon">
                <title>Meetup Account verification</title>
            </head>
            <style>
                body{
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    text-align: center;
                    text-transform: capitalize;
                }
                h1{
                    padding: 0 2%;
                    text-transform: capitalize;
                }
                
            </style>
            <body>

                <div>
                    <img src="/reselabackend/imgv/logo.png" alt="">
                </div>

                <h1>Meetup verification page</h1>

                <div>
                    <span>Hi ${remove_score(username)} </span>
                    <span>verify account below ${testran}</span>
                </div>


                
                
            </body>
            </html>

      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
};

module.exports = vmailer ;
