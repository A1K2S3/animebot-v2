const puppeteer = require("puppeteer"),
  { waitForAnySelector } = require("./utils");

class Animebot {
  constructor() {
    this.browser = "";
    this.baseURL = "https://animekayo.com";
  }

  async init(navigationTimeout, headless) {
    this.browser = await puppeteer.launch({ headless: !!headless });
    this.navigationTimeout = navigationTimeout || 30000;
    this.headless = headless;
    console.log("Browser opened");
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
      page.setDefaultTimeout(this.navigationTimeout);
      const selector = await Promise.race([
        page.goto(link),
        waitForAnySelector(page, [".downloadbutton"]),
      ]);
      await page.waitFor(selector);

      if (selector === ".downloadbutton") {
        page.$eval(".downloadbutton", (btn) => btn.click());
      } else {
        link = await page.$eval(selector, (btn) => btn.getAttribute("href"));
        await page.goto(link);
      }

      await page.waitFor("#form-captcha");
      await page.$eval("#form-captcha", (form) => form.submit());
      await page.waitFor("form");
      await page.$eval("form", (form) => form.submit());
      const driveLink = await page.evaluate(() => window.location.href);
      await page.close();
      return driveLink;
    } catch (err) {
      await page.close();
      return Promise.reject(err);
    }
  }
}

module.exports = new Animebot();

