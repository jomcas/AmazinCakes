const fs = require("fs");
const products = require("../../data/products.json");

const createProductRouter = function(app) {

    app.route("/addProduct")


    .get(function(req,res) {
        res.render("createProduct");
    })

    .post(function(req,res) {

        console.log("nangyari 1");
        
        // Auto increment of ID
        let productId = 1;
        let maxId = 0;


        products.forEach(function (product) {
            if (product.id > maxId) {
                maxId = product.id
            }
        });

        console.log("nangyari 2");

        if (products.length === 0) {
            productId = 1;
        } else {
            productId = maxId + 1;
        }

        const product = {
            id: productId,
            category: req.body.category,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image
        }

        console.log("ayos lang");
        
        console.log(product);
        products.push(product);
   

        fs.writeFile('././data/products.json', JSON.stringify(products), 'utf8', function (err) {
            if (err) {
                throw err;
            } else {
                console.log("success");
                res.render("adminProducts");
            }
        });
    })
};

module.exports = createProductRouter;