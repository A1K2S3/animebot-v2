const mongoose = require("mongoose");
const Axios = require("axios");
require("colors");
const { MoviesDoc, SeriesDoc } = require("./Schema/Anime");
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
  .then((_) => console.log("Connection to MongoDB eshtablished!"))
  .catch((err) => console.log(err));

SeriesDoc.find()
  .then(async (series) => {
    let idx = 1;
    for (const anime of series) {
      const res = await Axios.get(
        `https://shrinkme.io/api?api=7e9f3f680d94e00e2e8e9c88ed5cdd6c529b3759&url=${anime.driveLink}`
      );
      anime.shortenedUrl = res.data.shortenedUrl;
      await anime.save();
      console.log(`${idx} ${res.data.shortenedUrl} ${anime.name}`.green);
      idx += 1;
    }
  })
  .catch((err) => console.log(err));
