const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { describe, it } = require("mocha");
const { delayed } = require("selenium-webdriver/lib/promise");


(async function googleSearch() {
    let driver = await new Builder()
        .forBrowser("chrome")
        // .usingServer("http://localhost:4444/")
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
                .addArguments("allow-file-access-from-files")
                .addArguments("use-fake-device-for-media-stream")
                .addArguments("use-fake-ui-for-media-stream")
                .addArguments("--allow-file-access")
                .addArguments("--use-file-for-fake-audio-capture=C:\\Users\\Jan\\Desktop\\selenium-docker-selenium-docker-basic\\trplenje.wav")
        )
        .setChromeService(
            chrome.setDefaultService(
                new chrome.ServiceBuilder("./drivers/chromedriver.exe").build()
            )
        )
        .build();
    const delay = ms => new Promise(res => setTimeout(res, ms));
    try {
        let aplikacijaUrl = "https://staging-editor.true-bar.si/";
        console.log("x");

        // Navigate to Url
        await driver.get(aplikacijaUrl);
        // login
        await driver
            .findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/div[2]/div[2]/div[1]/div/input"))
            .sendKeys("jani");

        await driver
            .findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/div[2]/div[2]/div[2]/div/input"))
            .sendKeys("mIqrfAx490@6");
        // login button
        await driver
            .findElement(By.xpath("/html/body/div[1]/div/main/div/form/div[2]/div/button"))
            .click();

        await delay(1000)
        await driver
            .findElement(By.xpath("/html/body/div/div/main/div/form/button"))
            .click();
        // v zivo button
        await delay(1000)
        await driver
            .findElement(By.xpath("/html/body/div/div/main/div/div[1]/div/div/button[1]"))
            .click();


        // console.log(await firstResult.getAttribute("textContent"));
        console.log(await (await driver.getCapabilities()).getBrowserName());
        console.log(await (await driver.getCapabilities()).getBrowserVersion());
    } finally {
        // driver.quit();
    }
})();