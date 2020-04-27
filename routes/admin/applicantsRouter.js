const applicants = require("../../data/applicants");
const fs = require("fs");
const applicantsRouter = function (app) {

    function setStatus(status, id, res) {

        applicants.forEach(function (applicant) {
            if (applicant.id === id) {
                applicant.status = status;
                console.log(applicant.status + " = " + status);
                console.log("dumaan sa loop");
            }
        });

        fs.writeFile('./data/applicants.json', JSON.stringify(applicants), 'utf8', function (err) {
            if (err) {
                throw err;
            }
        });

        res.redirect("/applicants");
    }

    app.route("/applicants")

        .get(function (req, res) {
            res.render("applicants", {
                applicants: applicants,
                status: "All"
            });
        })


        .post(function (req, res) {

        });


    app.route("/applicants-:status")
        .get(function (req, res) {
            const status = req.params.status;

            if (status === "accepted") {
                const acceptedApplicant = [];

                applicants.forEach(function (applicant) {
                    if (applicant.status == "accepted") {
                        acceptedApplicant.push(applicant);
                    }
                });

                res.render("applicants", {
                    applicants: acceptedApplicant,
                    status: "Accepted"
                });
            } else if (status === "rejected") {
                const rejectedApplicant = [];

                applicants.forEach(function (applicant) {
                    if (applicant.status == "rejected") {
                        rejectedApplicant.push(applicant);
                    }
                });

                res.render("applicants", {
                    applicants: rejectedApplicant,
                    status: "Rejected"
                });

            } else if (status === "pending") {
                const pendingApplicant = [];

                applicants.forEach(function (applicant) {
                    if (applicant.status == "pending") {
                        pendingApplicant.push(applicant);
                    }
                });

                res.render("applicants", {
                    applicants: pendingApplicant,
                    status: "Pending"
                });
            } else {
                res.redirect("/applicants");
            }

        });

    app.route("/applicants-:status")

        .get(function (req, res) {

        })

        .post(function (req, res) {
            const status = req.params.status;
            if (status === "accept") {
                const id = parseInt(req.body.applicantIdAccept);
                setStatus("accepted", id, res);
            } else if (status === "reject") {
                const id = parseInt(req.body.applicantIdReject);
                setStatus("rejected", id, res);
            } else {
                res.redirect("/applicants")
            }
        });
};

module.exports = applicantsRouter;