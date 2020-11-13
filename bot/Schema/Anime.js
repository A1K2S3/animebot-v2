const mongoose = require("mongoose");

const AnimeSchema = mongoose.Schema({
  name: String,
  img: String,
  driveLink: String,
  url: String,
  tags: [String],
  shortenedUrl: String,
});

module.exports = {
  MoviesDoc: mongoose.model("movies", AnimeSchema),
  SeriesDoc: mongoose.model("series", AnimeSchema),
};
