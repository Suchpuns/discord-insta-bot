const { SlashCommandBuilder } = require("discord.js");
const Bot = require("../../insta");

const run = async (message) => {
  const bot = new Bot();
  await bot.initPuppeter().then(() => console.log("PUPPETEER INITIALIZED"));

  await bot.loginInsta().then(() => console.log("LOGGED INTO INSTAGRAM"));

  await bot.sendMessage(message).then(() => console.log("MESSAGE HAS BEEN SENT"));

  await bot.closeBrowser().then(() => console.log("BROWSER CLOSED"));
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("throw")
    .setDescription("Throws a pokeball")
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Message you want to send to Kobe')
        .setRequired(true)),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.user.username} is throwing a pokeball at Kobe...`
    );
    const message = interaction.options.getString('message') + ' - ' + interaction.user.username;
    try {
      await run(message);
      await interaction.followUp(`Ball has been thrown! The message: "${message}" has been sent`);
    } catch (error) {
      console.log(error)
      await interaction.followUp(`Ball broke :(`);
    }
  },
};
