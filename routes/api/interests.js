const express = require("express");
const router = express.Router();
const passport = require("passport");
const Interest = require("../../models/Interest");

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      id: req.user.id
    });
  }
);

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    // user id: req.user.id

    const newInterest = new Interest({
      title: req.body.Title,
      type: req.body.Type,
      poster: req.body.Poster
    });

    newInterest.save()
      .then(interest => res.json(interest))
      .catch(err => console.log(err));
  }
);

module.exports = router;