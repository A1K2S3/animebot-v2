process.stdout.write("\033c");
const fs = require("fs");
const colors = require("colors");
const mongoose = require("mongoose");
const { MoviesDoc, SeriesDoc } = require("./Schema/Anime");
const AnimeBot = require("./AnimeBot");

const AnimeDoc = process.argv.splice(2)[0] !== "movies" ? SeriesDoc : MoviesDoc;
console.log(AnimeDoc);

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

const animeListBuffer = fs.readFileSync("./errorAnime.json");
const animeListJSON = animeListBuffer.toString();
const animeList = JSON.parse(animeListJSON);

const errorAnime = [];
let success = 0;

(async function () {
  // Launch Puppetter and login to Animekayo.
  await AnimeBot.init();
  await AnimeBot.login();

  // Start the bot to get the drive links.
  console.log("\n");
  for (let anime of animeList) {
    try {
      const doesExists = await AnimeDoc.findOne({ name: anime.name });
      if (doesExists) {
        success += 1;
        console.log(`${success} ${anime.name}`.green);
        continue;
      }

      // Get drive link and store it in MongoDB.
      const { driveLink, img } = await AnimeBot.getDriveLink(
        "https://animekayo.com" + anime.url
      );
      anime.driveLink = driveLink;
      anime.img = img;

      await AnimeDoc.create(anime);
      success += 1;
      console.log(`${success} ${anime.name}`.green);
    } catch (e) {
      success += 1;
      // If error occurs push anime detials to error array for manual review.
      console.error("\n", e);
      errorAnime.push(anime);
      console.log(`${success} ${anime.name}`.bgRed.white + "\n");
    }
  }
  console.log("\n");

  // write the errorAnime to links.json for manual inspection.
  fs.writeFileSync("./errorAnimeSeries.json", JSON.stringify(errorAnime), {
    encoding: "utf-8",
  });

  const errorlength = errorAnime.length;
  console.log(
    animeList.length - errorlength + " success".green,
    errorlength + " errors".red
  );
})();
