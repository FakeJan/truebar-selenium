const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { describe, it } = require("mocha");


(async function googleSearch() {
    let driver = await new Builder()
        .forBrowser("chrome")
        //.usingServer("http://localhost:4444/")
        .setChromeOptions(
            new chrome.Options()
                .addArguments("incognito")
                .addArguments("--lang=en")
                .addArguments("start-maximized")
                .addArguments("disable-infobars")
                // .addArguments("--headless")
                .addArguments("--window-size=1920,1080")
                .addArguments("--disable-dev-shm-usage")
                .addArguments("--no-sandbox")
        )
        .setChromeService(
            chrome.setDefaultService(
                new chrome.ServiceBuilder("./drivers/chromedriver.exe").build()
            )
        )
        .build();

    try {
        let aplikacijaUrl = "https://staging-editor.true-bar.si/"
        console.log("ne")
        // Navigate to Url
        await driver.get("https://staging-editor.true-bar.si/");
        // Enter text "Automation Bro" and perform keyboard action "Enter"
        describe("Funcionalni test za prijavo", function () {
            this.timeout(30 * 1000);
            before(() => {
                brskalnik.get(aplikacijaUrl);
            });
            console.log(aplikacijaUrl)
            it("Neuspešna prijava - napačno geslo", async () => {
                await pocakajStranNalozena(brskalnik, 20, "//h2");

                let searchInput = await brskalnik.findElement(By.name("username"));
                await searchInput.sendKeys("test");

                WebElement.sendKeys(Keys.RETURN);

                //let uporabnikData = brskalnik.findElement(By.xpath("/html/body/app-framework/app-logged-navbar/nav/div/div[2]/a/span"));

                // await (uporabnikData.getText().then(async function (vsebina) {
                //     expect(vsebina).to.be.equal("uporabnik1 uporabnik1");
                // }
                // ));

            });
        });
        // console.log(await firstResult.getAttribute("textContent"));
        console.log(await (await driver.getCapabilities()).getBrowserName());
        console.log(await (await driver.getCapabilities()).getBrowserVersion());
    } finally {
        driver.quit();
    }
})();