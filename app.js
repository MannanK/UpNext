const express = require("express");
const users = require("./routes/api/users");
const interests = require("./routes/api/interests");
const recommendations = require("./routes/api/recommendations");
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/interests", interests);
app.use("/api/recommendations", recommendations);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));