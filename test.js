const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { FileDetector } = require("selenium-webdriver/remote");

(async function googleSearch() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .usingServer("http://localhost:4444/wd/hub/")
    .setChromeOptions(
      new chrome.Options()
        //.addArguments("incognito")
        //.addArguments("--lang=en")
        //.addArguments("start-maximized")
        //.addArguments("disable-infobars")
        // .addArguments("--headless")
        // to run on localhost
        .addArguments("--disable-dev-shm-usage")
        .addArguments('--no-sandbox')
        .addArguments("--allow-file-access")
        .addArguments("allow-file-access-from-files")
        .addArguments("use-fake-ui-for-media-stream")
        //.addArguments("use-fake-device-for-media-stream")
        .addArguments("--use-file-for-fake-audio-capture=/fitness1.wav")
    )
    // .setChromeService(
    //   chrome.setDefaultService(
    //     new chrome.ServiceBuilder("./drivers/chromedriver.exe").build()
    //   )
    // )
    .build();

  //     launchOptions.args.push('--no-sandbox')
  //     launchOptions.args.push('--allow-file-access-from-files')
  //     launchOptions.args.push('--use-fake-ui-for-media-stream')
  //     launchOptions.args.push('--use-fake-device-for-media-stream')
  //     // mp3 not work
  //     launchOptions.args.push('--use-file-for-fake-audio-capture=tests/fixtures/hello.wav')

  const delay = ms => new Promise(res => setTimeout(res, ms));
  try {

    // audio file
    var file = process.cwd() + "\\test.wav";
    driver.setFileDetector(new FileDetector());

    let aplikacijaUrl = "https://staging-editor.true-bar.si/";
    console.log(process.cwd());

    // Navigate to Url
    await driver.get(aplikacijaUrl);
    await delay(1000);
    //login
    await driver
      .findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/div[2]/div[2]/div[1]/div/input"))
      .sendKeys("jani");

    await delay(1000);
    await driver
      .findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/div[2]/div[2]/div[2]/div/input"))
      .sendKeys("mIqrfAx490@6");
    // login button
    await delay(1000);
    await driver
      .findElement(By.xpath("/html/body/div[1]/div/main/div/form/div[2]/div/button"))
      .click();

    await delay(1000);
    await driver
      .findElement(By.xpath("/html/body/div/div/main/div/form/button"))
      .click();

    // upload wav file
    await delay(1000);
    await driver
      .findElement(By.id("fileElem"))
      //.sendKeys(file.getAbsolutePath());
      .sendKeys("/tmp/test.wav");

    await delay(3000);
    await driver
      .findElement(By.xpath("/html/body/div[1]/div/main/div/div[3]/div/div/div/div/div[2]/div[3]/button[2]"))
      .click();

    //console.log(await firstResult.getAttribute("textContent"));
    console.log(await (await driver.getCapabilities()).getBrowserName());
    console.log(await (await driver.getCapabilities()).getBrowserVersion());
  } finally {
    driver.quit();
  }
})();
