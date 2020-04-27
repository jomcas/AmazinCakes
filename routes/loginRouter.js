const members = require("../data/members");
const loginRouter = function (app) {

    // passport.use(new LocalStrategy({
    //         usernameField: 'email',
    //         passwordField: 'password',
    //         passReqToCallback: true
    //     },

    //     function (username, password, done) {

    //         members.forEach(function (member) {
    //             console.log("nangyayari");

    //             if (username === member.email) {
    //                 if (password === member.password) {
    //                     return done(null, member);
    //                 } else {
    //                     return done(null, false, {
    //                         message: "Incorrect password"
    //                     });
    //                 }
    //             }
    //         });

    //         return done(null, false, {
    //             message: "No user found!"
    //         });
    //     }

    // ));


    app.route("/login")

        .get(function (req, res) {
            // res.sendFile(__dirname + "/index.html");
            res.render("login");
        })

        .post(function (req, res) {
            const user = {
                email: req.body.email,
                password: req.body.password
            };
            members.forEach(function (member) {


                if (user.email === member.email && user.password == member.password) {
                    console.log("Login Sucessfully!");
                    if (member.role === "member") {
                        res.render("member");
                        return;
                    } else if (member.role === "admin") {
                        res.render("admin");
                        return;
                    } else {
                        console.log(error)
                        return;
                    }
                    return;
                } 
                console.log("Invalid Credentials");
            });
        });
};

module.exports = loginRouter;