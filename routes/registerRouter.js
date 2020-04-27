const fs = require("fs");
const members = require("../data/members");

const registerRouter = function (app, fs) {
    app.route("/register")

        .get(function (req, res) {
            res.render("register");
        })

        .post(function (req, res) {
            // Checking for duplicate emails
            if (members.length > 0) {
                members.forEach(function (member) {
                    if (req.body.email === member.email) {
                        console.log("Email Already Taken! Try again!");
                        // Create a CSS that shows a modal that the email is already taken!
                        res.redirect("register");
                        return;
                    } 
                });
            }

            let memberId = 1;
            let maxId = 0;

            // ID Increment
            members.forEach(function (member) {
                if (member.id > maxId) {
                    maxId = member.id
                }
            });

            if (members.length === 0) {
                memberId = 1;
            } else {
                memberId = maxId + 1;
            }

            const member = {
                id: memberId,
                fullname: req.body.name,
                email: req.body.email,
                password: req.body.password,
                contact: req.body.contact,
                address: req.body.address,
                role: "member"
            };

            members.push(member);
            
            fs.writeFile('./data/members.json', JSON.stringify(members), 'utf8', function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log("sucess");
                    res.render("index");
                }
            });

            console.log(members);
        });
};

module.exports = registerRouter;