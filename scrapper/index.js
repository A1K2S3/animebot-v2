process.stdout.write("\033c");
const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request-promise").defaults({
  baseUrl: "https://animekayo.com",
});

const animes = [];

(async function () {
  const html = await request("/download-anime-series/");

  const $ = cheerio.load(html);

  const trs = $("tbody tr");

  $(trs).each((idx, ele) => {
    const tds = $(ele).find("td");
    const name = $(tds[0]).text();
    const tags = $(tds[1]).text().split(", ");
    let url = $(tds[0]).find("a").attr("href");
    url = url.split("https://animekayo.com")[1];
    animes.push({ name, tags, url });
  });

  fs.writeFileSync("./series.json", JSON.stringify(animes), {
    encoding: "utf-8",
  });
  console.log("Done");
})();
