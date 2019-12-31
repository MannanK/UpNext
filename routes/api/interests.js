const express = require("express");
const router = express.Router();

const Interest = require("../../models/Interest");

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      id: req.user.id
    });
  }
);

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      id: req.user.id
    });
  }
);

module.exports = router;