// https://clk.ink/9teIfur
/**
 * )]}'
["rresp","03AGdBq25Sh_p4-7A5yeAmmDODzjfI9H9xPh7EU4yr4C_vxKJsXUaXhgslOkjJa8gFhnvINGEwAxqdgngSEAYhXOv7reDuHns3tKahrRzbyJW3qDpeNP8v8BEJRWz-1xsyvYWuPbRpwr8edJSObKY3cQa9EzwuzJijRYnB2cfkg2buGU5ZqJArCvcJMpITg8vcTqwWBo61Ohu6bD464L_fgdutzoCl7rpcVW33WXKq0cycjloj5oehsZU5kL7t77NngoiLOARXXdpAW4b1vP8bqu-2PI7pvbYGiLNKTYO4C1MOZB6QXkL8fWNWhx0udZh8UbWkuHOqT47u6fyOxpNaheYzIyUXd2AamluqaCFULBW7dIxTUBq1Y4LS3BIF9SQADGGuFuZgBmaj-gdXb2GDrQybRse5Uph4mxyA_VwNAOhyzKGlxtj2xf03WaUymzbhzbQbUwUoPhgx40FdMmXGOMDbUFCe-kSBq6lw3VKNc4XL2jl4fqGt8YlpbBNlbysTS4gZMn5mTV4yNLgnCxw63IY9vnfBOxKVDqXIApa5iP-tzcKscwUFbHtdhkVKppEtbA_CWPCfUQmSP4B3bs0UwiVBp79duvIrSFk8Ze_hFuV1Z-8JmE1vsGWwdw-5JsdKlKxhs0gFLLtmWBT_z-HbIIJdQJoE2YkaxycOjhS46515QPLN6acZQQbd1orPcV69ea7CbM7Q4s8gZvAcjv0nEm5okW1dvxWkVLE280omCwBayBCGw9qg-Q3HTXqxGWz4obPjRBYw8NiHdCU8BBIOEk_2n_BToGJzc7uIS8ROY5KrPJHtJsZbscJq683zR080ky0R4gYn0EDg-_kn3vUCeutZp44v9YEBv308pxVFtcTqjMFc2JDojh9QFeQ6BIV2WrYj1fsYwZsmwkodzQetZzDpq468Y6jbPhIplnYC2EfT_zvhp2yKgnbIDsI3O9coZufC_1oEpeM03wU1SPMZ2AOi5m3eEXQHj5CsW97foiTYHM2Lyw0Xo7BHsjTbx_8NaT4hAwCryGAZcLUxBWEz1tUDhcO5AqJLBhh9USITUycEca7N3hvVCVLQLyRBxQGknnwXgMRoMj1n9ORYT4ekFaaPhMyUZv1ozuovJyCM-JP34E3M_7EJXf2rwoi5f25oZvA7lTpNU8yka0GMhLWISvmknrxbX_BVftwY3InTXm2lDtQ6IaBX68HxciHYa3wDFmI8YYJu6gR5v1wwVxCVNey5ZjRLm4wCWPCzYSymBcgaFpttvp_k1Qjw6SgzTK6TIQjwngehQYt32mTQMRr52mMKRMVeFh2YuhQCU_QONmbMBTYMQQ8k3qSc7zQvxLnSQiqpw7pK1D4Kiw376EDGnBbQdlrQzmLMjsuGOIzW45nfwPeYn6I3ueN1RunP65vjESYm7HYbzfFSsBNtaGhsBHHkZekr6bqtYuHdPHo-kjfqOwF_V1ItEYO4LkkuRz6JqQaK5UKSEWWLS-J2tOWJD_-KEkQCzpTi92JOJOlcZK7YRjYsTZbNcnE4KBpTWivMnrbPYzhbU33qn8EK2dp0oyKXOTvGBMYgws7_TVrBmZKIdfGvzOsdoQiVFSIDIA5rT1NmZ4Y4Kj8LuKlKjFjKnbielqMIOJuVVvpCLFuyLV9CHZIwi5YMQ7ri_lb808YBtzF_5gr_4CNfkfG2I_X48e-y3-Pcg1kbj7DKgPgEhfd7hMevzsCDCyww1CglzQElNJ7_Ck6Y8T8xdMA1wNhTu52d7-L_CckM-HA9Rp-3ClyZj_Q2fGDrInWhUBOwNHtfYgtDwRv-yCJ-t9KCL1N-9S2UeAAue8XMfVt_kU7PA_HHtLoYUneDuXE4Qwy__5IRKg46AIBiXAIyU4HEueFrfoh9kswQepgOQh-gBPL113X0bk92d3tCPEwobEDk06Ci0eWqtq8Yvag3YDUg96XZI4KwQkcH3qCKC8yNA6xm0cnVNHH3mX6VvGizGhVInzq6wvtWh1LaMcA7oxGvh2v-LOMiSrECNkZzdtmaI5p3tbk5Gk5RRiMlp7LukGGZG1QMJTUNchq4FMKWWWwipXLphvO8tacVNrWJ-8s7AaTzZDsec_ZSboYtndrFxb1Hfo_onOOoHi4x12Vhq1xoNffNl5fla59Wvac7-zdlES7kkuJYC9hBoxrXSGpMIn5sz71M0kvt-uIub9MM5m53Ap1VU_jLU7tR-5xF5Wgr2zXDwSh3RZb_3lgS6G6WICKIHajqAKdltBOg2BW_7GVzVIy9DblEBhjH6r4RlYadFPH3ugSsakeCVfMmyEA",null,120,null,"nocaptcha",null,["bgdata","Ly93d3cuZ29vZ2xlLmNvbS9qcy9iZy9KVGNiZVFVZW56VjBNRW5xeDlQdy02dzlHSGFrYVhqcUVwUm9pSVFjbzVJLmpz","","Zkx3aERwWk1YdzA0VVhqWUVRczNuMEpuOXdGZmhIWHZveW5tMkk4K0NQNnNBTjliblJ2WXpqMzVGUWx6eitPZkt4L2xaZ3dVNGhzK3RtcjFwd2I1UkUxcjg5RGQ4VGhHMjNLclF2OHpDcjVINFcvZTkrWkdmS2ErY2lIZjFOdjg1M3FLTW1jcUNTd1k2OVBIWS9vdFBVRThWS3NXSStwdU1HSHd3VFk2WFhLUjkrOE5mOTdqdmZmUDI4TjlBaXVGbksrOXAyRy8rYmtXdlRoZUlhR2o2Znppd1NCQVM1dTRKVnNzVXA2amNGZHNsOUMrbkY1YmVySDRvaWRDdUFMNTlyeUNjWm5wSy9UMk5WcFFOcTZnRmExTGsrNmJsL3FXalhLSER4VjlNMTNNMHFqSXIxOW9VNVkwams0SDFVdldUSytkd1ZwZXo1SWlJV1ZPQkRWV0haSGdIMU5jUVc5QlROTG43UTIrQ3hYUm1UTW83TkhaQ3A4cWlRUUtmU3hSVHBJMW05TWdWRFBERms5dGNzT0N3R2pQaGtxeTRaTENVSXhCdlRvdnVzRk1lbHQydFU4MXVtWkNmR0hDUjJJcU0xVlgzL3l1UHNCOHZYaitJL1lwUzIwWjdmUVFOSmpFc0k5alZwWXc5NGdzWUVBSzFJL0ZOczlUWTRrZmZkOUVBTTVJeUJOOXR2dEx2bjZvUVBlbmhnTU1ndFRNajE2c0tyR1JCQnBibXhOV25zOEgzaXJWVEZkSnZQNXBXZmRTK2tCdkhJV0dBY1VwVGhUdU54WEpSMlBXME5NNzFtL3IrcHI4ZGVnQjJ4eW9UOU9hTC9hdi9RWlFCeFRVTXo4UjdpVFJiSFNDN2ZOVmhBbWtLZ3hiVUx0NUkrVlExUVZQdFo3SWlHV2ZKZm44WmtmSSt5TnVvczRsRGhPWUxFeVg4MGFGcmM0R2pwS0lFcTlpazd4RUpYWHlFRU1rVWtHdWtRZ0dhUzJFcEJweW1nb21CVkhQTVQ4Y1lmTlZjOFJXczkzdzdacUZPcndzdmtFR1lMVnp5WE11aXM2TC9nZGVROU9jYmI3Y2phbmY2Wlpib3c0YmlxUkxmaHVhYmJNOURiLzJoVGRNUXBhMzJIOXQwRlpqQXBWNmJxQUVmK3Y5dEhPUTJkNisra0dSS3Izdi9zLzFyOUVweFNiTDZ0VG04U3kwUEkrNzY4RmlXdU5jT3pOaENkZzhXZ2dWT0d2UkVRUGtKazdPYW9uMmZLcXVUZTkrQ1N4ak5lSkpOeERWYzEzNnB2OGhEYkZlNTZ0SlRReHRic2VYOHg4QUlHZ2piYzFBREhDb0t5RTVvaTgrUkNnK0dtTU1WcDUrSzBtRXFoN0Irck1mTk8xeHFhemMzS3JlQTVBSWNJWUYxRk5JTDJhWmR5QktCTnd2QnlzZUpXeGpTSjV1c3U0SzUzTEk3NldGOXM3Z2dUb1hhcEV4Tzl4TlBYOVB2a1h1dm1qcysvWTBac0phSGZ5VDVpNVJSR21aYzJHWjIrQWwyaHZrblc1NTBrL3V5YUZJdmlZZ0JBTldSL3pmd1RBcW00cmYwdGtZMmxjdGJZWmdFcHZTWE9YaGdUbElwMmVPTnZ1RHJqSUhjYUVpYVo0VFhpZUVVdzFhNmxsMksxc1JkbENuZDcvaG16eVIwYmVyY1BrVkxnMkgraEFIaEFnM3lWeUVNaWZ3WnB1U0ZMYzJZMGVpYzIzNG45dlNOQUsybzhZTU5wU3pDd1pJMEp1KzB5VENLYm1jVGNFVlF1eWp1KytCTThVNUQyakZzZUw5TFgydzJ5ODNlVGQ1Z3k3NUVnT2dvVXN0K1o2L2JLRzRqL002SEpYTG94ZmRxNW9EV21BWVJQRHlMM1pvK012UDcrS0dJVmZEZnIrd200SkdUa1orM2FBUWlCQ1UzRFdEY2JwTTc4VWlvK0J5KzNJNmJJcG1aaTFHSm1GRkRXQ1dUMG5tZ0NMcmlGUXRJa05FQmNrYjEyeGpwV2tCNWJwTE5UaEZueFpRckI5MEowSUh2MWErZm5GU1ZKUFNjQmQ0dm9FdWtkTDI5ZTk1OFlyeExMd3JaTzM3aHZMVitIZ3Boa2VlWFBQQ2tNWENadlFXN2QrVDFpS0Zsc09EYW5XbWE0S3grSU9rcXluVWtHVjdGWXZKa2JYK3psc09JSGdMZTFudVZ5cTE2Q2IvQzFSTHZ6WHcyZHlYd1M2ZjZHcGhzQ1UyYTlYemp3aHREem9DdlphTnlGYlcyTnlyNVFBd3pMSDJ5cUhqSHE3QkVDaGMxSzRtc0hMRjNQeUsvTlRBdElWQW9mQTY5U0E4Z2ZSLzhhbFVOVk1nUGZ0ek5Hall2NXNKZWRFekh5TWtOTFo4T0h1SkRDaWF6azh2STZmanc1QUFaTC9mVURCM0JUWHUwOEtadzZaZTlMY0EzTWMvTHJwTmJ2clE3L2JBVnlRWm4zYlA5MmJCWFR4OWEzVDhzalYrVnBSeHVXK0xBcjJRME9BVVF0NENXeXBwOVJrNkJBaUZlZit6NnZDQ0hsV2Q4ci8rTUNQOWNMcElTSXZpN2dESENwUmJJM0NjRzlTTzVKRFlyTmRKbGtpYmN1R3hJWnB0T2g1bk15SWlHYWZjcVE3TGIwUVNqMEYwekcvOCt4Rk1zTEs0N2s5c0MrbmFLbWRpYkFyNTA0a2JKL3F3Y0hlbWlGV2ZWakhoYVN5QndGbFp0U3I3RjQzUmIyaTNScC8wN2gxNUc3NUI4WXhJNGtLdkNvWldTTThOZnZsMERDRUQ0UlZIRC9iQ2tOenl0Vi9jY1hVbi9XL251c25TYThsVUw4bWo5U21oN2ZsaXBwZDZvMlVuVHF3ZDZXQzcrcGN6cHNtM21jbytyWkhuaHYzMHE2S1dZWVVCbTJ0VmYxdWpVYUxXTGtBNnFTTkdrbjRJUHpnSHJ3dUFIZGJ1V09FQ3VGQWdCWEJIdmh6K1U0eXhyQ2V0d1NXQ3M1MFcyMmcyZTEyQ3l4d1QwMTZ6cTJqei9MVEJnOTRiTllCRmh2SStVVzFTT010eGw3Vkx3RzMvSXhSZUg3SEFYNmZucitGR3hVemg2QmFKVEEvVHkwNEdkdno3Wm9IU2FlOEd5cjRpRFJEbWt4VGxGbEpOVEVKYTVWRG9pSSsxSVV1UWxwbjBiUlBHMEZ2d0lCb2dmdWNBWGsyTE5NMXBQd0Y1VDFHOXU5QWE1anRpdzlxWlp5bDUzK1cvUGdodWNMakpjSENUb09zcVQwTW8vZnp1TDQyQjdkWmYvbEdxTnMrbEFYQ3J0T0ttUXJka25iR2hrTlRTL2ovU1ZSNjR5dW0xYkhnQkdNOUIrVWplZFBmY0IvUDU3U0JpRnBsNFBacXRWU1VTa3kxMWJxZlJYeUsxRlJEUUEzVENpelZUSkwzck1ZcmRKNUV3YTlCUGpPVzJKOFpHbk9ndXBlVk1KSXVvTmcvRmo1bHZ0Yis3cGU1eHpHUkJnK3BzZ09NQitXZU1WVktzbFl4U3NRQTBHbjA4dXpaK3NYYTdtY1J6dmx2MVlITHhvNHBoTVVMSzYvYWE2QndRNlBsMTM5cml4KzViblJUeTZkZysrMnBuZUg3d25iT0k0elVMTmpna2Zyb1dQVnh4WG5hbHlueEJNZ1VCdS9WMDJpbGpIWXNTaWc2WWs4TXpVa05WNmpUZEI0N01YV0Z6aklKM0t3bktDZXVLUnA0bXFLRkM1UFRaM0dmWjlEOXVpMmxCVHFORFVlYUpEZ0xxa2FyN29QTWZ5U3RsYnBGdTd0M1dzVXdCQkM3SThJQStrRFNxVDlrK2FkbTZHYkN5eXgrT0xmNC93clZqZFUzNmZ5aGIrV3hNZmlBUmZzTmpPeU5tU0hqdmtPOFpTeHBvMmNKL0RUQ1Zzdzd2UW5VY2l5UHhBdFdnS1M2UlJjbDk5UkhJUWppN3oybGMyeVRTZzl3SFFDL0tOc1FxWlh4MXB5ZHNVQTNmQzhsYk9Ycnc4VFZGUXMxSldIT2dPN2tYRXpOckJiYXBaVGlmMGk0eGNadGhKTnd4dFNtUFU3VHIwRTFwQ2tXbzhqbmtwcm9xQmFPSDRhNWFNWmZPUGJqSVBxU3R2Yk9GZjByakIrR29YL1Mvd0hrQ1FvWVkvTmx1SXJkQmtDN3JhS2t6d2hzdGcrcmZvbEl5VG9lLzF5ZVBEVGJRakZrZWFGTmpOc2ZoTGkxRXFNd1BLSGY4M0N3RFk4eXFpUlowT0xFMjQxYXpHb0hnazM5d3lEdUx6dlJjZEhIdFZBL0MvQ01wN3BGbG9SaFdsQWQvNlVVbG1BN2RHQTU3VWhlaWR5enl0RTRmcnYzTGFoelVpamlaSnJxN0tCSFFPUGpSN2tnNnliNGRiWUhJcHZhWlJnZ3Z6UGFjaHp0bVNYMllGbVN4OGxXRWFjYlZxa3psYnBYaTZPR2FWRGVXS3ByZ0VoTFZGcmF1Rnkwa0x0T3hoa0crWnFwL3k0QjNwN0R1Wm5tbGZCL3M5WmtOMnA3OHZSdjVEVit1R3Z3aHpqODJFNkpFZ1ozQXh0TElUa1drNkpmK1ZqZlVVQmJDTDcrSENlT3BWT1poTitDajRwaEFCa0dNajl1VmNOYjAvL2lWb2RSc0x5RndzTnQzMW02SGJXb3VTK29jVzdEK3NlTU9mdjV0QjNlb1VUNHRWQjhoSHFaNjdienZUTDI0OHFLMGRUUzNXMm4xZ1JvdGx1TWF1c3hkT29kTXVHM3hMUU1nUTFKOG80RzhuZSt0THpjQkxnelF5S2pzdzlJZ0NaTkZzUUthb1QvYys3aFJmU29HZ2U1RWFyYWxuNHh1TUIvSlcxRkZNd3J4VnRyY3FDekNlVmhpWisvVDd2WGMva0xzNHZrY3lLWnJuVXZ5N05vS2Z1QUQvWm1xZ1hWME85M056RjA2QlJiZTdOL0hzdXExUDhXOFFFS0FLY2haMFpLWFNEVUVjZ0cwZjc5T3FFNFk2eXluNjFhd0FhU00xQ1hiUW5HelY4dnh4aGxyK1dRTXJCM2svbElacmY2NXM1OUhKY0k5OFh2K1JEV1JpeS8zdkdlWFZrcDhBV1VwKzhNbTYwQ0tPOEx5UWpHWHlUa3Jsbk1sejdBSldzSk9xbE1yQStoblZ6YnZYNFlmQ21Ja0xaVDZhdE9xNG5ZT0pGN0Z5WkRSUEdSWkhPclZtOURlZWRnaWlJZHR2a29XRkJxQkpnQmhMd3o0eXFldmlOem1DcWNUOVdrSkg3QlA3L2MxMUZ1SWdRSWJVZGp0eUpVWG9uUXZlM3VBYUl5MVVFTFZHTW4xQTUxWEFTQ08xYzE1UW9ST3lOYi9RMlo3ZXhlWndidTd3NlRBR2Q2bWdBY3AzWU1HRHM4WXZRYnlDUHJ0ZGZJZ3VrQlhlTW1Rd21UMCt0dkFQUEhTUlFIREU1dkl2ZE5yUjR4VkgyT3NQMml3ZjhXb0w1NnM4M1ZoUkZjTE1NSFJ4S25kQlo4ZnV2U2RESGk2ZG9hYjBiV3ZPTzhldytlUFhnbzFaN0J6cEJlZjFUSmFVa1VnOUtpVW0xbHQ2Q2x3SEcxeXFhOVRMYUltWDlJR1ZQeE40bzFRcEU2dnVtK3NhSEJEd2ZDK2ZqNHZhbkxjcnQ2dmQ2R250dFlBd2F1cjZtZ3N1UVljVm9NUGdmdjRxUnZsWEtoOWdjd0QxQ1VkV1FZanhnL1ZRVlpla2pLeTVhVGp2aTU2c05xTS9TUDlmOVgyZ0gvRVdEMFFQOUdIY25GRGNxczNXcWVKcHVnZGplb0c2TjRveXVZMDlITkNqcEhoYnRFYkZhM1grQW9EV3huY0pjNE9VNFFhaHd2ZTFXWXpsNjZ4R1ZxODkvUWRienB5MkxEZW80ZXZLOEFTTndvWFF1Zmx5VnU1clFSWVdPRWs1dlRiQ0Z3REhzdVF0cGt1bXNERlAxMVF3R3d1OUh0ZFJLeEZncHA2d1p4akUrUHhIVStrZ2FueitRdWVsZFhLM2RWWENaZ081RUVEcGVJUXhkeXhsdVlpNTNSV3YxOERucnI4WVI3ZGFXV2dFSU54N0JJZnVxV01zRlFxck9qc0RVb0F6UGoyZ2VxRk82ZDZBbTE3UkpnOHJGc1A0ckVla0pqZjFuVHdUWEtNUmpacUlBcTNGTnBvUklTVzIyZzJjZ3hLNXV5dXV3ck5ZYU1rMGFMeFR3SUw5dWJwMTg5Y2hySWVsL0tEaXI0MFhnT3lJT0FsUGlkMUN2Tmx3SXkydmRQMk04VTRSa3B1TGpUUUlQakJ5L2FFVDhYSWc3aDFBTjJUV2MyWVpMdEJkUmswTEM3N2NPSFFtbWYwb2xPRHVXbUlVWnBBNm83aWdtaThnT1N5djgxVjB4UXlHTWh1eHdjMVp0YmdUVXREbDBqbFBrMUxLMkl3L3ErZ3B0RVJyTEJXa3lWQm5Yd2JCeDJaUGRQN3MzeFBPeWFlblNDZk9lQWdTZWd0ck9vbm9lV0YyT1JNUmRHcnZxRStGc09aeHVKZU9vd0lUdVI4K2ovRmphYWJab1JKUm1NcEhoYkI3SFVVYit4ZUVKWUgwRnpmN2pmcWwwQ3FSb2ZJZG1MU0R6a040NFpzRmQvakhxK05ZVEJsSU9pNlpZdHlMdVpqcHl3OGpoQ3U3ZFA2TUlJblp5L0RlaTZHcTN0TGhtdjZDNlpHL0M3b0R1NTM4WDBqU3dCaS95UEp1RGUvbWs1L0JLdlh5S0JtSEpldm5PcFdyODJ2c2MxcnNtc1IxYmd1Z1dHWTJ6YkovKzdHdXE5SzFZTEFXVzI3VnAyYzBxTzh4OHpEV3RHSVNxL0JrbjdJYlcrNkNCb2ZXVWFDQlRLTUkwUjNvb0thVGttUWwrVW0wZW9MQ04rMVd4OWl4bUE2c0Jvc0FzK3R0Ym8zOWF3UTZGc29iOTljTlNxeUlUZjMyZ0VHcW13aXJUYktJdHRRbDBWNUVYMXJoanpsUGR3eWFiUkdHR1hXQ3pRckZFYndvTXpKMnZUd28vN3lHTTZsY014emkvM01zSVJpSzFYSmphTFNyTUZnSWs1Z0ZqRlpneGV4WURFZG1SeU5aYlhYOUkyUjl0aXNOYzJpMXAvWEJYWDcvbG8yVUdVQTd4LzFBTkFuTXlEMTZ6QnlsSW5sUkV0bmt0L3RkcEo0c21EU1dTS1VPTnV4WnMyelFvTVBsemluUUpMeDNva2Y2MVRWRklCeVVRenBUUnVLT09vMmtRZzgrbDRBanE5akVQTDEwSUJKZXdmUk16aXFudGtia3JSQmlKbURXKy8yUjNsQXNuTTRGWHFzZTJlbzh2WW9NeHBtUzRQTlBOZmcyMVpBMjRRdjRkVUdNODgwd0MxM29QQnk3Uk5uSnVwVHpSVlBSMEcwWmZmQkZjbVVQTytuTDhQcmhrUzFlL3JDZ3pPOVBodWlzUjNzcTdrZldKL2dmZ3RlMUdIUFRIUVI4Q1IrU0VNSUpZYUtVYzFDcHY5TjJ5UUFDcm9kSnFGR2diRkpFRVQ2Y0RzS1ZmOTZEcDFuNWtQQll4anBDRW4rdWtCWURYdDFDUFphL1o3djJMRG9QSkhtL2lYbWhIbVZZMm1wcGhuclV5YkJFc2tjaS9lbWxUd0JYMEFUOUlJZDBsT1RGZzB3UHA2WktYOS9XNGloRDMwNHUyMElLZWd4d3N5bmpDSENHOUUxWjg4NitrUEhFdlFMdXI5WVJzYTFyei9pdFZXblozUXBRZHBnUTh1aG9ESTRPVlBEZDdSRU1ZOFJpUXk5M1JsUU14cUI0R0h6NkNhV01LSWlvU053VzlveXY2NWo5TjhLUVZnbVlQZ1JnbTNxQXNXQTQvRS9zWitWYW8zUVZlQWJheXdLdXBPU0d4Rmt2LzVSaWh4TjMzb0RjeldBTlYvTCtTazNLUEowM3ozK0thVWVHMU5lZnp1RGRFSUd2bEpDTktmZGZnaFkzTlUyVzdQNCtjL3I4NmdHc1Y1VWlQNjlvOVAxbkl0SmJjbkFHQjI3SXBoSDVsTzFSUGpETVRVWC9QeVBlak1rcktYam53UW1sTVl6dHA1V1huZG9XRWg1aXBnTXRLK2RuT0NEdVFtb29sdFEzTDM2WVRhQTk2RUF1Y2ZJdXpWbmpoUUlEOW5RRXZUVDRGV2NrTnRremhoRFNmOWh4SFZBUGowWDk5ZUtGaHJQNWJvbmoxdExoOWgvdVNDTlkrMnhtKzJPSEFubzAyNERQL1ZSYi9USXI5MlliNUhJNDd5V3IraHdXWGN2Q1Z5ckFTUC8rcUFJSUpad2gxTUdOQ0JqM0szZGxkTzNidzZlbHhFZDlWdUc3V0ZRMUErMEFHelRDK3NNV3VZN2pvU1o0aDNqZlBmTGxzSU5VeDhEQ0hjNS9vUTgzRFRZSEVJYXEyUFR5aCs2SHpPbmtib3REbXkxR29ScVBrWlI2ZWF1cjczMG1Nb01RaEJzZkk2YkJuNjZRY3JMalM0VUpWakhmcmVSSS9ocU5LYzVseVMwN0pqYkJrOTVPWnFOM05vT2VkVUFDT28ra2krMEFXejhPZXZ1MjlKVUltYW5IQWtEZWFrMmEvR0E2amVLUlJUUTlEdDd2N2l0bzRuMC9nOVIwMU9CK09GNWJIMkRueFQyR1VnZC9GNm9tMGpGeTRNL2xhN2c3OCtoUk9ueFphWlBIUVdvT05PUmJqd096azRvNzI4VDNVWlVUcWp1WnBsZmQ3MTZ6SXowSTVua3ZCN21aNkRxSjJNZG0vN1Y1QlNtdU9KR1pCSTI2amtVSUdyVzY1VFZwN1c1VHVpRExhTG1JSUpoRVhEdmJ4cUQ1V201ZnhBTVNaNXA1cFZCeVR6NERoUUg2Q2tOS3FzNmNtcGRTbWZ5SVJ6d1FqTFFFUUNvcHZZRFA2c2ltSmw1TXgxM2p1ZmM1RVhsUFRZcHExNkZLdjduN0l6OU1jOTNvUXV3SEY2UGFYb3VRdTZ2eHQrT1ZXNWhjb0F6SjZQd01TZktTaXY2aXpWd3g3Q2p6OFVtQW8yYlBJK0drQ1dEalgyUEdudnFMOGZ1T3BYdjFiRDk4bGdkbU4xUXN6U2hEbHpLUUFDcnRtMnFsV0ViQzZlendMNnFtYU1hMFV1WXZaSGNjRGcwSzZaU3JWZmVseEppSU9SbVNWd25Ed3g3OER3YlpOU2FhRGttUXFiTnZjanowQmU5dnlmd0dCSjgwQlRDbDFqeXpYYklLUVk2NGVjaVdyL0xMR0lTdVhBTHNJZzRCOC81OGt2YUhJZHN4cUtvTmhZNmwzQ3MyZFFnb0RDVEdLMHZCVTBxSDZZRDY1eEFsZ2lhY3JsZUNKOUJ3cVN6WkVlWWU2cnQ1YWV5bVB6SCtSVStPaGtjRnAvMVFwdnBCRmZ2eU9QOEZrWmdoM2luRDg0NjhwR2JFd3ZOMTJJNUNaYTNNYXd5NnpyUGdkb1pJdFlhQUt3ZDZnN0xmc0RtNEdqbGpEdVc2Z0hyREpRZi8rTWZiWnZrcDkvZWU0RVR5dHdHRmRSUlZKaTgvaHZMczE5RGdaNTQxd2RZUC9ydnZjQXdNaWpNN3hpUWVQbE94UkJGQklzamNhdFBMM1JUd0xQVWNmNVRBeS9ZRkFLb0hDT0NBTXYzdlhJL0plaVR1SVVYYWF4ZDFlcnREU2QzVVZYSUFnUWtjcjJ3RVFEbGNzK3Y2YjB3Z0ZFUktGSzZHQUZreE1mT1d1TGZGTm5hOFcxYWU4VWZveHVUbmJ1cU11VHRacUs1dTg9"]
,"05AO_TzLLswGSltZpzbpVeq7wBMeIgQqYqCxKSWW22EUgHJaeTR6AEHvBe5oW4gBun156Jh4lapeUd50-wEdvWZcZbKJhtF_F5N__q_S0pHW4y0YbzAEhxcfWYUwma1LTJAj-tosbiHnHpaN-ZGV00k0B2q1iHE_Z6Z2wa_FVMfuWosiR7Ew","06AGdBq24NYX6JMdNRxAfq69WlZKS04jwmJzbZjh_LY1dQ2x7VCSlyBKoSbXk_GdWEAHAn_zcpDte3k4REHxA60zBGDAFoht76t551HWdllUPLGtS39ZhiMNtmiIeZLCvx8wXjB0BWHkTit-XbClJ044p7nMhgIfeIWxO_IujxQ70mSUBkNVVblSg"]

 */
