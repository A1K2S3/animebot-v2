process.stdout.write("\033c");
const mongoose = require("mongoose");
const { MoviesDoc, SeriesDoc } = require("./Schema/Anime");
const colors = require("colors");
const AnimeBot = require("./AnimeBot");

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

(async function () {
  // Launch Puppetter and login to Animekayo.
  await AnimeBot.init(10000, true);
  await AnimeBot.login();

  const animes = await SeriesDoc.find({
    driveLink: { $regex: /https:\/\/mega.nz/ },
  });
  let idx = 0;
  for (const anime of animes) {
    try {
      const driveLink = await AnimeBot.getDriveLink(
        "https://animekayo.com/" + anime.url
      );
      const isupdated = await SeriesDoc.findByIdAndUpdate(anime._id, {
        driveLink,
      });
      console.log(`${idx}. ${anime.name}`.green);
      idx += 1;
    } catch (e) {
      console.error("\n", e);
      console.log(`${idx} ${anime.name}`.bgRed.white + "\n");
      idx += 1;
    }
  }
})();
