const express = require("express");
const router = express.Router();
const passport = require("passport");
const Genre = require("../../models/Genre");

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  Genre.find({ user: req.user.id })
    .then(genres => res.json(genres))
    .catch(err => console.log(err));
});






const TIER_THRESHOLD = {
  SUPERLIKE: 0.5,
  LIKE: 0.25
};

// Evaluates the preference tier of a genre depending on weighted threshold values
const tierEvaluator = (currUserId, newGenre) => {
  // Interest.countDocuments({ user: currUserId }).then(count => {
    const tierRatio = newGenre.count / 3;
    
    if (tierRatio >= TIER_THRESHOLD.SUPERLIKE) {
      newGenre.tier = 'superLike';
    } else if (tierRatio >= TIER_THRESHOLD.LIKE) {
      newGenre.tier = 'like';
    } else {
      newGenre.tier = 'low';
    }
  // });
};


router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  Genre.findOne({ user: req.user.id, name: req.body.name })
    .then(genre => {
      if (genre) {
        return res.status(400).json({ title: "You have already added this genre" });
      } else {
        const newGenre = new Genre({
          user: req.user.id,
          name: req.body.name,
          id: req.body.id,
          count: 1
        });

        tierEvaluator(req.user.id, newGenre);

        Promise.all([tierEvaluator(req.user.id, newGenre)]).then(() => {
          newGenre.save()
            .then(genre => res.json(genre))
            .catch(err => console.log(err));
        });
      }
    });
  }
);

router.patch("/:genreId", passport.authenticate('jwt', { session: false }), (req, res) => {
  // Genre.findOne({ genre: req.body.name })
  Genre.findOne({ user: req.user.id, _id: req.params.genreId })
    .then(genre => {
      if (!genre) {
        return res.status(400).json({ title: "No genre found" });
      } else {
        genre.count += req.body.value;

        genre.save()
          .then(genre => res.json(genre))
          .catch(err => console.log(err));
      }
    });
  }
);

module.exports = router;