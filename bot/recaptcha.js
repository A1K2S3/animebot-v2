const puppeteer = require("puppeteer"),
  { waitForAnySelector } = require("./utils");

const getCookies = () => {
  return [
    {
      domain: ".clk.ink",
      expirationDate: 1589877116.064671,
      hostOnly: false,
      httpOnly: true,
      name: "__cf_bm",
      path: "/",
      sameSite: "no_restriction",
      secure: true,
      session: false,
      storeId: "0",
      value:
        "dffceeee08f51b0f4313a660732bf91b49348c80-1589875316-1800-AdQgxrq/YrenZ5saq/t7cHUwIBzk7QzupT7DBbooYEvgkjD4maWB+6Dq00yMBvCfzIRsAUAGC2asj5KXX3DO93cQVORSNDYbhoO4jDLpmAgS",
      id: 1,
    },
    {
      domain: ".clk.ink",
      expirationDate: 1592467311.681193,
      hostOnly: false,
      httpOnly: true,
      name: "__cfduid",
      path: "/",
      sameSite: "lax",
      secure: true,
      session: false,
      storeId: "0",
      value: "d62989d25e44f44cf196d29e01cfdf15b1589875311",
      id: 2,
    },
    {
      domain: ".clk.ink",
      expirationDate: 1597392120,
      hostOnly: false,
      httpOnly: false,
      name: "__dtsu",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "51A015898741748989FBD4576193E3C8",
      id: 3,
    },
    {
      domain: ".clk.ink",
      expirationDate: 1652947316,
      hostOnly: false,
      httpOnly: false,
      name: "_ga",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "GA1.2.1422613730.1589875317",
      id: 4,
    },
    {
      domain: ".clk.ink",
      expirationDate: 1589875376,
      hostOnly: false,
      httpOnly: false,
      name: "_gat_gtag_UA_110155808_1",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1",
      id: 5,
    },
    {
      domain: ".clk.ink",
      expirationDate: 1589961716,
      hostOnly: false,
      httpOnly: false,
      name: "_gid",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "GA1.2.1435345975.1589875317",
      id: 6,
    },
    {
      domain: "clk.ink",
      hostOnly: true,
      httpOnly: false,
      name: "ab",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: true,
      storeId: "0",
      value: "2",
      id: 7,
    },
    {
      domain: "clk.ink",
      hostOnly: true,
      httpOnly: true,
      name: "AppSession",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: true,
      storeId: "0",
      value: "7a947188268052b6e73ee53126b60b9d",
      id: 8,
    },
    {
      domain: "clk.ink",
      hostOnly: true,
      httpOnly: true,
      name: "csrfToken",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: true,
      storeId: "0",
      value:
        "78ac51563a2c6f6d3f6ce858a114eaf8755654f831af57a4e6b4e3b7b1fa2be6af39f3a51fd2992359cfb55b892e7d0bb78a8a776c78fb41d56391d05801ecc3",
      id: 9,
    },
    {
      domain: "clk.ink",
      expirationDate: 1590480117,
      hostOnly: true,
      httpOnly: false,
      name: "dom3ic8zudi28v8lr6fgphwffqoz0j6c",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1680a9db-f783-4659-b07c-ceedf1f8fe2e%3A1%3A2",
      id: 10,
    },
    {
      domain: "clk.ink",
      expirationDate: 1621411316,
      hostOnly: true,
      httpOnly: false,
      name: "HstCfa3963887",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1589875316480",
      id: 11,
    },
    {
      domain: "clk.ink",
      expirationDate: 1621411316,
      hostOnly: true,
      httpOnly: false,
      name: "HstCla3963887",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1589875316480",
      id: 12,
    },
    {
      domain: "clk.ink",
      expirationDate: 1621411316,
      hostOnly: true,
      httpOnly: false,
      name: "HstCmu3963887",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1589875316480",
      id: 13,
    },
    {
      domain: "clk.ink",
      expirationDate: 1621411316,
      hostOnly: true,
      httpOnly: false,
      name: "HstCns3963887",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1",
      id: 14,
    },
    {
      domain: "clk.ink",
      expirationDate: 1621411316,
      hostOnly: true,
      httpOnly: false,
      name: "HstCnv3963887",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1",
      id: 15,
    },
    {
      domain: "clk.ink",
      expirationDate: 1621411316,
      hostOnly: true,
      httpOnly: false,
      name: "HstPn3963887",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1",
      id: 16,
    },
    {
      domain: "clk.ink",
      expirationDate: 1621411316,
      hostOnly: true,
      httpOnly: false,
      name: "HstPt3963887",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1",
      id: 17,
    },
    {
      domain: "clk.ink",
      expirationDate: 1589875327,
      hostOnly: true,
      httpOnly: false,
      name: "m5a4xojbcp2nx3gptmm633qal3gzmadn",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "hadsoks.com",
      id: 18,
    },
    {
      domain: "clk.ink",
      expirationDate: 1589875339,
      hostOnly: true,
      httpOnly: false,
      name: "ppu_idelay_88cecd8375b0917a15dbebb389d2385f",
      path: "/",
      sameSite: "unspecified",
      secure: false,
      session: false,
      storeId: "0",
      value: "1",
      id: 19,
    },
  ];
};

class Animebot {
  constructor() {
    this.browser = "";
    this.baseURL = "https://animekayo.com";
  }

  async init() {
    this.browser = await puppeteer.launch({ headless: false });
    console.log("Anime Bot is ready!");
  }

  async login() {
    const page = await this.browser.newPage();
    try {
      await Promise.race([
        page.goto(
          "https://animekayo.com/anime-series/psycho-pass-2-480p-bd-dual-audio-hevc/"
        ),
        page.waitFor("#wpforms-37482-field_0"),
      ]);
      await page.type("#wpforms-37482-field_0", "AJ");
      await page.waitFor("#wpforms-37482-field_1");
      await page.type("#wpforms-37482-field_1", "Adarsh123$");
      const pass = await page.$("#wpforms-37482-field_1");
      await pass.press("Enter");
      await page.waitFor("#wpforms-confirmation-37482");
      await page.close();
      console.log("Bot has successfull logged in!");
    } catch (err) {
      await page.close();
      return Promise.reject(err);
    }
  }

  async getDriveLink(link) {
    const page = await this.browser.newPage();
    try {
      await page.setCookie(...getCookies());
      page.goto("https://clk.ink/LgLONBPi");

      await page.waitFor("#invisibleCaptchaShortlink");
      await page.waitFor(5000);
      await page.$eval("#invisibleCaptchaShortlink", (form) => form.click());
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

(async () => {
  const bot = new Animebot();
  await bot.init();
  await bot.login();
  await bot.getDriveLink();
})();

module.exports = new Animebot();
