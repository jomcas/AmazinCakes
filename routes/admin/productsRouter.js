const fs = require("fs");
const products = require("../../data/products.json");
const feature = {
    name: "Black Forest",
    description: "Masaya naman",
    image: ""
};
const productsRouter = function (app) {
    app.route("/products")


        .get(function (req, res) {
            res.render("adminProducts", {
                products: products
            });
        })

        .post(function (req, res) {
            const id = parseInt(req.body.productId);

            products.forEach(function (product, index) {
                if (product.id === id) {
                    products.splice(index, 1);
                    console.log("dumaan sa loop");
                }
            });

            fs.writeFile('./data/products.json', JSON.stringify(products), 'utf8', function (err) {
                if (err) {
                    throw err;
                }

                console.log("nagwrite");
            });

            res.redirect("/products");
        });


    app.post("/saveFeature", function (req, res) {

        const cake = req.body.cake;
        const desc = req.body.description;

        console.log("Gumagana sa una");

        products.forEach(function (product) {
            if (product.category === "Cakes") {
                console.log(product.name + "===" + cake);
                if (product.name === cake) {
                    // feature = {
                    //     name: cake,
                    //     description: desc,
                    //     image: product.image
                    // };
                    console.log("Nangyayari");
                    feature.name = cake;
                    feature.description = desc;
                    feature.image = product.image
                }
            }
        });

        res.redirect("/products");
    })
};

module.exports = productsRouter;
module.exports.feature = feature;