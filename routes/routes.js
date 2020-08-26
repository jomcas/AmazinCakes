const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const careersRouter = require("./careersRouter");
const createReviewRouter = require("./createReviewRouter");
const adminRouter = require("./admin/adminRoutes");
const membersRouter = require("./admin/membersRouter");
const applicantsRouter = require("./admin/applicantsRouter");
const reviewsRouter = require("./admin/reviewsRouter");
const productsRouter = require("./admin/productsRouter");
const createProductRouter = require("./admin/createProductRouter");
const products = require("../data/products.json");
const fs = require("fs");
const memberRouter = require("./member/memberRoutes");

const appRouter = function(app) {
    app.get("/", function (req, res) {
        // res.sendFile(__dirname + "/index.html");
        res.render("index", {
            products: products,
            feature: productsRouter.feature
        });
    });

    console.log(productsRouter.feature);
    
    
    loginRouter(app);
    
    registerRouter(app, fs);
    
    careersRouter(app);

    createReviewRouter(app);

    adminRouter(app);

    productsRouter(app);

    createProductRouter(app);
    
    membersRouter(app);

    applicantsRouter(app);

    reviewsRouter(app);

    memberRouter(app);
};


module.exports = appRouter;