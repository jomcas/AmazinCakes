const adminRouter = function (app) {
    app.route("/admin")

        .get(function (req, res) {
            res.render("admin");
        })

        .post(function (req,res) {

        })
};

module.exports = adminRouter;