const express = require("express");
const router = express.Router();
const passport = require("passport");
const Interest = require("../../models/Genre");

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  Interest.find({ user: req.user.id })
    .then(genres => res.json(genres))
    .catch(err => console.log(err));
});

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  Genre.findOne({ genre: req.body.name })
    .then(interest => {
      if (interest) {
        return res.status(400).json({ title: "You have already added this genre" });
      } else {
        const newGenre = new Genre({
          user: req.body.name,
          count: 1,
        });

        newGenre.save()
          .then(genre => res.json(genre))
          .catch(err => console.log(err));
      }
    });
  }
);

router.patch("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  Genre.findOne({ genre: req.body.name })
    .then(genre => {
      if (!genre) {
        return res.status(400).json({ title: "No genre found" });
      } else {
        let newCount = genre.count + 1;

        genre.update({count: newCount});
      }
    });
  }
);