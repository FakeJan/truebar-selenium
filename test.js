const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");

(async function googleSearch() {
  let driver = await new Builder()
    .forBrowser("chrome")
    // .usingServer("http://localhost:4444/wd/hub/")
    .setChromeOptions(
      new chrome.Options()
        .addArguments("incognito")
        .addArguments("--lang=en")
        .addArguments("start-maximized")
        .addArguments("disable-infobars")
        // .addArguments("--headless")
        .addArguments("--disable-dev-shm-usage")
        .addArguments("--no-sandbox")
        .addArguments("allow-file-access-from-files")
        .addArguments("use-fake-device-for-media-stream")
        .addArguments("use-fake-ui-for-media-stream")
        .addArguments("--allow-file-access")
        .addArguments("--use-file-for-fake-audio-capture")
    )
    .setChromeService(
      chrome.setDefaultService(
        new chrome.ServiceBuilder("./drivers/chromedriver.exe").build()
      )
    )
    .build();



  // on('before:browser:launch', (browser = {}, launchOptions = { args: [] }) => {
  //   if (browser.name === 'chrome') {
  //     // https://bugs.chromium.org/p/chromium/issues/detail?id=1032604#c37
  //     launchOptions.args.push('--no-sandbox')
  //     launchOptions.args.push('--allow-file-access-from-files')
  //     launchOptions.args.push('--use-fake-ui-for-media-stream')
  //     launchOptions.args.push('--use-fake-device-for-media-stream')
  //     // mp3 not work
  //     launchOptions.args.push('--use-file-for-fake-audio-capture=tests/fixtures/hello.wav')
  //   }
  //   return launchOptions
  // })

  //https://peter.sh/experiments/chromium-command-line-switches/#use-file-for-fake-audio-capture
  //https://www.google.com/search?q=how+to+use+--use-file-for-fake-audio-capture&rlz=1C1GCEJ_enSI1015SI1015&oq=how+to+use+--use-file-for-fake-audio-capture&aqs=chrome..69i57.2037j0j7&sourceid=chrome&ie=UTF-8

  const delay = ms => new Promise(res => setTimeout(res, ms));
  try {
    let aplikacijaUrl = "https://staging-editor.true-bar.si/";
    console.log("x");

    // Navigate to Url
    await driver.get(aplikacijaUrl);
    await delay(1000)
    //login
    await driver
      .findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/div[2]/div[2]/div[1]/div/input"))
      .sendKeys("jani");

    await delay(1000)
    await driver
      .findElement(By.xpath("/html/body/div/div/main/div/form/div[1]/div[2]/div[2]/div[2]/div/input"))
      .sendKeys("mIqrfAx490@6");
    // // login button
    await delay(1000)
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

    let record = await driver
      .findElement(By.xpath("/html/body/div/div/main/div/div[3]/div/div/div/div/div[2]/div[2]/button"))
      .getAttribute();

    console.log(record);

    //need to play audio
    //https://stackoverflow.com/questions/9419263/how-to-play-audio
    // var audio = new Audio('trplenje.wav');
    // audio.play();


    //console.log(await firstResult.getAttribute("textContent"));
    console.log(await (await driver.getCapabilities()).getBrowserName());
    console.log(await (await driver.getCapabilities()).getBrowserVersion());
  } finally {
    //driver.quit();
  }
})();
