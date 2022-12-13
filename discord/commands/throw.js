const { SlashCommandBuilder } = require("discord.js");
const Bot = require("../../insta");

const run = async () => {
  const bot = new Bot();
  await bot.initPuppeter().then(() => console.log("PUPPETEER INITIALIZED"));

  await bot.loginInsta().then(() => console.log("LOGGED INTO INSTAGRAM"));

  await bot.sendMessage().then(() => console.log("MESSAGE HAS BEEN SENT"));

  await bot.closeBrowser().then(() => console.log("BROWSER CLOSED"));
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("throw")
    .setDescription("Throws a pokeball"),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.user.username} is throwing pokeball at Kobe...`
    );
    await run().catch((e) => console.log(e));
  },
};
