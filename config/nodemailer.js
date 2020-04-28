const nodemailer = require("nodemailer");


const sendEmailCareer = function(sender, receiver, message) {
let transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
        user: "amazincakesofficial@gmail.com",
        pass: "amazincakes"

    }
});

let mailOptions = {
    from: sender,
    to: receiver,
    cc: "",
    bcc: "",
    subject: "Amazin Cakes Career Application",
    text: ""
};

transporter.sendMail(mailOptions, function(err, info) {
    if(err) {
        console.log(err);
    } else {
        console.log("Message Sent");
    }
})

};

module.exports = sendEmailCareer;