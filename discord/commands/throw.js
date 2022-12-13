const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("throw")
    .setDescription("Throws a pokeball"),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.user.username} is throwing pokeball at Kobe...`
    );
  },
};
