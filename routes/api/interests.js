const express = require("express");
const router = express.Router();
const passport = require("passport");
const Interest = require("../../models/Interest");

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  Interest.find({ user: req.user.id })
    .then(interests => res.json(interests))
    .catch(err => console.log(err));
});

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    // user id: req.user.id
    Interest.findOne({ user: req.user.id, movieId: req.body.id })
      .then(interest => {
        if (interest) {
          return res.status(400).json({ title: "You have already added this movie"}); 
        } else {
          const newInterest = new Interest({
            user: req.user.id,
            movieId: req.body.id,
            title: req.body.title,
            year: req.body.release_date,
            genres: req.body.genres,
            type: "movie",
            poster: req.body.poster_path,
            overview: req.body.overview,
            runtime: req.body.runtime,
            voteAverage: req.body.vote_average,
            voteCount: req.body.vote_count
          });

          newInterest.save()
            .then(interest => res.json(interest))
            .catch(err => console.log(err));
        }
      });
  }
);

router.delete(`/`, passport.authenticate('jwt', {session: false}), (req, res) => {
  Interest.findOne({ _id: req.body._id })
    .then(res => {
      return res.status(200);
    });
  }
);

module.exports = router;