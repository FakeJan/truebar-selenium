(async function Truebar() {
  // Knjižnice
  const { execSync } = require("child_process");
  const { describe, it, after, before } = require("mocha");
  const { Builder, By } = require("selenium-webdriver");
  const chrome = require("selenium-webdriver/chrome");
  const expect = require("chai").expect;
  const driver = require('selenium-webdriver')

  let aplikacijaUrl = "https://staging-editor.true-bar.si/";
  //let seleniumStreznikUrl = "http://localhost:4444/wd/hub";
  let seleniumStreznikUrl = "http://localhost:4444/";
  let brskalnik;

  // Obvladovanje napak
  process.on("unhandledRejection", (napaka) => {
    console.log(napaka);
  });

  const delay = ms => new Promise(res => setTimeout(res, ms));

  // Poèakaj doloèeno število sekund na zahtevani element na strani
  let pocakajStranNalozena = async (brskalnik, casVS, xpath) => {
    await brskalnik.wait(
      () => {
        return brskalnik.findElements(By.xpath(xpath)).then((elementi) => {
          return elementi[0];
        });
      },
      casVS * 1000,
      `Stran se ni naložila v ${casVS} s.`
    );
  };

  try {
    before(() => {
      brskalnik = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(
          new chrome.Options()
            .addArguments("start-maximized")
            .addArguments("disable-infobars")
            .addArguments("allow-insecure-localhost")
            .addArguments("allow-running-insecure-content")
            .addArguments("--window-size=1920,1080")
            .addArguments("--disable-dev-shm-usage")
            .addArguments("--no-sandbox")
          // .addArguments("--headless")
        )
        // .setChromeService(
        //   chrome.setDefaultService(
        //     new chrome.ServiceBuilder("./drivers/chromedriver.exe").build()
        //   )
        // )
        .usingServer(seleniumStreznikUrl)
        .build();
    });

    describe("Funcionalni test za prijavo", function () {
      this.timeout(30 * 1000);
      before(() => {
        brskalnik.get(aplikacijaUrl);
      });

      it("Začetna stran aplikacije naložena", async () => {
        await pocakajStranNalozena(brskalnik, 20, "//h2");
        let prijavaGumb = await brskalnik.findElement(By.xpath("/html/body/div/div/main/div/form/div[2]/div/button"));
        expect(prijavaGumb).should.exist;
      });

      it("Prijava", async () => {

        let usernameInput = await brskalnik.findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/div[2]/div[2]/div[1]/div/input"));
        await usernameInput.sendKeys("jani");

        let passInput = await brskalnik.findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/div[2]/div[2]/div[2]/div/input"));
        passInput.sendKeys("mIqrfAx490@6");

        let loginButton = await brskalnik.findElement(By.xpath("/html/body/div/div/main/div/form/div[2]/div/button"));
        await loginButton.click();

        let xButton = await brskalnik.findElement(By.xpath("/html/body/div/div/main/div/form/button/svg"));
        await xButton.click();

        // let vZivo = await brskalnik.findElement(By.xpath("/html/body/div/div/main/div/div[1]/div/div/button[1]"));
        // await vZivo.click();

        // play audio file

      });

    });
    after(async () => {
      brskalnik.quit();
    });
  } catch (napaka) {
    console.log(napaka);
    //console.log("Med testom je prišlo do napake!");
  }
})();