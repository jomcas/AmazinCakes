const fs = require("fs");
const applicants = require("../data/applicants");
const multer = require('multer');
const mail =  require('../config/nodemailer');
const careersRouter = function (app) {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });

    let upload = multer({
        storage: storage
    });


    app.route("/careers")

        .get(function (req, res) {
            // res.sendFile(__dirname + "/index.html");
            res.render("careers");
        })

        .post(upload.single("resume"), function (req, res) {

            const file = req.file
            if (!file) {
                const error = new Error('Please upload a file');
            }

            // Duplicate Emails Detection
            if (applicants.length > 0) {
                applicants.forEach(function (applicant) {
                    if (req.body.email === applicant.email) {
                        console.log("Email Already Taken! Try again!");
                        // Create a CSS that shows a modal that the email is already taken!
                        res.redirect("careers");
                        return;
                    }
                });
            }

            // Auto increment of ID
            let applicantId = 1;
            let maxId = 0;


            applicants.forEach(function (applicant) {
                if (applicant.id > maxId) {
                    maxId = applicant.id
                }
            });

            if (applicants.length === 0) {
                applicantId = 1;
            } else {
                applicantId = maxId + 1;
            }


            const applicant = {
                id: applicantId,
                job: req.body.job,
                firstName: req.body.fname,
                lastName: req.body.lname,
                gender: req.body.gender,
                email: req.body.email,
                contact: req.body.contact,
                address: req.body.address,
                resume: "",
                status: "pending"
            };

            console.log(applicant);

            applicants.push(applicant);

            fs.writeFile('./data/applicants.json', JSON.stringify(applicants), 'utf8', function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log("sucess");
                    res.render("index");
                }
            });

            mail.sendEmailCareer("amazincakesofficial@gmail.com", applicant.email, "We have received your application email! Wait for a reply for the response.");
        });
};

module.exports = careersRouter;