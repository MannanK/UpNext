const express = require("express");
const router = express.Router();
const passport = require('passport');
const Recommendation = require('../../models/Recommendation');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Recommendation.find({ user: req.user.id })
    .then(recommendations => res.json(recommendations))
    .catch(err => console.log(err));
});

router.post('/similar', passport.authenticate('jwt', { session: false }), (req, res) => {
  // if this recommendation has already been made for this similar movie, just return it back
  Recommendation.findOne({ similarMovieId: req.body.data.similarMovieId, movieId: req.body.data.movieId })
    .then(similarRecommendation => {
      if (similarRecommendation) {
        // return res.status(400).json({ title: "You have already added this movie" });
        return res.json(similarRecommendation);
      // otherwise, make the recommendation for this similar movie, and then return it back
      } else {
        const newSimilarRecommendation = new Recommendation({
          similarMovieId: req.body.data.similarMovieId,
          user: req.user.id,
          movieId: req.body.data.id,
          title: req.body.data.title,
          year: req.body.data.release_date,
          genres: req.body.data.genres,
          type: "movie",
          poster: req.body.data.poster_path,
          overview: req.body.data.overview,
          runtime: req.body.data.runtime,
          voteAverage: req.body.data.vote_average,
          voteCount: req.body.data.vote_count
        });

        newSimilarRecommendation.save()
          .then(similarRecommendation => res.json(similarRecommendation))
          .catch(err => console.log(err));
      }
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id
  });
});

module.exports = router;