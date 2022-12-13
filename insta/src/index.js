class InstaBot {
  constructor() {
    const dotenv = require("dotenv");
    dotenv.config();
    this.username = process.env.BOT_USERNAME;
    this.password = process.env.BOT_PASSWORD;
    this.target = process.env.TARGET_USERNAME;
    this.config = require("./config.json");
  }

  getUrl(endpoint) {
    return `https://www.instagram.com${endpoint}`;
  }

  async randWait() {
    const milliSecs = Math.floor(Math.random() * 1500 + 1000);
    return new Promise((resolve) => {
      setTimeout(resolve, milliSecs);
    });
  }

  async initPuppeter() {
    const puppeteer = require("puppeteer");
    this.browser = await puppeteer.launch({
      headless: this.config.settings.headless,
      args: ["--no-sandbox"],
    });
    this.page = await this.browser.newPage();
    this.page.setViewport({ width: 1500, height: 764 });
  }

  async loginInsta() {
    await this.page.goto(this.config.base_url, { timeout: 60000 });
    await this.randWait();
    // Enter login details
    let element = await this.page.waitForSelector(
      this.config.selectors.username_field
    );
    await this.page.click(this.config.selectors.username_field);
    await this.page.keyboard.type(this.username);
    await this.page.click(this.config.selectors.password_field);
    await this.page.keyboard.type(this.password);
    await this.randWait();
    await this.page.click(this.config.selectors.login_button);
    await this.page.waitForNavigation();
  }

  async sendMessage(message) {
    await this.page.goto(this.getUrl("/direct/new/?hl=en"), { timeout: 30000 });
    await this.randWait();
    await this.page.waitForSelector(
      this.config.selectors.not_now_button
    );
    await this.page.click(this.config.selectors.not_now_button);
    await this.randWait();
    // Enter kobe's dm
    let element = await this.page.waitForSelector(
      this.config.selectors.search_user
    );
    await this.page.click(this.config.selectors.search_user);
    await this.page.keyboard.type(this.target);
    await this.randWait();

    element = await this.page.waitForSelector(
      this.config.selectors.select_user
    );
    await this.page.click(this.config.selectors.select_user);
    await this.randWait();

    // Check if we had selected the correct user.
    const foundUser = await this.page.$eval(
      this.config.selectors.check_user,
      (elem) => elem.innerText
    );

    if (foundUser !== this.target) {
      console.log(`User not found! -> got ${foundUser} instead.`);
      return;
    }

    await this.page.waitForSelector(this.config.selectors.message_next);
    await this.page.click(this.config.selectors.message_next);
    await this.page.waitForNavigation();
    await this.randWait();

    // Type and send message
    await this.page.waitForSelector(this.config.selectors.message_field);
    await this.page.click(this.config.selectors.message_field);
    await this.page.keyboard.type(message);
    await this.randWait();
    await this.page.keyboard.press("Enter");
    await this.randWait();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

module.exports = InstaBot;
