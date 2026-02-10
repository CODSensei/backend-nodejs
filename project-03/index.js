const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
// TODO create short url and store it in mongoDB with all features of short url
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
      content: `Generating ShortID for ${url}`,
    });
  }
  message.reply(`Fuck you ${message.author.username}`);
});

client.on("interactionCreate", (interaction) => {
  interaction.reply(`Fuck you`);
  console.log(interaction);
});

client.login("TOKEN");
