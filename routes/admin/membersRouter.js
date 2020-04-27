const members = require("../../data/members");
const fs = require("fs");
const membersRouter = function (app) {
    app.route("/members")

        .get(function (req, res) {
            res.render("members", {
                members: members
            });
        })


        .post(function (req, res) {
            const id = parseInt(req.body.memberId);

            members.forEach(function (member, index) {
                if(member.id === id) {
                    members.splice(index, 1);
                    console.log("dumaan sa loop");
                }
            });

            fs.writeFile('./data/members.json', JSON.stringify(members), 'utf8', function (err) {
                if (err) {
                    throw err;
                }

                console.log("nagwrite");
            });

            res.redirect("/members");
        });
}

module.exports = membersRouter;