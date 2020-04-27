const fs = require("fs");
const reviews = require("../data/reviews");

const createReviewRouter = function(app) {

    app.route("/createReview")

        .get(function(req,res) {
            res.render("createReview");
        })

        .post(function(req,res) {
            const date = new Date();

            // Review ID
            let reviewId = 1;
            let maxId = 0;

            // ID Increment
            reviews.forEach(function (review) {
                if (review.id > maxId) {
                    maxId = review.id
                }
            });

            if (reviews.length === 0) {
                reviewId = 1;
            } else {
                reviewId = maxId + 1;
            }

            const review = {
                id: reviewId,
                fullname: req.body.name,
                comment: req.body.comment,
                dateWritten: date.getDate()
            };

            reviews.push(review);

            fs.writeFile('./data/reviews.json', JSON.stringify(reviews), 'utf8', function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log("sucess");
                    res.render("index");
                }
            });

        })
};

module.exports = createReviewRouter;