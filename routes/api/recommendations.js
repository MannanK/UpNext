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
  Recommendation.find({ similarMovieId: req.body.data[0].similarMovieId })
    .then(similarRecommendations => {
      if (similarRecommendations.length !== 0) {
        // return res.status(400).json({ title: "You have already added this movie" });
        return res.json(similarRecommendations);
      // otherwise, make the recommendation for this similar movie, and then return it back
      } else {
        console.log("------ inside the else------------");
        console.log(req.body.data);

        const newSimilarRecommendations = req.body.data.map(recommendation => {
          return new Recommendation({
            similarMovieId: recommendation.similarMovieId,
            user: req.user.id,
            movieId: recommendation.id,
            title: recommendation.title,
            year: recommendation.release_date,
            genres: recommendation.genres,
            type: "movie",
            poster: recommendation.poster_path,
            overview: recommendation.overview,
            runtime: recommendation.runtime,
            voteAverage: recommendation.vote_average,
            voteCount: recommendation.vote_count
          });
        });

        let count = 0;
        newSimilarRecommendations.forEach(recommendation => {
          recommendation.save()
            .then(()=> {
              count += 1;
              if (count === req.body.data.length) res.json(newSimilarRecommendations)
            })
            .catch(err => console.log(err));
        });
          
      }
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id
  });
});

module.exports = router;