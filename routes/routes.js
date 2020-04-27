const loginRouter = require("./loginRouter");
const registerRouter = require("./registerRouter");
const careersRouter = require("./careersRouter");
const createReviewRouter = require("./createReviewRouter");
const adminRouter = require("./admin/adminRoutes");
const membersRouter = require("./admin/membersRouter");
const applicantsRouter = require("./admin/applicantsRouter");
const reviewsRouter = require("./admin/reviewsRouter");
const fs = require("fs");

const appRouter = function(app) {
    app.get("/", function (req, res) {
        // res.sendFile(__dirname + "/index.html");
        res.render("index");
    });
    
    
    loginRouter(app);
    
    registerRouter(app, fs);
    
    careersRouter(app);

    createReviewRouter(app);

    adminRouter(app);

    membersRouter(app);

    applicantsRouter(app);

    reviewsRouter(app);
};


module.exports = appRouter;