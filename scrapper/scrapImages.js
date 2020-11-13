process.stdout.write("\033c");
const fs = require("fs");
const mongoose = require("mongoose");
const { MoviesDoc, SeriesDoc } = require("./Schema/Anime");
const cheerio = require("cheerio");
const request = require("request-promise").defaults({
  baseUrl: "https://animekayo.com",
});

const AnimeDoc = process.argv.splice(2)[0] !== "movies" ? SeriesDoc : MoviesDoc;

mongoose
  .connect(
    "mongodb+srv://Adarsh:$123Adarsh@cluster0-mribm.gcp.mongodb.net/test?retryWrites=true&w=majority",
    {
      dbName: "animes",
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then((_) => {
    console.log("Connection to MongoDB eshtablished!");
    return AnimeDoc.find({});
  })
  .then(async (animes) => {
    animes.forEach(async (anime) => {
      const html = await request(anime.url);
      const $ = cheerio.load(html);
      const img = $(".post-header").attr("style").split("(")[1].split(")")[0];
      anime.img = img;
      anime.save();
    });
  })
  .catch((err) => console.log(err));
