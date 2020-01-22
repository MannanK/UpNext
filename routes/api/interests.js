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
          
          Promise.all([newInterest]).then((values) => {
            const returnedInterest = values[0];
            const newGen = returnedInterest.genres.map(genre => {
              return genre.name;
            });
            returnedInterest.genres = newGen;
    
            returnedInterest.save()
              .then(interest => res.json(interest))
              .catch(err => console.log(err));
          });
        }     
    });
  }
);

router.delete(`/:interestId`, passport.authenticate('jwt', {session: false}), (req, res) => {
  let currInterestId;
  let currInterest;

  Interest.findOne({ _id: req.params.interestId }).then(interest => {
    currInterestId = interest.movieId;
  });

  Interest.findOneAndDelete({ _id: req.params.interestId })
    .then(() => {
      console.log(currInterest);
      console.log(currInterestId);
      return res.json({ id: currInterestId });
    })
    .catch(err => console.log(err));
  }
);

module.exports = router;