const reviews = require("../../data/reviews");
const fs = require("fs");

const reviewsRouter = function (app) {
    app.route("/reviews")

        .get(function (req, res) {
            res.render("reviews", {
                reviews: reviews
            });
        })

        .post(function (req, res) {
            const id = parseInt(req.body.reviewId);

            reviews.forEach(function (review, index) {
                if (review.id === id) {
                    reviews.splice(index, 1);
                    console.log("dumaan sa loop");
                }
            });

            fs.writeFile('./data/reviews.json', JSON.stringify(reviews), 'utf8', function (err) {
                if (err) {
                    throw err;
                }

                console.log("nagwrite");
            });

            res.redirect("/reviews");
        });

}

module.exports = reviewsRouter;