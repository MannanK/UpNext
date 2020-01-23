const express = require("express");
const router = express.Router();
const passport = require("passport");
const Genre = require("../../models/Genre");

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  Genre.find({ user: req.user.id })
    .then(genres => res.json(genres))
    .catch(err => console.log(err));
});


// This function is to update favorite genre preferences, ie superLikes and likes
const countInterests = () => {
  console.log(Interest.count({user: req.user.id}));
}



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
          count: 1,
        });
      
        newGenre.save()
          .then(genre => {
            countInterests();
            return res.json(genre);
          })
          .catch(err => console.log(err));
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