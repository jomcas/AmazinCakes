const products = require("../../data/products.json");

const memberRouter = function (app) {
    app.route("/member")

        .get(function (req, res) {
            res.render("memberHome", {
                products: products
            });
        })

        .post(function (req,res) {

        })
};

module.exports = memberRouter;