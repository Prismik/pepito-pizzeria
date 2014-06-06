var nodemailer = require("nodemailer");

module.exports = {
    sendMail: function sendMail(msg, msgReceiver, msgSubject, msgText) {
        // create reusable transport method (opens pool of SMTP connections)
        var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
                user: "pepitopizzeria@gmail.com",
                pass: "califourchon"
            }
        });

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: "Pepito Pizzeria <pepitopizzeria@gmail.com>", // sender address
            to: msgReceiver, // list of receivers
            subject: msgSubject, // Subject line
            text: msgText, // plaintext body
            html: "<b>" + msg + "</b>" // html body
        }

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error)
                console.log(error);
            else
                console.log("Message sent: " + response.message);

            // don't want to use this transport object anymore
            smtpTransport.close(); // shut down the connection pool, no more messages
        });
    }
}