const express = require("express");
const router = express.Router();
const passport = require('passport');
const Recommendation = require('../../models/Recommendation');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Recommendation.find({ user: req.user.id })
    .then(recommendations => res.json(recommendations))
    .catch(err => console.log(err));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id
  });
});

module.exports = router;